
import * as parse5 from "parse5";
import postcss from "postcss";

import { SilverHtmlPlugin } from "@sika7/silver-html";
const postcssWhitelistSanitize = require("@sika7/postcss-whitelist-sanitize");

export interface arrowTag {
  tag: string;
  allowAttrs?: string[];
  allowStyle?: string[];
}

export interface silverHtmlSanitizeConfig {
  allowTags: arrowTag[];
}

export function getConfig(
  tagName: string,
  arrowTags: arrowTag[]
): arrowTag | undefined {
  return arrowTags.find((conf) => conf.tag === tagName);
}

export function isPermissionElement(
  tagName: string,
  arrowTags: arrowTag[]
): boolean {
  if (arrowTags.find((conf) => conf.tag === tagName)) return true;
  return false;
}

export function silverHtmlSanitize(
  opts: silverHtmlSanitizeConfig
): SilverHtmlPlugin {
  const { allowTags } = opts;

  return {
    pluginName: "silverHtmlSanitize",
    ElementNode: [
      {
        name: "remove not allow tag.",
        function: (node) => {
          if (!isPermissionElement(node.tagName, allowTags)) return null;
          return node;
        },
      },
      {
        name: "remove not allow attributes.",
        function: (node: parse5.Element) => {
          const conf = getConfig(node.tagName, allowTags);
          if (!conf) return node;
          const { allowAttrs } = conf;

          let attrs = node.attrs;

          if (allowAttrs) {
            attrs.filter((attr) => {
              if (!allowAttrs.includes(attr.name)) return false;
              return true;
            });
          }

          node.attrs = attrs;
          return node;
        },
      },
      {
        name: "remove not allow style and unknown propertys.",
        function: (node: parse5.Element) => {
          const conf = getConfig(node.tagName, allowTags);
          if (!conf) return node;
          const { allowStyle } = conf;

          let attrs = node.attrs;

          if (allowStyle) {
            attrs.map((attr: parse5.Attribute) => {
              if (attr.name === "style") {
                attr.value = postcss([
                  postcssWhitelistSanitize({
                    allowPropertys: allowStyle,
                    validationCheck: true,
                    allowPropertyCheck: true,
                  }),
                ]).process(attr.value, { from: undefined }).css;
              }
              return attr;
            });
          }
          node.attrs = attrs;
          return node;
        },
      },
    ],
  };
}
