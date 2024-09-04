import { ThemeSwitch } from "../theme-switch";

export const Header = () => {
  return (
    <header className="flex w-full flex-row justify-between py-2">
      <h1 className="text-lg font-bold">| MyEmployee |</h1>
      <ThemeSwitch />
    </header>
  );
};
