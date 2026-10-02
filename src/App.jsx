import { useEffect, useState } from "react";
import { toast } from "sonner";

import Header from "./components/Header";
import Menu from "./components/Menu";
import Main from "./components/Main";
import { Toaster } from "./components/ui/sonner";
import ThemeSwitch from "./components/ui/ThemeSwitch";
import { useDocumentSet } from "./contexts/DocumentSetProvider";

function App() {
  const {
    docSetMetaData,
    renameDocument,
    deleteDocument,
    modifyDocumentContent,
    getDocumentContent,
  } = useDocumentSet();

  const [documentID, setDocumentID] = useState(
    () => docSetMetaData[0]?.id ?? null,
  );

  const [contentDraft, setContentDraft] = useState(() =>
    getDocumentContent(documentID),
  );

  useEffect(
    () => setContentDraft(getDocumentContent(documentID)),
    [documentID],
  );

  const hasUnsavedChanges = contentDraft !== getDocumentContent(documentID);

  const documentName =
    docSetMetaData.find((doc) => doc.id === documentID)?.name ?? null;

  function renameCurrentDocument(newName) {
    const result = renameDocument(documentID, newName);

    if (result.ok) {
      toast(`${result.oldName} renamed to ${newName}.`);
    } else if (result.reason === "empty") {
      toast("Given file name cannot be empty.");
    } else if (result.reason === "duplicate") {
      toast(`${newName} already exists.`);
    }

    return result.ok;
  }

  function deleteCurrentDocument() {
    setDocumentID(deleteDocument(documentID));
    toast(`${documentName} deleted.`);
  }

  function saveDocumentEdits() {
    modifyDocumentContent(documentID, contentDraft);
  }

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={`relative grid min-h-screen grid-rows-[4rem] ${menuOpen ? "grid-cols-[16rem_1fr]" : "grid-cols-[0_1fr]"}`}
      id="app-container"
    >
      <div
        className={`bg-900 col-start-1 row-span-2 row-start-1 overflow-hidden ${menuOpen ? "px-6" : ""}`}
      >
        <Menu
          onDocumentChange={setDocumentID}
          onDocumentSave={saveDocumentEdits}
          docHasUnsavedChanges={hasUnsavedChanges}
        />
        <ThemeSwitch className={"justify-self-center"} />
      </div>

      <div className="col-start-2 row-start-1">
        <Header
          menuOpen={menuOpen}
          documentName={documentName}
          onMenuOpenChange={() => setMenuOpen((open) => !open)}
          onDocumentSave={saveDocumentEdits}
          onRename={renameCurrentDocument}
          onDelete={deleteCurrentDocument}
        />
      </div>

      <div className="col-start-2 row-start-2">
        <Main
          empty={documentID === null}
          content={contentDraft}
          onContentEdit={setContentDraft}
        />
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
