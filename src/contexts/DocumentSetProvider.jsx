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

const DocumentSetContext = createContext(null);

export function useDocumentSet() {
  return useContext(DocumentSetContext);
}

export function DocumentSetProvider({ children }) {
  const [docSetMetaData, setDocSetMetaData] = useState(() =>
    database.getAllMetaData(),
  );

  function documentExists(name) {
    return docSetMetaData.some((doc) => doc.name === name);
  }

  function createDocument() {
    const NEW_DOC_BASE_NAME = "document";
    let newDocNumber = 1;
    let newDocName = `${NEW_DOC_BASE_NAME}.md`;

    while (documentExists(newDocName)) {
      newDocName = `${NEW_DOC_BASE_NAME}${newDocNumber}.md`;
      newDocNumber++;
    }

    const id = database.addNewDocument(newDocName);
    const { createdAt } = database.getDocument(id);

    setDocSetMetaData((state) => [
      ...state,
      { id, name: newDocName, createdAt },
    ]);
  }

  // Returns { ok: true, oldName } on success, or
  // { ok: false, reason: "unchanged" | "empty" | "duplicate" } on failure.
  function renameDocument(id, newName) {
    const oldName = docSetMetaData.find((doc) => doc.id === id)?.name;

    if (newName === oldName) return { ok: false, reason: "unchanged" };
    if (newName === "") return { ok: false, reason: "empty" };
    if (documentExists(newName)) return { ok: false, reason: "duplicate" };

    database.renameDocument(id, newName);

    setDocSetMetaData((state) =>
      state.map((doc) => (doc.id === id ? { ...doc, name: newName } : doc)),
    );

    return { ok: true, oldName };
  }

  // Returns the ID of the file to open next, or null if none remain.
  function deleteDocument(id) {
    database.deleteDocument(id);

    const remaining = docSetMetaData.filter((file) => file.id !== id);
    setDocSetMetaData(remaining);

    return remaining[0]?.id ?? null;
  }

  function modifyDocumentContent(id, newContent) {
    database.modifyDocumentContent(id, newContent);
  }

  return (
    <DocumentSetContext.Provider
      value={{
        docSetMetaData,
        createDocument,
        renameDocument,
        deleteDocument,
        modifyDocumentContent,
      }}
    >
      {children}
    </DocumentSetContext.Provider>
  );
}
