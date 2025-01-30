const fs = require("fs");

/**
 * Parses Markdown Front Matter to extract metadata.
 * @param {string} filePath Markdown file path
 * @returns {{ frontMatter: Record<string, string>, content: string } | null}
 */
function parseFrontMatter(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const match = content.match(/^---\n([\s\S]+?)\n---/);

  if (!match) {
    console.error(`❌ Failed to parse Front Matter: ${filePath}`);
    return null;
  }

  const frontMatter = {};
  match[1].split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    if (key) {
      frontMatter[key.trim()] = valueParts
        .join(":")
        .trim()
        .replace(/['"]+/g, "");
    }
  });

  return { frontMatter, content: content.replace(match[0], "").trim() };
}

module.exports = { parseFrontMatter };
