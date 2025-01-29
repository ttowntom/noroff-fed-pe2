import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import useUserStore from "./store/userStore";
import { queryClient } from "./utils/http";
import "./App.css";
import RootLayout from "./pages/RootLayout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Venues from "./pages/Venues";
import Profile from "./pages/Profile";
import VenueDetails from "./pages/VenueDetails";
import Bookings from "./pages/Bookings";
import VenueManager from "./pages/VenueManager";

function App() {
  const user = useUserStore((state) => state.user);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Venues /> },
        { path: "signup", element: <Signup /> },
        { path: "login", element: <Login /> },
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
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
