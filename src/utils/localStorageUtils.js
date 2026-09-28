import defaultMarkdown from "../initial-data.json";

// To prevent file names colliding with things such as theme settings
// (which are also stored in localStorage), they are stored with a
// prefix.
const DB_PREFIX = "DB:";

export function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
}

export function retrieveFromLocalStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return JSON.parse(item);
  } catch (error) {
    console.log(error);
  }
}

export function getMarkdownFile(index) {
  return retrieveFromLocalStorage(index);
}

export function initLocalStorage() {
  localStorage.setItem("DB:welcome.md", JSON.stringify(defaultMarkdown));
}

export function isStorageInitialized() {
  return Object.keys(localStorage).some((key) => key.startsWith(DB_PREFIX));
}

export function getFirstDBKey() {
  return Object.keys(localStorage).find((key) => key.startsWith(DB_PREFIX));
}

export function getAllStoredFileMetaData() {
  const metaData = [];

  for (const entry in localStorage) {
    if (entry.startsWith(DB_PREFIX)) {
      metaData.push({
        name: entry,
        createdAt: JSON.parse(localStorage.getItem(entry)).createdAt,
      });
    }
  }

  return metaData;
}

export function removeDBPrefix(fileName) {
  return fileName.slice(DB_PREFIX.length);
}

export function addDBPrefix(fileName) {
  return `${DB_PREFIX}${fileName}`;
}
