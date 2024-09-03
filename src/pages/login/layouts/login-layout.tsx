import { Navbar } from "@/components/navbar";

interface LoginLayoutProps {
  children: React.ReactNode;
}

export const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <div className="relative flex flex-col h-screen align-middle justify-center">
      <Navbar />
      <main className="container mx-auto max-w-8xl">{children}</main>
      <footer className="w-full flex items-center justify-center py-3 absolute bottom-0">
        <div className="flex items-center gap-1 text-current">
          <span className="text-default-600">Developed by</span>
          <p className="text-primary">Jean Arruda</p>
        </div>
      </footer>
    </div>
  );
};
