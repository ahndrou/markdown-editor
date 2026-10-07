import { useState } from "react";
import { toast } from "sonner";

import Header from "./components/Header";
import Menu from "./components/Menu";
import Main from "./components/Main";
import { Toaster } from "./components/ui/sonner";
import ThemeSwitch from "./components/ui/ThemeSwitch";
import useCurrentDocument from "./hooks/useCurrentDocument";
import MenuToggle from "./components/MenuToggle";
import DocumentRenamer from "./components/DocumentRenamer";
import DeleteButton from "./components/DeleteButton";
import SaveButton from "./components/SaveButton";

function App() {
  const {
    documentID,
    documentName,
    renameCurrentDocument: baseRename,
    deleteCurrentDocument: baseDelete,
    contentDraft,
    changeDocument,
    saveCurrentDocumentEdits,
    setContentDraft,
  } = useCurrentDocument();

  function renameCurrentDocument(newName) {
    const result = baseRename(newName);

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
    baseDelete();
    toast(`${documentName} deleted.`);
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
        <Menu onDocumentChange={changeDocument} />
        <ThemeSwitch className={"justify-self-center"} />
      </div>

      <div className="col-start-2 row-start-1">
        <Header
          start={
            <MenuToggle
              menuOpen={menuOpen}
              onMenuOpenChange={() => setMenuOpen((open) => !open)}
            />
          }
          title={
            documentID !== null && (
              <DocumentRenamer
                documentName={documentName}
                onRename={renameCurrentDocument}
              />
            )
          }
          actions={
            documentID !== null && (
              <>
                <DeleteButton
                  deleteCurrentFile={deleteCurrentDocument}
                  currentFileName={documentName}
                />
                <SaveButton
                  documentName={documentName}
                  onSave={saveCurrentDocumentEdits}
                />
              </>
            )
          }
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
