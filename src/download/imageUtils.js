const fs = require("fs");
const https = require("https");

/**
 * Download an image from a URL
 * @param {string} url
 * @param {string} outputPath
 * @returns {Promise<void>}
 */
async function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    https
      .get(url, (response) => {
        if (response.statusCode === 200) {
          response.pipe(file);
          file.on("finish", () => {
            file.close();
            console.log(`✅ Image downloaded: ${outputPath}`);
            resolve();
          });
        } else {
          console.log(
            `❌ Failed to download image: ${url} (Status: ${response.statusCode})`
          );
          file.close();
          fs.unlinkSync(outputPath);
          reject(new Error(`Failed to download: ${url}`));
        }
      })
      .on("error", (err) => {
        console.log(`❌ Error downloading image: ${url}`);
        fs.unlinkSync(outputPath);
        reject(err);
      });
  });
}

/**
 * Convert image paths in Markdown to use GitHub raw URL
 * @param {string} markdownContent
 * @param {string} formattedDate
 * @param {string} safeTitle
 * @returns {string} Updated Markdown content
 */
function updateMarkdownImagePaths(markdownContent, formattedDate, safeTitle) {
  return markdownContent.replace(/\!\[(.*?)\]\((.*?)\)/g, (match, alt, src) => {
    const encodedFolder = encodeURIComponent(`${formattedDate}_${safeTitle}`);
    const encodedFilename = encodeURIComponent(src.split("/").pop());

    return `![${alt}](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/${encodedFolder}/${encodedFilename})`;
  });
}

module.exports = { downloadImage, updateMarkdownImagePaths };
