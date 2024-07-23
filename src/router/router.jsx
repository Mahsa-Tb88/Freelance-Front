import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import AddProduct from "../pages/AddProduct";
import Blogs from "../pages/Blogs";
import ContactUs from "../pages/ContactUs";
import AboutUs from "../pages/AboutUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "login", element: <Login /> },
      { path: "signUp", element: <SignUp /> },
      { path: "addProduct", element: <AddProduct /> },
      { path: "blogs", element: <Blogs /> },
      { path: "contactUs", element: <ContactUs /> },
      { path: "aboutUs", element: <AboutUs /> },
    ],
  },
]);

export default router;
