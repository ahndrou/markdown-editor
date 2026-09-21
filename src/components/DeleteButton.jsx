import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { TrashCanIcon } from "./SVGComponents.jsx";
import { deleteFileFromStorage } from "@/utils/localStorageUtils";
import { toast } from "sonner";

export default function DeleteButton({
  currentFileIndex,
  currentFileName,
  setCurrentFileIndex,
}) {
  function deleteCurrentFile() {
    if (currentFileIndex >= 0) {
      deleteFileFromStorage(currentFileIndex);
      setCurrentFileIndex((oldIndex) => (oldIndex === 0 ? 0 : oldIndex - 1));
      toast(`${currentFileName} deleted.`);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="me-3 min-w-0 cursor-pointer">
          <TrashCanIcon className="hover:fill-orange min-w-0" />
        </button>
      </DialogTrigger>

      <DialogContent className="font-roboto-slab">
        <DialogTitle className="text-preview-h4 font-roboto-slab mb-4">
          Delete this document?
        </DialogTitle>
        <DialogDescription className="text-preview-p text-500 mb-4">
          Are you sure you want to delete the '{currentFileName}' document and
          its contents? This action cannot be reversed.
        </DialogDescription>
        <DialogClose>
          <button
            className="bg-orange font-roboto-reg text-100 hover:bg-orange-hover w-full cursor-pointer rounded-md py-2"
            onClick={deleteCurrentFile}
          >
            Confirm & Delete
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
