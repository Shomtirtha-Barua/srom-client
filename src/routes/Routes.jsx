import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import Service from "../pages/Dashboard/Service/Service";
import DisplayError from "../pages/DisplayError/DisplayError";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login/Login";
import ResetPassword from "../pages/Login/ResetPassword/ResetPassword";
import Register from "../pages/Login/Resigter/Register";
import Profile from "../pages/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import DashboardProfile from "../pages/Dashboard/DashboardProfile/DashboardProfile";
import Jobs from "../pages/Dashboard/Jobs/Jobs";
import Messages from "../pages/Dashboard/Messages/Messages";
import Message from "../pages/Home/Message/Message";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <DisplayError />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/reset-password",
        element: <ResetPassword></ResetPassword>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
    ],
  },
  {
    path: "/message",
    element: <Message></Message>,
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <DisplayError />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashboard/service",
        element: <Service></Service>,
      },
      {
        path: "/dashboard/jobs",
        element: <Jobs></Jobs>,
      },
      {
        path: "/dashboard/dashboardProfile",
        element: <DashboardProfile></DashboardProfile>,
      },
      {
        path: "/dashboard/messages",
        element: <Messages></Messages>,
      },
    ],
  },
]);

export default router;
