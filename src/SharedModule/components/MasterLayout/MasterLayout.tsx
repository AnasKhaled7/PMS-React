import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";

export default function MasterLayout() {
  return (
    <>
      <Navbar />

      <div className="d-flex gap-2">
        <div>
          <SideBar />
        </div>

        <div className="w-100">
          <Outlet />
        </div>
      </div>
    </>
  );
}
