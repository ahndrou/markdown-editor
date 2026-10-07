import documentImg from "../assets/icon-document.svg";

export default function DocumentRenamer({ documentName, onRename }) {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center">
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
        defaultValue={documentName}
        key={documentName} // Ensures the input updates when the markdown file changes.
        onBlur={(e) => {
          if (!onRename(e.target.value)) {
            e.target.value = documentName;
          }
        }}
      />
    </div>
  );
}
