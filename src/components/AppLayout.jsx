import { Outlet } from "react-router-dom";
import TopBar from "./LayoutComponent/TopBar";

function AppLayout() {
  return (
    <div
      className="bg-[radial-gradient(circle,#1F1F1F_20%,#000000_100%)]
      min-h-screen flex flex-col items-center justify-start "
    >
      <TopBar />
      <Outlet />
    </div>
  );
}

export default AppLayout;
