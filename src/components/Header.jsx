import documentImg from "../assets/icon-document.svg";
import burgerMenuImg from "../assets/icon-menu.svg";
import closeMenuImg from "../assets/icon-close.svg";
import logo from "../assets/logo.svg";
import saveImg from "../assets/icon-save.svg";
import { toast } from "sonner";

import DeleteButton from "./DeleteButton";

export default function Header({
  menuOpen,
  documentName,
  onMenuOpenChange,
  onDocumentSave,
  onRename,
  onDelete,
}) {
  return (
    <header className="bg-800 text-100 flex h-[4rem] items-center">
      <button
        className="bg-700 hover:bg-orange me-6 h-full flex-[0_0_4rem] cursor-pointer"
        onClick={onMenuOpenChange}
      >
        <img
          className="mx-auto"
          src={menuOpen ? closeMenuImg : burgerMenuImg}
        />
      </button>

      <img
        className={`me-4 hidden border-600 py-3 pe-4 lg:block ${documentName !== null ? "border-e-2" : ""}`}
        alt="Product logo"
        src={logo}
      />

      {documentName !== null && (
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
              defaultValue={documentName}
              key={documentName} // Ensures the input updates when the markdown file changes.
              onBlur={(e) => {
                if (!onRename(e.target.value)) {
                  e.target.value = documentName;
                }
              }}
            />
          </div>

          <DeleteButton
            deleteCurrentFile={onDelete}
            currentFileName={documentName}
          />

          <button
            className={`bg-orange hover:bg-orange-hover me-3 flex cursor-pointer items-center gap-2 rounded-lg p-2 px-4`}
            onClick={() => {
              onDocumentSave();
              toast(`${documentName} saved successfully.`);
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
