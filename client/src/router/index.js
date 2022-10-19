import { createHashRouter } from "react-router-dom";
import Login from "@/pages/login/index";
import Register from "@/pages/register/index";
import Main from "@/pages/main/index";
import Layout from "@/components/layout";
import UserCenterLayout from "@/components/userHeader/index";
import Detail from "@/pages/detail/index";
import PublicPost from "@/pages/publicPost/index";
import UserCenterIndex from "@/pages/userCenter/index";
import AllPosts from "@/pages/userCenter/allPosts/index";
const routers = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/detail/:id",
        name: "Detail",
        element: <Detail />,
      },
      {
        path: "/publicPage",
        name: "Public",
        element: <PublicPost />,
      },
      {
        path: "/userCenter",
        element: <UserCenterLayout />,
        children: [
          {
            path: "",
            element: <UserCenterIndex />,
          },
          {
            path: "allPosts",
            element: <AllPosts />,
          },
        ],
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    name: "Login",
    element: <Login />,
  },
]);
export default routers;
