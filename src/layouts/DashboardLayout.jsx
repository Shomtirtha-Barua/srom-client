import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
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
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
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
          {/* Sidebar content here */}
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          {admin && (
            <>
              <li>
                <Link to="service">Services</Link>
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
