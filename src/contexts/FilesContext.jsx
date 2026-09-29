import { createContext, useContext, useState } from "react";

import { getAllStoredFileMetaData } from "@/utils/localStorageUtils";
import { getCurrentDate } from "@/utils/generalUtils";

const FilesContext = createContext(null);

export function useFiles() {
  return useContext(FilesContext);
}

export function FilesProvider({ children }) {
  const [fileMetaData, setFileMetaData] = useState(() =>
    getAllStoredFileMetaData(),
  );

  function fileExists(name) {
    return fileMetaData.some((file) => file.name === name);
  }

  function createFile() {
    const NEW_DOC_BASE_NAME = "DB:document";
    let newFileNum = 1;
    let newFileName = `${NEW_DOC_BASE_NAME}.md`;

    while (fileExists(newFileName)) {
      newFileName = `${NEW_DOC_BASE_NAME}${newFileNum}.md`;
      newFileNum++;
    }

    const createdAtDate = getCurrentDate();

    setFileMetaData((state) => [
      ...state,
      { name: newFileName, createdAt: createdAtDate },
    ]);

    const document = {
      createdAt: createdAtDate,
      content: "# New file.",
    };

    localStorage.setItem(newFileName, JSON.stringify(document));
  }

  function renameFile(oldName, newName) {
    const item = localStorage.getItem(oldName);
    localStorage.setItem(newName, item);
    localStorage.removeItem(oldName);

    setFileMetaData((state) =>
      state.map((file) =>
        file.name === oldName ? { ...file, name: newName } : file,
      ),
    );
  }

  // Returns the name of the file to open next, or null if none remain.
  function deleteFile(name) {
    localStorage.removeItem(name);

    const remaining = fileMetaData.filter((file) => file.name !== name);
    setFileMetaData(remaining);

    return remaining[0]?.name ?? null;
  }

  return (
    <FilesContext.Provider
      value={{ fileMetaData, fileExists, createFile, renameFile, deleteFile }}
    >
      {children}
    </FilesContext.Provider>
  );
}
