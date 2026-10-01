import logo from "../assets/logo.svg";
import fileIcon from "../assets/icon-document.svg";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { useState } from "react";
import { useFiles } from "@/contexts/FilesContext";

export default function Menu({
  onDocumentChange,
  onDocumentSave,
  docHasUnsavedChanges,
}) {
  const { fileMetaData, createFile } = useFiles();
  const [pendingFileChange, setPendingFileChange] = useState(null);

  return (
    <nav className={`text-100 grid content-start gap-6 py-6`}>
      <img className="block lg:hidden" src={logo} alt="Company logo" />

      <h2 className="text-500 text-heading-s w-max uppercase">My Documents</h2>

      <button
        className="bg-orange hover:bg-orange-hover text-heading-m cursor-pointer rounded-lg py-3"
        onClick={createFile}
      >
        + New Document
      </button>

      <ul className="grid w-max gap-2">
        {fileMetaData.map((mdObj) => (
          <li key={mdObj.id}>
            <button
              className="group grid cursor-pointer grid-cols-[auto_1fr] grid-rows-2 items-center justify-items-start gap-x-4"
              onClick={() => {
                if (docHasUnsavedChanges.current)
                  setPendingFileChange(mdObj.id);
                else onDocumentChange(mdObj.id);
              }}
            >
              <img className="row-span-2" src={fileIcon} />
              <span className="text-500 text-body">{mdObj.createdAt}</span>
              <span className="text-heading-m group-hover:text-orange max-w-[10rem] overflow-hidden overflow-ellipsis whitespace-nowrap">
                {mdObj.name}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog
        open={pendingFileChange !== null}
        onOpenChange={(open) => !open && setPendingFileChange(null)}
      >
        <DialogContent className="font-roboto-slab">
          <DialogTitle className="mb-4">
            Document has unsaved changes.
          </DialogTitle>

          <DialogDescription className="text-preview-p mb-4">
            You have unsaved changes in the current document. If you do not save
            you will lose your changes!
          </DialogDescription>

          <ol>
            <li>
              <button
                className="bg-orange font-roboto-reg text-100 hover:bg-orange-hover mb-2 w-full cursor-pointer rounded-md py-2"
                onClick={() => {
                  onDocumentChange(pendingFileChange);
                  onDocumentSave();
                  setPendingFileChange(null);
                }}
              >
                Save & Continue
              </button>
            </li>
            <li>
              <button
                className="bg-orange font-roboto-reg text-100 hover:bg-orange-hover mb-2 w-full cursor-pointer rounded-md py-2"
                onClick={() => {
                  onDocumentChange(pendingFileChange);
                  setPendingFileChange(null);
                }}
              >
                Continue and Lose Changes
              </button>
            </li>
          </ol>
        </DialogContent>
      </Dialog>
    </nav>
  );
}
