import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";

export default function MasterLayout() {
  return (
    <main className="min-vh-100 d-flex flex-column">
      <Navbar />

      <div className="d-flex gap-2 flex-grow-1">
        <SideBar />

        <div className="w-100">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
