import { useEffect, useState } from "react";
import useStoredState from "./hooks/useStoredState";

import Header from "./components/Header";
import Menu from "./components/Menu";
import Main from "./components/Main";
import { Toaster } from "./components/ui/sonner";
import ChangeTracker from "./components/ChangeTracker";

import {
  getMarkdownFile,
  updateCurrentFileContent,
} from "./utils/localStorageUtils";

function App() {
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [markdown, setMarkdown] = useState(
    getMarkdownFile(currentFileIndex)?.content ?? null,
  );

  useEffect(() => {
    setMarkdown(getMarkdownFile(currentFileIndex)?.content ?? null);
  }, [currentFileIndex]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [fullWidthPreview, setFullWidthPreview] = useState(false);

  const [theme, setTheme] = useStoredState("theme", "light");

  function switchTheme() {
    setTheme((oldTheme) => (oldTheme === "light" ? "dark" : "light"));
  }

  function saveFile() {
    updateCurrentFileContent(currentFileIndex, markdown);
  }

  return (
    <ChangeTracker currentFileIndex={currentFileIndex}>
      <div
        className={`${theme} relative grid min-h-screen grid-cols-[auto_1fr] grid-rows-[4rem]`}
        id="app-container"
      >
        <Header
          setMenuOpen={setMenuOpen}
          setCurrentFileIndex={setCurrentFileIndex}
          currentFileIndex={currentFileIndex}
          menuOpen={menuOpen}
          markdown={markdown}
          gridPosition={{ row: 1, col: 2 }}
        />

        <Menu
          visible={menuOpen}
          theme={theme}
          setCurrentFileIndex={setCurrentFileIndex}
          currentFileIndex={currentFileIndex}
          switchTheme={switchTheme}
          saveFile={saveFile}
          gridPosition={{ row: 1, col: 1 }}
        />

        <Main
          fullWidthPreview={fullWidthPreview}
          setFullWidthPreview={setFullWidthPreview}
          currentFileIndex={currentFileIndex}
          markdown={markdown}
          setMarkdown={setMarkdown}
          gridPosition={{ row: 2, col: 2 }}
        />

        <Toaster position="bottom-right" />
      </div>
    </ChangeTracker>
  );
}

export default App;
