import { useEffect, useRef, useState } from "react";
import useStoredState from "./hooks/useStoredState";

import Header from "./components/Header";
import Menu from "./components/Menu";
import Main from "./components/Main";
import { Toaster } from "./components/ui/sonner";

import {
  getAllStoredFileMetaData,
  getFirstDBKey,
  getMarkdownFile,
} from "./utils/localStorageUtils";
import { getCurrentDate } from "./utils/generalUtils";
import { toast } from "sonner";

function App() {
  const [currentFileName, setcurrentFileName] = useState(() => getFirstDBKey());

  useEffect(() => {
    setMarkdown(
      JSON.parse(localStorage.getItem(currentFileName))?.content ?? null,
    );
    contentModified.current = false;
  }, [currentFileName]);

  const [markdown, setMarkdown] = useState(
    () => getMarkdownFile(currentFileName).content,
  );

  const [fileMetaData, setFileMetaData] = useState(() =>
    getAllStoredFileMetaData(),
  );

  const contentModified = useRef(false);

  function modifyDocumentContent(newContent) {
    if (newContent !== markdown) {
      contentModified.current = true;
    }
    setMarkdown(newContent);
  }

  function addNewDocument() {
    const NEW_DOC_BASE_NAME = "DB:document";
    let newFileNum = 1;
    let newFileName = `${NEW_DOC_BASE_NAME}.md`;

    while (true) {
      let fileAlreadyExists = fileMetaData.some(
        (file) => file.name === newFileName,
      );

      if (fileAlreadyExists) {
        newFileName = `${NEW_DOC_BASE_NAME}${newFileNum}.md`;
        newFileNum++;
      } else {
        break;
      }
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

  function saveCurrentMarkdown() {
    const item = JSON.parse(localStorage.getItem(currentFileName));
    item.content = markdown;
    localStorage.setItem(currentFileName, JSON.stringify(item));
  }

  function renameCurrentMarkdown(newName) {
    if (!newName || newName === currentFileName) return false;

    if (fileMetaData.some((file) => file.name === newName)) {
      toast(`${newName} already exists.`);
      return false;
    }

    const item = localStorage.getItem(currentFileName);
    localStorage.setItem(newName, item);
    localStorage.removeItem(currentFileName);

    setFileMetaData((state) =>
      state.map((file) =>
        file.name === currentFileName ? { ...file, name: newName } : file,
      ),
    );
    setcurrentFileName(newName);
    toast(`${currentFileName} renamed to ${newName}.`);
    return true;
  }

  function deleteCurrentFile() {
    localStorage.removeItem(currentFileName);

    const newIndex =
      Object.keys(localStorage).filter((key) => key.startsWith("DB:"))?.[0] ??
      null;

    setFileMetaData((data) =>
      data.filter((datum) => datum.name !== currentFileName),
    );
    setcurrentFileName(newIndex);

    toast(`${currentFileName} deleted.`);
  }

  const [menuOpen, setMenuOpen] = useState(false);
  const [fullWidthPreview, setFullWidthPreview] = useState(false);

  const [theme, setTheme] = useStoredState("theme", "light");

  function switchTheme() {
    setTheme((oldTheme) => (oldTheme === "light" ? "dark" : "light"));
  }

  return (
    <div
      className={`${theme} relative grid min-h-screen grid-cols-[auto_1fr] grid-rows-[4rem]`}
      id="app-container"
    >
      <Header
        setMenuOpen={setMenuOpen}
        setcurrentFileName={setcurrentFileName}
        currentFileName={currentFileName}
        renameCurrentMarkdown={renameCurrentMarkdown}
        deleteCurrentFile={deleteCurrentFile}
        menuOpen={menuOpen}
        markdown={markdown}
        gridPosition={{ row: 1, col: 2 }}
      />

      <Menu
        visible={menuOpen}
        theme={theme}
        switchTheme={switchTheme}
        setcurrentFileName={setcurrentFileName}
        fileMetaData={fileMetaData}
        contentModified={contentModified}
        addNewDocument={addNewDocument}
        saveCurrentMarkdown={saveCurrentMarkdown}
        gridPosition={{ row: 1, col: 1 }}
      />

      <Main
        fullWidthPreview={fullWidthPreview}
        setFullWidthPreview={setFullWidthPreview}
        currentFileName={currentFileName}
        markdown={markdown}
        setMarkdown={modifyDocumentContent}
        gridPosition={{ row: 2, col: 2 }}
      />

      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
