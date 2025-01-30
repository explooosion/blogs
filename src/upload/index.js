const fs = require("fs");
const path = require("path");

const { OUTPUT_DIR } = require("./config");
const { fetchTags } = require("./fetchTags");
const { parseFrontMatter } = require("./parseMarkdown");
const { convertTags } = require("./tagConverter");
const { uploadToHashnode } = require("./uploadPost");

/**
 * Main execution function.
 */
async function main() {
  const tagMap = await fetchTags(); // Fetch Hashnode tags

  const markdownFiles = fs
    .readdirSync(OUTPUT_DIR)
    .filter((file) => file.endsWith(".md"));
  if (markdownFiles.length === 0) {
    console.log(
      "❌ No Markdown files found. Please add some before running the script."
    );
    return;
  }

  console.log(
    `📂 Found ${markdownFiles.length} Markdown files. Starting upload...`
  );

  for (const file of markdownFiles) {
    const filePath = path.join(OUTPUT_DIR, file);
    const parsed = parseFrontMatter(filePath);
    if (!parsed) continue;

    const { frontMatter, content } = parsed;
    const tags = frontMatter.tags
      ? convertTags(frontMatter.tags.split(","), tagMap)
      : [];

    await uploadToHashnode(frontMatter, content, tags);
  }

  console.log("🎉 All posts uploaded successfully!");
}

main().catch(console.error);
