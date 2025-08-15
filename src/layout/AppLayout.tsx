import { SidebarProvider } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";

const LayoutContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <div className="flex-1">
        <div className="p-3 mx-auto max-w-(--breakpoint-3xl) md:p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
