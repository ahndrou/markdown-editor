import logo from "../assets/logo.svg";
import fileIcon from "../assets/icon-document.svg";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { useState } from "react";
import { useDocumentSet } from "@/contexts/DocumentSetProvider";
import { DocumentIcon } from "./SVGComponents";

export default function Menu({ onDocumentChange }) {
  const { docSetMetaData, createDocument } = useDocumentSet();
  const [pendingFileChange, setPendingFileChange] = useState(null);

  return (
    <nav className={`text-100 grid content-start gap-6 py-6`}>
      <img className="block lg:hidden" src={logo} alt="Company logo" />

      <h2 className="text-500 text-heading-s w-max uppercase">My Documents</h2>

      <button
        className="bg-orange hover:bg-orange-hover text-heading-m cursor-pointer rounded-lg py-3"
        onClick={createDocument}
      >
        + New Document
      </button>

      <ul className="grid gap-3">
        {docSetMetaData.map((mdObj) => (
          <li key={mdObj.id}>
            <button
              className="group flex w-full cursor-pointer items-baseline-last gap-3"
              onClick={() => {
                const result = onDocumentChange(mdObj.id);
                if (result.reason === "unsaved") setPendingFileChange(mdObj.id);
              }}
            >
              <DocumentIcon className="group-hover:fill-orange h-[18px]" />
              <div className="grid justify-items-start">
                <span className="text-500 text-body">{mdObj.createdAt}</span>
                <span className="text-heading-m group-hover:text-orange max-w-[10rem] overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {mdObj.name}
                </span>
              </div>
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
                  onDocumentChange(pendingFileChange, { unsavedEdits: "save" });
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
                  onDocumentChange(pendingFileChange, {
                    unsavedEdits: "discard",
                  });
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
