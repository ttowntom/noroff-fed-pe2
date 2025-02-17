import { useEffect, lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

import useUserStore from "./store/userStore";
import { queryClient } from "./utils/http";
import "./App.css";
import { loadLocal } from "./utils/localStorage";
import RootLayout from "./pages/RootLayout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NewEditVenueForm from "./pages/NewEditVenueForm";
import Error from "./pages/Error";
import LoadingPage from "./components/LoadingPage";

const Venues = lazy(() => import("./pages/Venues"));
const Profile = lazy(() => import("./pages/Profile"));
const VenueDetails = lazy(() => import("./pages/VenueDetails"));
const Bookings = lazy(() => import("./pages/Bookings"));
const VenueManager = lazy(() => import("./pages/VenueManager"));

function App() {
  const user = useUserStore((state) => state.user);
  const setTheme = useUserStore((state) => state.setTheme);

  useEffect(() => {
    const user = loadLocal("user");
    if (user?.preferredTheme) {
      setTheme(user.preferredTheme);
      if (user.preferredTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [setTheme]);

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <RootLayout />,
        children: [
          { index: true, element: <Venues /> },
          { path: "signup", element: <Signup /> },
          { path: "login", element: <Login /> },
          {
            path: "venues/new-edit",
            element: user ? <NewEditVenueForm /> : <Navigate to="/login" />,
          },
          {
            path: "venues/new-edit/:id",
            element: user ? <NewEditVenueForm /> : <Navigate to="/login" />,
          },
          { path: "venues", element: <Venues /> },
          { path: "venues/:id", element: <VenueDetails /> },
          {
            path: "profile/:name",
            element: user ? <Profile /> : <Navigate to="/login" />,
          },
          {
            path: "profile/:name/bookings",
            element: user ? <Bookings /> : <Navigate to="/login" />,
          },
          {
            path: "profile/:name/venue-manager",
            element: user ? <VenueManager /> : <Navigate to="/login" />,
          },
          { path: "*", element: <Error /> },
        ],
      },
    ],
    {
      basename: import.meta.env.BASE_URL,
    }
  );

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingPage />}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
