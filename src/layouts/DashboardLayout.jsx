import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaHouse } from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";
import { auth } from "../config/firebase.init";
import useAdmin from "../hooks/useAdmin";
import useWorker from "../hooks/useWorker";

const DashboardLayout = () => {
  const [user] = useAuthState(auth); // get user info from useAuthState
  const [admin] = useAdmin(user);
  const [worker] = useWorker(user);

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content p-8">
        <label
          htmlFor="dashboard-drawer"
          className="btn btn-primary drawer-button lg:hidden print:hidden"
        >
          =
        </label>
        {/* Page content here */}
        <Outlet />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-60 min-h-full bg-sky-100 text-base-content space-y-1 text-base font-medium">
          <Link to="/" className="text-2xl ml-4 text-sky-600 w-8 h-8 p-1">
            <FaHouse />
          </Link>
          {/* Sidebar content here */}
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          {admin && (
            <>
              <li>
                <Link to="service">Services</Link>
              </li>
              <li>
                <Link to="requested-job">Requested Job</Link>
              </li>
              <li>
                <Link to="orders">Orders</Link>
              </li>
              <li>
                <Link to="total-expense">Total Expanses</Link>
              </li>
            </>
          )}
          {worker && (
            <>
              {/* <li>
                <Link to="dashboardProfile">Profile</Link>
              </li> */}
              <li>
                <Link to="jobs">Jobs</Link>
              </li>
              <li>
                <Link to="messages">Message</Link>
              </li>
              <li>
                <Link to="orders">Orders</Link>
              </li>
            </>
          )}
          {/* logout button in dashboard */}
          <button
            onClick={() => signOut(auth)}
            className="btn bg-amber-400 hover:bg-amber-500 absolute bottom-4 left-0 right-0 m-4"
          >
            Logout
          </button>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
