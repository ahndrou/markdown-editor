import documentImg from "../assets/icon-document.svg";
import burgerMenuImg from "../assets/icon-menu.svg";
import closeMenuImg from "../assets/icon-close.svg";
import logo from "../assets/logo.svg";
import saveImg from "../assets/icon-save.svg";
import { toast } from "sonner";

import DeleteButton from "./DeleteButton";
import { useFiles } from "@/contexts/FilesContext";

export default function Header({
  menuOpen,
  documentID,
  onMenuOpenChange,
  onDocumentSave,
  setDocumentID,
}) {
  const { fileMetaData, fileExists, renameFile, deleteFile } = useFiles();

  const documentName =
    fileMetaData.find((file) => file.id === documentID)?.name ?? null;

  function renameCurrentDocument(newName) {
    if (newName === documentName) return false;

    if (newName === "") {
      toast("Given file name cannot be empty.");
    }

    if (fileExists(newName)) {
      toast(`${newName} already exists.`);
      return false;
    }

    renameFile(documentID, newName);
    toast(`${documentName} renamed to ${newName}.`);
    return true;
  }

  function deleteCurrentDocument() {
    setDocumentID(deleteFile(documentID));
    toast(`${documentName} deleted.`);
  }

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
                if (!renameCurrentDocument(e.target.value)) {
                  e.target.value = documentName;
                }
              }}
            />
          </div>

          <DeleteButton
            deleteCurrentFile={deleteCurrentDocument}
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
