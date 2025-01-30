const axios = require("axios");
const { HASHNODE_TAGS_URL } = require("./config");

/**
 * Fetches the latest tags from Hashnode's official GitHub repository.
 * @returns {Promise<Map<string, string>>} A map of { tagSlug: objectID }.
 */
async function fetchTags() {
  let tagMap = new Map();

  try {
    console.log("🔄 Fetching Hashnode tags...");
    const response = await axios.get(HASHNODE_TAGS_URL);
    const tagsData = response.data;

    tagMap = new Map(tagsData.map((tag) => [tag.slug, tag.objectID]));
    console.log(`✅ Loaded ${tagMap.size} tags from Hashnode.`);
  } catch (error) {
    console.error(
      "❌ Failed to fetch Hashnode tags. Check your connection.",
      error
    );
  }

  return tagMap;
}

module.exports = { fetchTags };
