const TurndownService = require("turndown");
const path = require("path");
const { URL } = require("url");

const turndownService = new TurndownService();

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

module.exports = { turndownService };
