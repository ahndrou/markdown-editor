import { useRef, useState } from "react";
import useStoredState from "./hooks/useStoredState";

import Header from "./components/Header";
import Menu from "./components/Menu";
import Main from "./components/Main";
import { Toaster } from "./components/ui/sonner";

import {
  getAllStoredFileMetaData,
  getFirstDBKey,
} from "./utils/localStorageUtils";
import { getCurrentDate } from "./utils/generalUtils";
import { toast } from "sonner";
import ThemeSwitch from "./components/ui/ThemeSwitch";

function App() {
  const [currentFileName, setcurrentFileName] = useState(() => getFirstDBKey());

  const [fileMetaData, setFileMetaData] = useState(() =>
    getAllStoredFileMetaData(),
  );

  const contentModified = useRef(false);
  const markdownRef = useRef(null);

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
    item.content = markdownRef.current;
    localStorage.setItem(currentFileName, JSON.stringify(item));
    contentModified.current = false;
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

  const [theme, setTheme] = useStoredState("theme", "light");

  function switchTheme() {
    setTheme((oldTheme) => (oldTheme === "light" ? "dark" : "light"));
  }

  return (
    <div
      className={`${theme} relative grid min-h-screen grid-rows-[4rem] ${menuOpen ? "grid-cols-[16rem_1fr]" : "grid-cols-[0_1fr]"}`}
      id="app-container"
    >
      <div
        className={`bg-900 col-start-1 row-span-2 row-start-1 overflow-hidden ${menuOpen ? "px-6" : ""}`}
      >
        <Menu
          setcurrentFileName={setcurrentFileName}
          fileMetaData={fileMetaData}
          contentModified={contentModified}
          addNewDocument={addNewDocument}
          saveCurrentMarkdown={saveCurrentMarkdown}
        />
        <ThemeSwitch
          theme={theme}
          switchTheme={switchTheme}
          className={"justify-self-center"}
        />
      </div>

      <div className="col-start-2 row-start-1">
        <Header
          setMenuOpen={setMenuOpen}
          setcurrentFileName={setcurrentFileName}
          currentFileName={currentFileName}
          renameCurrentMarkdown={renameCurrentMarkdown}
          saveCurrentMarkdown={saveCurrentMarkdown}
          deleteCurrentFile={deleteCurrentFile}
          menuOpen={menuOpen}
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
