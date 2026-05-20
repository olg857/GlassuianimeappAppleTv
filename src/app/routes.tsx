import { createBrowserRouter } from "react-router";
import { WatchTogether } from "./pages/WatchTogether";
import { Dashboard } from "./pages/Dashboard";
import { Membership } from "./pages/Membership";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, Component: Dashboard },
      {
        path: "watch",
        element: (
          <ProtectedRoute>
            <WatchTogether />
          </ProtectedRoute>
        ),
      },
      { path: "membership", Component: Membership },
      { path: "*", Component: Dashboard },
    ],
  },
]);
