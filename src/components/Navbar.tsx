import { HandCoins } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <div className="flex items-center gap-2 border-b py-2 px-4 text-lg font-bold sticky top-0 bg-background z-10">
      <HandCoins />
      Expense Tracker
      <ModeToggle classname="ml-auto" />
    </div>
  );
}
