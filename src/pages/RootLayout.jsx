import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      <main className="mx-auto flex w-full max-w-[1536px] flex-grow flex-col bg-light-bg-primary px-4 pb-24 pt-12 dark:bg-dark-bg-primary">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
