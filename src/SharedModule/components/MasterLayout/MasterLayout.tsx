import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";

export default function MasterLayout() {
  return (
    <main className="min-vh-100 d-flex flex-column">
      <Navbar />

      <div className="d-flex flex-grow-1 bg-body-secondary">
        <SideBar />

        <div className="w-100">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
