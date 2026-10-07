import logo from "../assets/logo.svg";

import DeleteButton from "./DeleteButton";
import SaveButton from "./SaveButton";
import DocumentRenamer from "./DocumentRenamer";
import MenuToggle from "./MenuToggle";

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
      <div className="mx-6">
        <MenuToggle menuOpen={menuOpen} onMenuOpenChange={onMenuOpenChange} />
      </div>

      <img
        className={`me-6 hidden border-600 py-3 pe-4 lg:block ${documentName !== null ? "border-e-2" : ""}`}
        alt="Product logo"
        src={logo}
      />

      {documentName !== null && (
        <>
          <div className="me-auto">
            <DocumentRenamer documentName={documentName} onRename={onRename} />
          </div>

          <DeleteButton
            deleteCurrentFile={onDelete}
            currentFileName={documentName}
          />

          <SaveButton documentName={documentName} onSave={onDocumentSave} />
        </>
      )}
    </header>
  );
}
