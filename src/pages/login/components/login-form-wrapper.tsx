import { Header } from "@/components/header";

interface LoginFormWrapperProps {
  children: React.ReactNode;
}

export const LoginFormWrapper = ({ children }: LoginFormWrapperProps) => {
  return (
    <div className="relative flex flex-col gap-2 rounded-r-2xl bg-white p-6 dark:bg-zinc-900 lg:w-96">
      <Header />
      <div className="flex h-full flex-col justify-center gap-6 lg:gap-8">
        <h2 className="text-base font-semibold lg:text-xl">
          Nice to see you again
        </h2>
        {children}
      </div>
    </div>
  );
};
