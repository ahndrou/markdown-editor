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
  const savedContent = useRef(() => getDocumentContent(documentID));

  const hasUnsavedEdits = contentDraft !== savedContent.current;

  const documentName =
    docSetMetaData.find((doc) => doc.id === documentID)?.name ?? null;

  function changeDocument(documentID) {
    setDocumentID(documentID);
    const content = getDocumentContent(documentID);
    setContentDraft(content);
    savedContent.current = content;
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
