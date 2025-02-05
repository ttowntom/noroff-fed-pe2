import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/**
 * Root layout component providing app shell with navigation and footer
 * @component
 * @returns {JSX.Element} App layout wrapper with navbar, content area and footer
 *
 * @example
 * function App() {
 *   return (
 *     <BrowserRouter>
 *       <Routes>
 *         <Route path="/" element={<RootLayout />}>
 *           <Route index element={<Home />} />
 *           <Route path="venues" element={<Venues />} />
 *         </Route>
 *       </Routes>
 *     </BrowserRouter>
 *   );
 * }
 */
export default function RootLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-light-bg-primary dark:bg-dark-bg-secondary">
      <Navbar />
      <main className="mx-auto flex w-full max-w-[1536px] flex-grow flex-col bg-light-bg-primary px-4 pb-24 pt-14 dark:bg-dark-bg-primary">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
