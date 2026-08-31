import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Restaurant from "./pages/Restaurant";
import DishDetail from "./pages/DishDetail";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "browse", Component: Browse },
      { path: "restaurant/:id", Component: Restaurant },
      { path: "dish/:id", Component: DishDetail },
      { path: "cart", Component: Cart },
      { path: "profile", Component: Profile },
    ],
  },
]);
