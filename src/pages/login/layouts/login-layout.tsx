import { Footer } from "@/components/footer";

interface LoginLayoutProps {
  children: React.ReactNode;
}

export const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <div className="relative flex h-screen flex-col justify-center align-middle">
      {/* <Navbar /> */}
      <main className="max-w-8xl container mx-auto">{children}</main>
      <Footer />
    </div>
  );
};
