import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
     createBrowserRouter,
     Link,
     Outlet,
     RouterProvider,
} from "react-router-dom";
import UsersPage from "./screens/users.page.tsx";
import { HomeOutlined, UserSwitchOutlined, UploadOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import TrackPage from "./screens/tracks.page.tsx";

const items: MenuProps["items"] = [
     {
          label: <Link to={"/"}>Home</Link>,
          key: "Home",
          icon: <HomeOutlined />,
     },
     {
          label: <Link to={"/users"}>Manage Users</Link>,
          key: "users",
          icon: <UserSwitchOutlined />,
     },
     {
          label: <Link to={"/tracks"}>Manage Tracks</Link>,
          key: "tracks",
          icon: <UploadOutlined />,
     },
];

const Header: React.FC = () => {
     const [current, setCurrent] = useState("Home");

     const onClick: MenuProps["onClick"] = (e) => {
          setCurrent(e.key);
     };

     return (
          <div className="container">
               <Menu
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                    items={items}
               />
          </div>
     );
};

const LayoutAdmin = () => {

     const getData = async () => {
          const res = await fetch("http://localhost:8000/api/v1/auth/login", {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify({
                    username: "admin@gmail.com",
                    password: "123456",
               }),
          });
          const data = await res.json();
          if (data.data) {
               localStorage.setItem("access_token", data.data.access_token);
          }
     };


     useEffect(() => {
          getData();
     }, []);

     return (
          <div>
               <Header />
               <Outlet />
          </div>
     );
};

const router = createBrowserRouter([
     {
          path: "/",
          element: <LayoutAdmin />,
          children: [
               { index: true, element: <App /> },
               {
                    path: "users",
                    element: <UsersPage />,
               },
               {
                    path: "/tracks",
                    element: <TrackPage />,
               },
          ],
     },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
     <React.StrictMode>
          <RouterProvider router={router} />
     </React.StrictMode>
);
