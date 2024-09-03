interface LoginFormWrapperProps {
  children: React.ReactNode;
}

export const LoginFormWrapper = ({ children }: LoginFormWrapperProps) => {
  return (
    <div className="w-96 p-6 flex flex-col relative justify-center rounded-r-2xl bg-white dark:bg-zinc-900">
      <h1 className="text-lg py-6 font-bold absolute top-0">MyEmployee</h1>
      <div className="flex flex-col gap-8">
        <h2 className="text-xl font-semibold">Nice to see you again</h2>
        {children}
      </div>
    </div>
  );
};
