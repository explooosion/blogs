// @ts-check

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const { turndownService } = require("./turndownConfig");
const { downloadImage, updateMarkdownImagePaths } = require("./imageUtils");
const { BASE_URL, OUTPUT_DIR, GITHUB_RAW_BASE } = require("./config");

/**
 * Scrape blog articles
 */
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
        .../** @type {NodeListOf<HTMLLinkElement>} */ (
          document.querySelectorAll(".article--in-list .article__title a")
        ),
      ].map((a) => ({
        title: a.innerText.trim(),
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

    const markdownContent = turndownService.turndown(contentHTML);
    const formattedDate = date.replace(/[\s:]/g, "-").replace(/[^\d-]/g, "");
    const safeTitle = title.replace(/[<>:"/\\|?*]+/g, "");
    const fileName = `${formattedDate}_${safeTitle}.md`;
    const filePath = path.join(OUTPUT_DIR, fileName);

    const imageFolder = path.join(
      OUTPUT_DIR,
      "images",
      `${formattedDate}_${safeTitle}`
    );
    const bannerFolder = path.join(imageFolder, "banner");
    if (!fs.existsSync(imageFolder))
      fs.mkdirSync(imageFolder, { recursive: true });
    if (!fs.existsSync(bannerFolder))
      fs.mkdirSync(bannerFolder, { recursive: true });

    let imagePath = "";

    for (let i = 0; i < images.length; i++) {
      try {
        const urlObj = new URL(images[i]);
        let filename = path.basename(urlObj.pathname);
        const extname = path.extname(filename);
        if (!extname) filename += ".png";

        const outputPath = path.join(imageFolder, filename);
        if (!fs.existsSync(outputPath))
          await downloadImage(images[i], outputPath);

        if (i === 0) {
          const bannerOutputPath = path.join(bannerFolder, filename);
          if (!fs.existsSync(bannerOutputPath))
            await downloadImage(images[i], bannerOutputPath);

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

    const markdownWithUpdatedImages = updateMarkdownImagePaths(
      markdownContent,
      formattedDate,
      safeTitle
    );

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

${markdownWithUpdatedImages}`;

    fs.writeFileSync(filePath, markdownFile);
    console.log(`✅ Article saved: ${filePath}`);
  }

  await browser.close();
  console.log("🎉 All articles and images have been successfully downloaded!");
}

module.exports = { scrapeArticles };
