import logo from "../assets/logo.svg";

export default function Header({ start, title, actions }) {
  return (
    <header className="bg-800 text-100 flex h-[4rem] items-center">
      <div className="mx-6">{start}</div>

      <img
        className={`me-6 hidden border-600 py-3 pe-4 lg:block ${title ? "border-e-2" : ""}`}
        alt="Product logo"
        src={logo}
      />

      {title && <div className="me-auto">{title}</div>}
      {actions}
    </header>
  );
}
