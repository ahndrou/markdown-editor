import documentImg from "../assets/icon-document.svg";
import burgerMenuImg from "../assets/icon-menu.svg";
import closeMenuImg from "../assets/icon-close.svg";
import logo from "../assets/logo.svg";
import saveImg from "../assets/icon-save.svg";
import { toast } from "sonner";

import {
  getMarkdownFile,
  updateCurrentFileContent,
  updateCurrentFileName,
} from "../utils/localStorageUtils.js";

import DeleteButton from "./DeleteButton";

export default function Header({
  setMenuOpen,
  setCurrentFileIndex,
  setMarkdown,
  currentFileIndex,
  menuOpen,
  markdown,
  gridPosition,
}) {
  // Haven't used state because it can be derived from index.
  // Does mean we have to remember to update it manually from doc. name onBlur though.
  // The text input isn't a controlled component. Thus it visibly changes without React's state management.
  // We need the most recent file name to display in the toast.
  //TODO Maybe just make this into state and make the text input controlled?
  let fileName = getMarkdownFile(currentFileIndex).name;

  const gridClasses = `col-start-${gridPosition.col} row-start-${gridPosition.row}`;

  function handleRename(e) {
    if (fileName !== e.target.value) {
      updateCurrentFileName(currentFileIndex, e.target.value);
      toast(`${fileName} renamed to ${e.target.value}.`);
      fileName = e.target.value;
    }
  }

  return (
    <header
      className={`${gridClasses} bg-800 text-100 flex h-[4rem] items-center`}
    >
      <button
        className="bg-700 hover:bg-orange me-6 h-full flex-[0_0_4rem] cursor-pointer"
        onClick={() => setMenuOpen((currentValue) => !currentValue)}
      >
        <img
          className="mx-auto"
          src={menuOpen ? closeMenuImg : burgerMenuImg}
        />
      </button>

      <img
        className="me-4 hidden border-600 border-e-2 py-3 pe-4 lg:block"
        alt="Product logo"
        src={logo}
      />

      <div className="me-auto grid grid-cols-[auto_1fr] items-center lg:basis-[20rem]">
        <img
          className="row-span-2 me-4 h-5"
          src={documentImg}
          alt="Document icon"
          aria-hidden
        />
        <label className="text-body text-500 hidden lg:block" htmlFor="docName">
          Document Name
        </label>
        <input
          id="docName"
          type="text"
          className="text-heading-m caret-orange min-w-0 border-b-1 border-transparent overflow-ellipsis focus:border-100 focus:outline-0"
          defaultValue={fileName}
          key={fileName} // Ensures the input updates when the markdown file changes.
          onBlur={handleRename}
        />
      </div>

      <DeleteButton
        setCurrentFileIndex={setCurrentFileIndex}
        setMarkdown={setMarkdown}
        currentFileIndex={currentFileIndex}
        currentFileName={fileName}
      />

      <button
        className={`bg-orange hover:bg-orange-hover me-3 flex cursor-pointer items-center gap-2 rounded-lg p-2 px-4`}
        onClick={() => {
          updateCurrentFileContent(currentFileIndex, markdown);
          toast(`${fileName} saved successfully.`);
        }}
      >
        <span className="text-heading-m order-2 hidden lg:block">
          Save Changes
        </span>
        <img className="mx-auto h-6" src={saveImg} alt="Floppy disk icon" />
      </button>
    </header>
  );
}
