import { createBrowserRouter } from "react-router";
import { WatchTogether } from "./pages/WatchTogether";
import { Dashboard } from "./pages/Dashboard";
import { Membership } from "./pages/Membership";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, Component: Dashboard },
      { path: "watch", Component: WatchTogether },
      { path: "membership", Component: Membership },
      { path: "*", Component: Dashboard }, // Catch-all routes like /discover to dashboard
    ],
  },
]);