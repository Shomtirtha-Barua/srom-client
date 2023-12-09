import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import Carts from "../pages/Carts/Carts";
import CustomerMessages from "../pages/CustomerMessages/CustomerMessages";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import DashboardProfile from "../pages/Dashboard/DashboardProfile/DashboardProfile";
import Jobs from "../pages/Dashboard/Jobs/Jobs";
import Messages from "../pages/Dashboard/Messages/Messages";
import Orders from "../pages/Dashboard/Orders/Orders";
import RequestedJobs from "../pages/Dashboard/RequestedJobs/RequestedJobs";
import Service from "../pages/Dashboard/Service/Service";
import TotalExpense from "../pages/Dashboard/TotalExpense/TotalExpense";
import DisplayError from "../pages/DisplayError/DisplayError";
import Home from "../pages/Home/Home/Home";
import AllJobs from "../pages/Jobs/AllJobs/AllJobs";
import JobDetail from "../pages/Jobs/JobDetail/JobDetail";
import SendJobRequest from "../pages/Jobs/SendJobRequest/SendJobRequest";
import Login from "../pages/Login/Login/Login";
import ResetPassword from "../pages/Login/ResetPassword/ResetPassword";
import Register from "../pages/Login/Resigter/Register";
import MyOrders from "../pages/MyOrders/MyOrders";
import Profile from "../pages/Profile/Profile";
import PrivateRoute from "./PrivateRoute";

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
      {
        path: "/all-jobs",
        element: <AllJobs></AllJobs>,
      },
      {
        path: "/send-job-request",
        element: (
          <PrivateRoute>
            <SendJobRequest></SendJobRequest>
          </PrivateRoute>
        ),
      },
      {
        path: "/job/:id",
        element: <JobDetail></JobDetail>,
      },

      {
        path: "/carts",
        element: <Carts></Carts>,
      },
      {
        path: "/my-orders",
        element: <MyOrders></MyOrders>,
      },
    ],
  },

  {
    path: "/messages",
    element: <CustomerMessages></CustomerMessages>,
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
      {
        path: "/dashboard/requested-job",
        element: <RequestedJobs></RequestedJobs>,
      },
      {
        path: "/dashboard/orders",
        element: <Orders></Orders>,
      },
      {
        path: "/dashboard/total-expense",
        element: <TotalExpense></TotalExpense>,
      },
    ],
  },
]);

export default router;
