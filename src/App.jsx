import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./utils/http";
import "./App.css";
import RootLayout from "./pages/RootLayout";
import Signup from "./pages/Signup";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [{ index: true, element: <Signup /> }],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        future={{
          v7_startTransition: true,
        }}
        router={router}
      />
    </QueryClientProvider>
  );
}

export default App;
