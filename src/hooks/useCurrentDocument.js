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
    getDocumentContent(documentID),
  );

  const savedContent = useRef(getDocumentContent(documentID));

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

    const content = getDocumentContent(documentID);
    setDocumentID(documentID);
    setContentDraft(content);
    savedContent.current = content;
    return { ok: true };
  }

  function renameCurrentDocument(newName) {
    const result = renameDocument(documentID, newName);

    return result;
  }

  function deleteCurrentDocument() {
    const nextID = deleteDocument(documentID);

    return nextID;
  }

  function saveCurrentDocumentEdits() {
    modifyDocumentContent(documentID, contentDraft);
    savedContent.current = getDocumentContent(documentID);
  }

  function hasUnsavedEdits() {
    return contentDraft !== savedContent.current;
  }

  return {
    documentID,
    documentName,
    contentDraft,
    hasUnsavedEdits,
    changeDocument,
    deleteCurrentDocument,
    saveCurrentDocumentEdits,
    renameCurrentDocument,
    setContentDraft,
  };
}
