import saveImg from "../assets/icon-save.svg";

export default function SaveButton({ onSave }) {
  return (
    <button
      className={`bg-orange hover:bg-orange-hover flex cursor-pointer items-center gap-2 rounded-lg p-2 px-4`}
      onClick={onSave}
    >
      <img className="mx-auto h-6" src={saveImg} alt="Floppy disk icon" />
      <span className="text-heading-m hidden lg:block">Save Changes</span>
    </button>
  );
}
