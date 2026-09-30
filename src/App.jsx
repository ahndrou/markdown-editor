import { useRef, useState } from "react";

import Header from "./components/Header";
import Menu from "./components/Menu";
import Main from "./components/Main";
import { Toaster } from "./components/ui/sonner";
import ThemeSwitch from "./components/ui/ThemeSwitch";

import * as database from "./database";

function App() {
  const [documentID, setDocumentID] = useState(() => database.getIDArray()[0]);

  const docHasUnsavedChanges = useRef(false);
  const markdownRef = useRef(null);

  function saveDocumentEdits() {
    const item = JSON.parse(localStorage.getItem(documentID));
    item.content = markdownRef.current;
    localStorage.setItem(documentID, JSON.stringify(item));
    docHasUnsavedChanges.current = false;
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
          docHasUnsavedChanges={docHasUnsavedChanges}
        />
        <ThemeSwitch className={"justify-self-center"} />
      </div>

      <div className="col-start-2 row-start-1">
        <Header
          setMenuOpen={setMenuOpen}
          menuOpen={menuOpen}
          saveCurrentMarkdown={saveDocumentEdits}
          currentFileName={documentID}
          setCurrentFileName={setDocumentID}
        />
      </div>

      <div className="col-start-2 row-start-2">
        <Main
          currentFileName={documentID}
          docHasUnsavedChanges={docHasUnsavedChanges}
          markdownRef={markdownRef}
        />
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
