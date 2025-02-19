// @ts-check

const puppeteer = require("puppeteer");
const TurndownService = require("turndown");
const fs = require("fs");
const path = require("path");
const https = require("https");
const { URL } = require("url");

const BASE_URL = "https://dotblogs.com.tw/explooosion"; // Your dotblogs URL
const OUTPUT_DIR = "./docs"; // Output directory for Markdown files
const GITHUB_RAW_BASE =
  "https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs";

const turndownService = new TurndownService();

// Convert <a href=""> links properly
turndownService.addRule("anchor", {
  filter: "a",
  replacement: function (content, node) {
    // @ts-ignore
    const href = node.getAttribute("href");
    return href ? `[${content}](${href})` : content;
  },
});

// Ensure images are converted to local relative paths
turndownService.addRule("img", {
  filter: "img",
  replacement: function (_, node) {
    // @ts-ignore
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
    https
      .get(url, (response) => {
        if (response.statusCode === 200) {
          response.pipe(file);
          file.on("finish", () => {
            file.close();
            console.log(`✅ Image downloaded: ${outputPath}`);
            // @ts-ignore
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
      return [
        ...document.querySelectorAll(".article--in-list .article__title a"),
      ].map((a) => ({
        // @ts-ignore
        title: a.innerText.trim(),
        // @ts-ignore
        url: a.href,
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
    const { contentHTML, subtitle, date, series, tags, images } =
      await page.evaluate(() => {
        /** @type {HTMLDivElement | null} */
        const content = document.querySelector(".article__content");

        /** @type {HTMLSpanElement | null} */
        const dateElement = document.querySelector(
          ".article__date > span:first-child"
        );

        /** @type {NodeListOf<HTMLLinkElement>} */
        const tagElements = document.querySelectorAll(".article__tags a");

        /** @type {HTMLLIElement | null} */
        const seriesElement = document.querySelector(
          ".article__status li:nth-child(3)"
        );

        /** @type {HTMLParagraphElement | null} */
        const subtitleElement = document.querySelector(".article__desc p");

        // Get all image URLs
        /** @type {NodeListOf<HTMLImageElement>} */
        const imageElements = document.querySelectorAll(
          ".article__content img"
        );
        const imageUrls = [...imageElements].map((img) => img.src);

        return {
          contentHTML: content ? content.innerHTML : "",
          subtitle: subtitleElement ? subtitleElement.innerText.trim() : "",
          date: dateElement ? dateElement.innerText.trim() : "",
          series: seriesElement
            ? seriesElement.innerText.trim().toLocaleLowerCase()
            : "",
          tags: [...tagElements].map((tag) => tag.innerText.trim()).join(", "),
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
    const imageFolder = path.join(
      OUTPUT_DIR,
      "images",
      `${formattedDate}_${safeTitle}`
    );
    const bannerFolder = path.join(imageFolder, "banner"); // Folder for the banner image
    if (!fs.existsSync(imageFolder)) {
      fs.mkdirSync(imageFolder, { recursive: true });
    }
    if (!fs.existsSync(bannerFolder)) {
      fs.mkdirSync(bannerFolder, { recursive: true });
    }

    let imagePath = "";

    // Download images, save the first one as banner
    for (let i = 0; i < images.length; i++) {
      try {
        const urlObj = new URL(images[i]);
        let filename = path.basename(urlObj.pathname);
        const extname = path.extname(filename);

        if (!extname) {
          filename += ".png"; // 若無副檔名，補 `.png`
        }

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

          // Encode the URL to ensure GitHub can read it
          const encodedFolder = encodeURIComponent(
            `${formattedDate}_${safeTitle}`
          );
          const encodedFilename = encodeURIComponent(filename);

          imagePath = `${GITHUB_RAW_BASE}/images/${encodedFolder}/banner/${encodedFilename}`;
        }
      } catch (error) {
        console.error(`❌ Failed to download image: ${images[i]}`, error);
      }
    }

    // Update Markdown image paths to local folder
    const markdownWithImages = markdownContent.replace(
      /\!\[(.*?)\]\((.*?)\)/g,
      (match, alt, src) => {
        const encodedFolder = encodeURIComponent(
          `${formattedDate}_${safeTitle}`
        );
        const encodedFilename = encodeURIComponent(path.basename(src));

        return `![${alt}](${GITHUB_RAW_BASE}/images/${encodedFolder}/${encodedFilename})`;
      }
    );

    // Write Markdown file
    const markdownFile = `---
title: "${title}"
subtitle: "${subtitle}"
date: "${new Date(date).toISOString()}"
series: "${series}"
tags: ${tags
      .split(",")
      .map((tag) => `"${tag.trim()}"`)
      .join(",")}
image: "${imagePath}"
--- 

${markdownWithImages}`;

    fs.writeFileSync(filePath, markdownFile);
    console.log(`✅ Article saved: ${filePath}`);
  }

  await browser.close();
  console.log("🎉 All articles and images have been successfully downloaded!");
}

scrapeArticles().catch(console.error);
