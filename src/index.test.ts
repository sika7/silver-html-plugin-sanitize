import { silverHtml } from "@sika7/silver-html";
import { silverHtmlSanitize } from "./index";

test("remove not allow tag test.", () => {
  const result = silverHtml(
    `
<div>
<div>test</div>
<ul>
<li></li>
<li>list2</li>
</ul>
</div>
`,
    {},
    [
      silverHtmlSanitize({
        allowTags: [
          {
            tag: "div",
            allowAttrs: ["class", "style"],
            allowStyle: ["color"],
          },
        ],
      }),
    ]
  );
  expect(result).toEqual(`
<div>
<div>test</div>

</div>
`);
});

test("multiple config allow tag test.", () => {
  const result = silverHtml(
    `
<div>
<div>test</div>
<ul>
<li><p>aaa</p></li>
<li>list2</li>
</ul>
</div>
`,
    {},
    [
      silverHtmlSanitize({
        allowTags: [
          {
            tag: "div",
          },
          {
            tag: "li",
          },
          {
            tag: "ul",
          },
        ],
      }),
    ]
  );
  expect(result).toEqual(`
<div>
<div>test</div>
<ul>
<li></li>
<li>list2</li>
</ul>
</div>
`);
});

test("remove not allow attributes test.", () => {
  const result = silverHtml(
    `
<div class="card">
<div>test</div>
<ul class="list">
<li class="item"><p>aaa</p></li>
<li>list2</li>
</ul>
</div>
`,
    {},
    [
      silverHtmlSanitize({
        allowTags: [
          {
            tag: "div",
            allowAttrs: ["class"],
          },
          {
            tag: "li",
          },
          {
            tag: "ul",
          },
          {
            tag: "p",
          },
        ],
      }),
    ]
  );
  expect(result).toBe(`
<div class="card">
<div>test</div>
<ul>
<li><p>aaa</p></li>
<li>list2</li>
</ul>
</div>
`);
});

test("remove not allow styles test.", () => {
  const result = silverHtml(
    `
<div class="card">
<div style="background-color: #eee;color: #eee;">test</div>
<ul style="color: red;">
<li style="<script>alert('hoge');</script>"><p>aaa</p></li>
<li>list2</li>
</ul>
</div>
`,
    {},
    [
      silverHtmlSanitize({
        allowTags: [
          {
            tag: "div",
            allowAttrs: ["class", "style"],
            allowStyle: ["background-color"],
          },
          {
            tag: "li",
          },
          {
            tag: "ul",
          },
          {
            tag: "p",
          },
        ],
      }),
    ]
  );
  expect(result).toBe(`
<div class="card">
<div style="background-color: #eee;">test</div>
<ul>
<li><p>aaa</p></li>
<li>list2</li>
</ul>
</div>
`);
});
