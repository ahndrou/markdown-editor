import { getCurrentDate } from "@/utils/generalUtils";

import defaultMarkdown from "../initial-data.json";

const storageUpdatedEvent = new Event("storageUpdated");

export function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    dispatchEvent(storageUpdatedEvent);
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

export function addFileToStorage(fileName) {
  let markdownDb = retrieveFromLocalStorage("markdownDb");

  markdownDb.push({
    name: fileName,
    createdAt: getCurrentDate(),
    content: "# New file.",
  });

  saveToLocalStorage("markdownDb", markdownDb);
}

export function deleteFileFromStorage(index) {
  let markdownDb = retrieveFromLocalStorage("markdownDb");
  markdownDb = markdownDb.filter((_, i) => i !== index);
  saveToLocalStorage("markdownDb", markdownDb);
}

export function updateCurrentFileContent(index, content) {
  let markdownDb = retrieveFromLocalStorage("markdownDb");
  markdownDb[index].content = content;
  saveToLocalStorage("markdownDb", markdownDb);
}

export function updateCurrentFileName(index, name) {
  let markdownDb = retrieveFromLocalStorage("markdownDb");
  markdownDb[index].name = name;
  saveToLocalStorage("markdownDb", markdownDb);
}

export function initLocalStorage() {
  localStorage.setItem("DB:welcome.md", JSON.stringify(defaultMarkdown));
}

export function isStorageInitialized() {
  return Object.keys(localStorage).some((key) => key.startsWith("DB:"));
}

export function getFirstDBKey() {
  return Object.keys(localStorage).find((key) => key.startsWith("DB:"));
}

export function getAllStoredFileMetaData() {
  const metaData = [];

  for (const entry in localStorage) {
    if (entry.startsWith("DB:")) {
      metaData.push({
        name: entry,
        createdDate: localStorage[entry].createdAt,
      });
    }
  }

  return metaData;
}

/**
 * Derives an array of meta-data objects for the MD files stored in localStorage.
 *
 * @returns An array of objects containing meta-data for files stored files.
 */
export function deriveFileMetaDataList() {
  const db = retrieveFromLocalStorage("markdownDb");

  return db.map((file) => {
    return { name: file.name, createdAt: file.createdAt };
  });
}
