import { AiFillProduct } from "react-icons/ai";
import ThemeToggler from "../ThemeToggler";

export default function AppHeader() {
  return (
    <div className="flex items-center justify-between px-2 py-4">
      <Logo />
      <ThemeToggler />
    </div>
  );
}

function Logo() {
  return (
    <div className={`flex items-center gap-2 transition-all`}>
      <div
        className={`flex aspect-square size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground`}
      >
        <AiFillProduct className="text-xl" />
      </div>

      <div className="flex items-center gap-1 text-left text-sm leading-tight">
        <span className="truncate text-[24px] font-semibold">Stockly</span>
      </div>
    </div>
  );
}
