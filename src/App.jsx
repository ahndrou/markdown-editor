import { useRef, useState } from "react";

import Header from "./components/Header";
import Menu from "./components/Menu";
import Main from "./components/Main";
import { Toaster } from "./components/ui/sonner";

import { getFirstDBKey } from "./utils/localStorageUtils";
import ThemeSwitch from "./components/ui/ThemeSwitch";

function App() {
  const [currentFileName, setCurrentFileName] = useState(() => getFirstDBKey());

  const contentModified = useRef(false);
  const markdownRef = useRef(null);

  function saveDocumentEdits() {
    const item = JSON.parse(localStorage.getItem(currentFileName));
    item.content = markdownRef.current;
    localStorage.setItem(currentFileName, JSON.stringify(item));
    contentModified.current = false;
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
          setCurrentFileName={setCurrentFileName}
          contentModified={contentModified}
          saveCurrentMarkdown={saveDocumentEdits}
        />
        <ThemeSwitch className={"justify-self-center"} />
      </div>

      <div className="col-start-2 row-start-1">
        <Header
          setMenuOpen={setMenuOpen}
          menuOpen={menuOpen}
          saveCurrentMarkdown={saveDocumentEdits}
          currentFileName={currentFileName}
          setCurrentFileName={setCurrentFileName}
        />
      </div>

      <div className="col-start-2 row-start-2">
        <Main
          currentFileName={currentFileName}
          contentModifiedRef={contentModified}
          markdownRef={markdownRef}
        />
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
