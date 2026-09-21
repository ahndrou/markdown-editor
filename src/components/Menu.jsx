import FileListItem from "./FileListItem";
import logo from "../assets/logo.svg";
import ThemeSwitch from "./ui/ThemeSwitch";

import { addFileToStorage } from "@/utils/localStorageUtils.js";
import useFileItems from "@/hooks/useFileItems";

export default function Menu({
  visible,
  theme,
  setCurrentFileIndex,
  currentFileIndex,
  switchTheme,
  saveFile,
  gridPosition,
}) {
  const [fileItems, _] = useFileItems();

  const visibleClasses = visible ? "w-65 px-6" : "w-0 px-0";
  const gridClasses = `col-start-${gridPosition.col} row-start-${gridPosition.row} row-span-2`;

  const fileListItems = fileItems.map((mdObj, index) => (
    <FileListItem
      key={mdObj.name}
      creationDate={mdObj.createdAt}
      fileName={mdObj.name}
      setCurrentFileIndex={setCurrentFileIndex}
      selectedFileIndex={currentFileIndex}
      saveFile={saveFile}
      index={index}
    />
  ));

  const NEW_DOC_BASE_NAME = "document";

  function addNewDocument() {
    let newFileNum = 1;
    let newFileName = `${NEW_DOC_BASE_NAME}.md`;

    while (true) {
      let fileAlreadyExists = fileItems.reduce(
        (accumulator, file) => accumulator || file.name == newFileName,
        false,
      );

      if (fileAlreadyExists) {
        newFileName = `${NEW_DOC_BASE_NAME}${newFileNum}.md`;
        newFileNum++;
      } else {
        break;
      }
    }

    addFileToStorage(newFileName);
  }

  return (
    <nav
      className={`bg-900 text-100 flex flex-col items-start gap-6 overflow-hidden py-6 transition-all duration-100 ${gridClasses} ${visibleClasses}`}
    >
      <img className="block lg:hidden" src={logo} alt="Company logo" />

      <h2 className="text-500 text-heading-s w-max uppercase">My Documents</h2>

      <button
        className="bg-orange hover:bg-orange-hover text-heading-m w-max cursor-pointer rounded-lg px-12 py-3"
        onClick={addNewDocument}
      >
        + New Document
      </button>

      <ul className="w-max">{fileListItems}</ul>

      <ThemeSwitch
        className="self-center"
        theme={theme}
        switchTheme={switchTheme}
      />
    </nav>
  );
}
