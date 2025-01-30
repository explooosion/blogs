/**
 * Converts user-provided tags into Hashnode's required format.
 * - Uses direct match first.
 * - Splits multi-word tags and tries partial matches.
 * - Does not apply fuzzy matching (to prevent incorrect matches like "host" → "ghost").
 * @param {string[]} tagSlugs List of user-provided tags
 * @param {Map<any, any>} tagMap Map of Hashnode tags { tagSlug: objectID }
 * @returns {{ id: string }[]} Array of valid Hashnode tag IDs
 */
function convertTags(tagSlugs, tagMap) {
  if (!tagSlugs || tagSlugs.length === 0) return [];

  const matchedTags = [];

  tagSlugs.forEach((slug) => {
    const words = slug.trim().toLowerCase().split(" "); // 🔹 Split multi-word tags
    for (const word of words) {
      if (tagMap.has(word)) {
        matchedTags.push({ id: tagMap.get(word) }); // ✅ Exact match found
      }
    }
  });

  return matchedTags;
}

module.exports = { convertTags };
