const axios = require("axios");
const {
  HASHNODE_API_URL,
  HASHNODE_API_TOKEN,
  PUBLICATION_ID,
  SERIES_ID,
} = require("./config");

/**
 * Uploads a Markdown post to Hashnode.
 * @param {Object} frontMatter Parsed metadata from Markdown file.
 * @param {string} content Markdown content of the post.
 * @param {Array} tags List of converted Hashnode tags.
 */
async function uploadToHashnode(frontMatter, content, tags) {
  console.log(`📤 Uploading post: ${frontMatter.title}`);

  const mutation = `
    mutation PublishPost($input: PublishPostInput!) {
      publishPost(input: $input) {
        post {
          url
        }
      }
    }
  `;

  let coverImageOptions = frontMatter.image
    ? {
        coverImageURL: frontMatter.image,
        isCoverAttributionHidden:
          frontMatter.isCoverAttributionHidden === "true",
        coverImageAttribution: frontMatter.coverImageAttribution || "",
        coverImagePhotographer: frontMatter.coverImagePhotographer || "",
        stickCoverToBottom: frontMatter.stickCoverToBottom === "true",
      }
    : undefined;

  const variables = {
    input: {
      title: frontMatter.title,
      subtitle: frontMatter.subtitle || "",
      publicationId: PUBLICATION_ID,
      contentMarkdown: content,
      publishedAt: frontMatter.date || new Date().toISOString(),
      coverImageOptions,
      metaTags: {
        title: frontMatter.title,
        description: frontMatter.subtitle || frontMatter.title,
        // image: coverImageOptions ? coverImageOptions.coverImageURL : undefined,
      },
      seriesId: SERIES_ID,
      tags: tags.length > 0 ? tags : undefined,
    },
  };

  try {
    const response = await axios.post(
      HASHNODE_API_URL,
      { query: mutation, variables },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HASHNODE_API_TOKEN}`,
        },
      }
    );

    if (response.data.errors) {
      console.error("❌ Upload failed:", response.data.errors);
    } else {
      console.log(
        `✅ Successfully published: ${frontMatter.title} (URL: ${response.data.data.publishPost.post.url})`
      );
    }
  } catch (error) {
    console.error("❌ Error uploading post:", error);
  }
}

module.exports = { uploadToHashnode };
