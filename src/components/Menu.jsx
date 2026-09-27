import logo from "../assets/logo.svg";
import ThemeSwitch from "./ui/ThemeSwitch";
import fileIcon from "../assets/icon-document.svg";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { useState } from "react";

export default function Menu({
  visible,
  theme,
  switchTheme,
  setCurrentFileIndex,
  fileMetaData,
  gridPosition,
  addNewDocument,
  saveCurrentMarkdown,
  contentModified,
}) {
  const [pendingFileChange, setPendingFileChange] = useState(null);

  // Uses these rather than display: none so a transition is seen.
  const visibleClasses = visible ? "w-65 px-6" : "w-0 px-0";
  const gridClasses = `col-start-${gridPosition.col} row-start-${gridPosition.row} row-span-2`;

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

      <ul className="w-max">
        {fileMetaData.map((mdObj) => (
          <li>
            <button
              className="group grid cursor-pointer grid-cols-[auto_1fr] grid-rows-2 items-center justify-items-start gap-x-4"
              onClick={() => {
                if (contentModified.current) setPendingFileChange(mdObj.name);
                else setCurrentFileIndex(mdObj.name);
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

      <ThemeSwitch
        className="self-center"
        theme={theme}
        switchTheme={switchTheme}
      />

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
                  saveCurrentMarkdown();
                  setCurrentFileIndex(pendingFileChange);
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
                  setCurrentFileIndex(pendingFileChange);
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
