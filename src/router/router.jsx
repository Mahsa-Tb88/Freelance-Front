import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Blogs from "../pages/Blogs";
import ContactUs from "../pages/ContactUs";
import AboutUs from "../pages/AboutUs";
import Orders from "../pages/Orders";
import MessageList from "../pages/MessageList";
import Chat from "../pages/Chat";
import MyProducts from "../pages/MyProducts";
import FormProduct from "../pages/FormProduct";

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
      { path: "addProduct", element: <FormProduct /> },
      { path: "editProduct", element: <FormProduct /> },
      { path: "blogs", element: <Blogs /> },
      { path: "contactUs", element: <ContactUs /> },
      { path: "aboutUs", element: <AboutUs /> },
      { path: "orders", element: <Orders /> },
      { path: "messages", element: <MessageList /> },
      { path: "chat", element: <Chat /> },
      { path: "myProducts/:id", element: <MyProducts /> },
    ],
  },
]);

export default router;
