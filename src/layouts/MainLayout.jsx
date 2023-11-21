import { Outlet } from "react-router-dom";
import Footer from "../components/Ui/Footer/Footer";
import Navbar from "../components/Ui/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet />
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
