require("dotenv").config(); // Load .env file

module.exports = {
  OUTPUT_DIR: process.env.OUTPUT_DIR || "./src/upload/files",
  HASHNODE_API_URL: process.env.HASHNODE_API_URL || "https://gql.hashnode.com",
  HASHNODE_API_TOKEN: process.env.HASHNODE_API_TOKEN || "",
  PUBLICATION_ID: process.env.PUBLICATION_ID || "",
  SERIES_ID: process.env.SERIES_ID || "",
  HASHNODE_TAGS_URL:
    process.env.HASHNODE_TAGS_URL ||
    "https://raw.githubusercontent.com/Hashnode/support/main/misc/tags.json",
};
