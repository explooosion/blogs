const puppeteer = require("puppeteer");
const TurndownService = require("turndown");
const fs = require("fs");
const path = require("path");
const https = require("https");
const { URL } = require("url");

const BASE_URL = "https://dotblogs.com.tw/explooosion"; // Your dotblogs URL
const OUTPUT_DIR = "./docs"; // Output directory for Markdown files

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

// Function to download images
async function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          console.log(`✅ Image downloaded: ${outputPath}`);
          resolve();
        });
      } else {
        console.log(`❌ Failed to download image: ${url} (Status: ${response.statusCode})`);
        file.close();
        fs.unlinkSync(outputPath);
        reject(new Error(`Failed to download: ${url}`));
      }
    }).on("error", (err) => {
      console.log(`❌ Error downloading image: ${url}`);
      fs.unlinkSync(outputPath);
      reject(err);
    });
  });
}

async function scrapeArticles() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  let currentPage = 1;
  let hasNextPage = true;
  let articles = [];

  while (hasNextPage) {
    const pageUrl = `${BASE_URL}/${currentPage}`;
    console.log(`🔍 Scraping page ${currentPage}: ${pageUrl}`);
    await page.goto(pageUrl, { waitUntil: "domcontentloaded" });

    // Extract article list
    const pageArticles = await page.evaluate(() => {
      return [...document.querySelectorAll(".article--in-list .article__title a")].map(a => ({
        title: a.innerText.trim(),
        url: a.href
      }));
    });

    articles = [...articles, ...pageArticles];

    // Check for "Next Page" button
    const nextPageElement = await page.$("li.PagedList-skipToNext a");

    if (nextPageElement) {
      currentPage++;
    } else {
      hasNextPage = false;
    }
  }

  console.log(`✅ Found ${articles.length} articles. Starting download...`);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  for (const { title, url } of articles) {
    console.log(`📖 Fetching article: ${title}`);
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Extract article content, metadata, and images
    const { contentHTML, date, tags, view, history, group, images } = await page.evaluate(() => {
      const content = document.querySelector(".article__content");
      const dateElement = document.querySelector(".article__date > span:first-child");
      const tagElements = document.querySelectorAll(".article__tags a");

      const viewElement = document.querySelector(".article__status li:nth-child(1)");
      const historyElement = document.querySelector(".article__status li:nth-child(2)");
      const groupElement = document.querySelector(".article__status li:nth-child(3)");

      // Get all image URLs
      const imageElements = document.querySelectorAll(".article__content img");
      const imageUrls = [...imageElements].map(img => img.src);

      return {
        contentHTML: content ? content.innerHTML : "",
        date: dateElement ? dateElement.innerText.trim() : "Unknown Date",
        tags: [...tagElements].map(tag => tag.innerText.trim()).join(", "),
        view: viewElement ? viewElement.innerText.trim() : "Unknown",
        history: historyElement ? historyElement.innerText.trim() : "Unknown",
        group: groupElement ? groupElement.innerText.trim() : "Unknown",
        images: imageUrls,
      };
    });

    // Convert HTML to Markdown
    const markdownContent = turndownService.turndown(contentHTML);

    // Format date for Windows compatibility (YYYY-MM-DD)
    const formattedDate = date.replace(/[\s:]/g, "-").replace(/[^\d-]/g, "");

    // Generate Markdown file name
    const safeTitle = title.replace(/[<>:"/\\|?*]+/g, "");
    const fileName = `${formattedDate}_${safeTitle}.md`;
    const filePath = path.join(OUTPUT_DIR, fileName);

    // Create dedicated image folder for this article
    const imageFolder = path.join(OUTPUT_DIR, "images", `${formattedDate}_${safeTitle}`);
    const bannerFolder = path.join(imageFolder, "banner"); // Folder for the banner image
    if (!fs.existsSync(imageFolder)) {
      fs.mkdirSync(imageFolder, { recursive: true });
    }
    if (!fs.existsSync(bannerFolder)) {
      fs.mkdirSync(bannerFolder, { recursive: true });
    }

    let bannerPath = "";

    // Download images, save the first one as banner
    for (let i = 0; i < images.length; i++) {
      try {
        const filename = path.basename(new URL(images[i]).pathname);
        const outputPath = path.join(imageFolder, filename);

        if (!fs.existsSync(outputPath)) {
          await downloadImage(images[i], outputPath);
        }

        if (i === 0) {
          // First image is saved in the banner subfolder
          const bannerOutputPath = path.join(bannerFolder, filename);
          if (!fs.existsSync(bannerOutputPath)) {
            await downloadImage(images[i], bannerOutputPath);
          }
          bannerPath = `images/${formattedDate}_${safeTitle}/banner/${filename}`;
        }
      } catch (error) {
        console.error(`❌ Failed to download image: ${images[i]}`, error);
      }
    }

    // Update Markdown image paths to local folder
    const markdownWithImages = markdownContent.replace(
      /\!\[(.*?)\]\((.*?)\)/g,
      (match, alt, src) => `![${alt}](images/${formattedDate}_${safeTitle}/${path.basename(src)})`
    );

    // Generate final Markdown content
    const markdownFile = `---
title: "${title}"
date: "${date}"
tags: [${tags}]
view: "${view}"
history: "${history}"
group: "${group}"
banner: "${bannerPath}"
---

${markdownWithImages}`;

    fs.writeFileSync(filePath, markdownFile);
    console.log(`✅ Article saved: ${filePath}`);
  }

  await browser.close();
  console.log("🎉 All articles and images have been successfully downloaded!");
}

scrapeArticles().catch(console.error);
