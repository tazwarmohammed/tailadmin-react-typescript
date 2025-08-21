import { SidebarProvider } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import { LayoutProvider, useLayout } from "../context/LayoutContext";
import UserDropdown from "../components/header/UserDropdown";
import { HamburgerIcon } from "../icons";

const LayoutContent: React.FC = () => {
  const { orientation, toggleOrientation } = useLayout();

  return (
    <div className={`min-h-screen flex ${orientation === 'vertical' ? 'flex-row' : 'flex-col'}`}>
      {orientation === 'vertical' ? (
        <>
          <AppSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header for vertical layout - matches horizontal header styling */}
            <header className="sticky top-0 z-99999 flex w-full bg-white border-b border-gray-200">
              <div className="flex items-center justify-end w-full gap-2 px-2.5 py-2 sm:gap-2.5 lg:px-3" style={{ height: '42.5px' }}>
                <div className="flex items-center gap-1.5">
                  {/* Layout Toggle Button */}
                  <button
                    onClick={toggleOrientation}
                    className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    title="Switch to horizontal layout"
                  >
                    <HamburgerIcon className="w-4 h-4" />
                  </button>
                  <UserDropdown />
                </div>
              </div>
            </header>
            <div className="flex-1 overflow-auto">
              <div className="p-3 mx-auto max-w-(--breakpoint-3xl) md:p-4">
                <Outlet />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <AppHeader />
          <div className="flex-1">
            <div className="p-3 mx-auto max-w-(--breakpoint-3xl) md:p-4">
              <Outlet />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <LayoutProvider>
      <SidebarProvider>
        <LayoutContent />
      </SidebarProvider>
    </LayoutProvider>
  );
};

export default AppLayout;