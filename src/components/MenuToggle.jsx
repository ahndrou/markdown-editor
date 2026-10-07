import burgerMenuImg from "../assets/icon-menu.svg";
import closeMenuImg from "../assets/icon-close.svg";

export default function MenuToggle({ menuOpen, onMenuOpenChange }) {
  return (
    <button
      className="bg-700 hover:bg-orange h-full flex-[0_0_4rem] cursor-pointer"
      onClick={onMenuOpenChange}
    >
      <img className="mx-auto" src={menuOpen ? closeMenuImg : burgerMenuImg} />
    </button>
  );
}
