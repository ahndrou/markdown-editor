import { useDocumentSet } from "@/contexts/DocumentSetProvider";
import { useMemo, useRef, useState } from "react";

/**
 * Provides an interface to the currently selected document.
 *
 * Abstracts away from dealing with the document set directly.
 * @param documentID OPTIONAL. A specific initial document ID to set.
 * @returns Object containing information about the current document and functions to modify it.
 */
export default function useCurrentDocument(initialID) {
  const {
    docSetMetaData,
    renameDocument,
    deleteDocument,
    getDocumentContent,
    modifyDocumentContent,
  } = useDocumentSet();

  if (!initialID) {
    initialID = docSetMetaData[0]?.id ?? null;
  }

  const [documentID, setDocumentID] = useState(initialID);
  const [contentDraft, setContentDraft] = useState(() =>
    loadContent(documentID),
  );

  // useRef assigns its current value as the argument only on the first
  // render. This way prevents reading the database on every render.
  const lastSavedContent = useRef(contentDraft);

  const documentName =
    docSetMetaData.find((doc) => doc.id === documentID)?.name ?? null;

  /**
   *
   * @param {*} documentID Document ID to change to.
   * @param param1 Options object for defining how unsaved edits should be handled.
   * @returns Success description object.
   */
  function changeDocument(documentID, { unsavedEdits = "block" } = {}) {
    if (hasUnsavedEdits()) {
      if (unsavedEdits === "block") return { ok: false, reason: "unsaved" };
      if (unsavedEdits === "save") saveCurrentDocumentEdits();
    }

    const content = loadContent(documentID);
    setDocumentID(documentID);
    setContentDraft(content);
    lastSavedContent.current = content;
    return { ok: true };
  }

  function renameCurrentDocument(newName) {
    const result = renameDocument(documentID, newName);

    return result;
  }

  function deleteCurrentDocument() {
    const nextID = deleteDocument(documentID);
    setDocumentID(nextID);

    return nextID;
  }

  function saveCurrentDocumentEdits() {
    modifyDocumentContent(documentID, contentDraft);
    lastSavedContent.current = getDocumentContent(documentID);
  }

  function hasUnsavedEdits() {
    return contentDraft !== lastSavedContent.current;
  }

  function loadContent(documentID) {
    return documentID === null ? "" : getDocumentContent(documentID);
  }

  return {
    documentID,
    documentName,
    contentDraft,
    loadContent,
    hasUnsavedEdits,
    changeDocument,
    deleteCurrentDocument,
    saveCurrentDocumentEdits,
    renameCurrentDocument,
    setContentDraft,
  };
}
