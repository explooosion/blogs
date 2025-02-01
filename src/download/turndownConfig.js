const TurndownService = require("turndown");
const path = require("path");
const { URL } = require("url");

const turndownService = new TurndownService({
  codeBlockStyle: "fenced", // Use triple backticks (```) instead of indentation
});

// Convert <a href=""> links properly
turndownService.addRule("anchor", {
  filter: "a",
  replacement: function (content, node) {
    const href = node.getAttribute("href");
    return href ? `[${content}](${href})` : content;
  },
});

// Ensure images are converted to local relative paths
turndownService.addRule("img", {
  filter: "img",
  replacement: function (_, node) {
    const src = node.getAttribute("src");
    if (!src) return "";
    const filename = path.basename(new URL(src).pathname);
    return `![${filename}](images/${filename})`;
  },
});

// ✅ Convert <pre><code> blocks into proper fenced Markdown
turndownService.addRule("codeBlock", {
  filter: function (node) {
    return (
      node.nodeName === "PRE" &&
      node.firstChild &&
      node.firstChild.nodeName === "CODE"
    );
  },
  replacement: function (content, node) {
    const codeNode = node.firstChild;
    const langClass = codeNode.getAttribute("class"); // e.g., "language-js"
    const lang = langClass ? langClass.replace("language-", "") : "";

    return `\n\
\`\`\`${lang}\n${codeNode.textContent.trim()}\n\`\`\`\n`;
  },
});

// Preserve <br /> tags as line breaks
turndownService.addRule("preserveBr", {
  filter: "br",
  replacement: function () {
    return "  \n"; // Two spaces followed by a newline ensures a line break in Markdown
  },
});

module.exports = { turndownService };
