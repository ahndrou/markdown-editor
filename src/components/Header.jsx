import documentImg from "../assets/icon-document.svg";
import burgerMenuImg from "../assets/icon-menu.svg";
import closeMenuImg from "../assets/icon-close.svg";
import logo from "../assets/logo.svg";
import saveImg from "../assets/icon-save.svg";
import { toast } from "sonner";

import { updateCurrentFileContent } from "../utils/localStorageUtils.js";

import DeleteButton from "./DeleteButton";

export default function Header({
  setMenuOpen,
  deleteCurrentFile,
  renameCurrentMarkdown,
  currentFileName,
  menuOpen,
  markdown,
  gridPosition,
}) {
  const gridClasses = `col-start-${gridPosition.col} row-start-${gridPosition.row}`;

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
        className={`me-4 hidden border-600 py-3 pe-4 lg:block ${currentFileName !== null ? "border-e-2" : ""}`}
        alt="Product logo"
        src={logo}
      />

      {currentFileName !== null && (
        <>
          <div className="me-auto grid grid-cols-[auto_1fr] items-center lg:basis-[20rem]">
            <img
              className="row-span-2 me-4 h-5"
              src={documentImg}
              alt="Document icon"
              aria-hidden
            />
            <label
              className="text-body text-500 hidden lg:block"
              htmlFor="docName"
            >
              Document Name
            </label>
            <input
              id="docName"
              type="text"
              className="text-heading-m caret-orange min-w-0 border-b-1 border-transparent overflow-ellipsis focus:border-100 focus:outline-0"
              defaultValue={currentFileName}
              key={currentFileName} // Ensures the input updates when the markdown file changes.
              onBlur={(e) => {
                if (!renameCurrentMarkdown(e.target.value)) {
                  e.target.value = currentFileName;
                }
              }}
            />
          </div>

          <DeleteButton
            deleteCurrentFile={deleteCurrentFile}
            currentFileName={currentFileName}
          />

          <button
            className={`bg-orange hover:bg-orange-hover me-3 flex cursor-pointer items-center gap-2 rounded-lg p-2 px-4`}
            onClick={() => {
              updateCurrentFileContent(currentFileName, markdown);
              toast(`${fileName} saved successfully.`);
            }}
          >
            <span className="text-heading-m order-2 hidden lg:block">
              Save Changes
            </span>
            <img className="mx-auto h-6" src={saveImg} alt="Floppy disk icon" />
          </button>
        </>
      )}
    </header>
  );
}
