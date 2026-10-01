import { createContext, useContext, useState } from "react";

import * as database from "@/database";

/**
 * This module should act as an interface to the document database.
 * It should abstract from the implementation of the database.
 *
 * Currently uses localStorage and so is synchronous. As such,
 * it works by updating the localStorage object, and then immediately
 * duplicating it in React state.
 *
 * The idea behind this design is an attempt to make the app easier to
 * change databases - perhaps to async ones too.
 */

const FilesContext = createContext(null);

export function useFiles() {
  return useContext(FilesContext);
}

export function FilesProvider({ children }) {
  const [fileMetaData, setFileMetaData] = useState(() =>
    database.getAllMetaData(),
  );

  function fileExists(name) {
    return fileMetaData.some((file) => file.name === name);
  }

  function createFile() {
    const NEW_DOC_BASE_NAME = "document";
    let newFileNum = 1;
    let newFileName = `${NEW_DOC_BASE_NAME}.md`;

    while (fileExists(newFileName)) {
      newFileName = `${NEW_DOC_BASE_NAME}${newFileNum}.md`;
      newFileNum++;
    }

    const id = database.addNewDocument(newFileName);
    const { createdAt } = database.getDocument(id);

    setFileMetaData((state) => [
      ...state,
      { id, name: newFileName, createdAt },
    ]);
  }

  function renameFile(id, newName) {
    database.renameDocument(id, newName);

    setFileMetaData((state) =>
      state.map((file) => (file.id === id ? { ...file, name: newName } : file)),
    );
  }

  // Returns the ID of the file to open next, or null if none remain.
  function deleteFile(id) {
    database.deleteDocument(id);

    const remaining = fileMetaData.filter((file) => file.id !== id);
    setFileMetaData(remaining);

    return remaining[0]?.id ?? null;
  }

  return (
    <FilesContext.Provider
      value={{ fileMetaData, fileExists, createFile, renameFile, deleteFile }}
    >
      {children}
    </FilesContext.Provider>
  );
}
