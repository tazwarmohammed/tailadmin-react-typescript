import { useEffect, useRef } from "react";

import { Link, useLocation } from "react-router";
import UserDropdown from "../components/header/UserDropdown";
import { mainNavItems, otherNavItems } from "./nav";
import { ChevronDownIcon, SidebarIcon, HamburgerIcon } from "../icons";
import { useLayout } from "../context/LayoutContext";

const AppHeader: React.FC = () => {
  const location = useLocation();
  const { orientation, toggleOrientation } = useLayout();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.blur();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const isActive = (path?: string) => (path ? location.pathname === path : false);

  return (
    <header className="sticky top-0 z-99999 flex w-full bg-white border-b border-gray-200">
      <div className="flex items-center w-full gap-2 px-2.5 py-2 sm:gap-2.5 lg:px-3">
        <div className="flex items-center gap-1.5 shrink-0">
          <Link to="/ecommerce" className="inline-flex items-center">
            {/* <img src="/images/logo/logo.svg" alt="Logo" height={24} style={{ marginRight: '1rem' }} /> */}
            <img src="/images/logo/brac-bank-text-logo.svg" alt="Logo" height={14.58} width={174} style={{ marginRight: '1rem' }} />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-2.5 text-theme-xs flex-1">
          {[...mainNavItems, ...otherNavItems].map((item) => {
            const parentActive = item.path
              ? isActive(item.path)
              : item.subItems?.some((sub) => isActive(sub.path));

            return (
              <div key={item.name} className="relative">
                {item.path ? (
                  <Link
                    to={item.path}
                    className={`px-2 py-1.5 rounded-md transition ${
                      isActive(item.path)
                        ? "bg-brand-50 text-brand-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.name}
                  </Link>
                ) : item.subItems ? (
                  <div className="relative group">
                    <button
                      type="button"
                      className={`inline-flex items-center gap-1 px-2 py-1.5 rounded-md transition ${
                        parentActive
                          ? "bg-brand-50 text-brand-600"
                          : "text-gray-700 group-hover:bg-gray-100"
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDownIcon
                        className={`w-3.5 h-3.5 transition-transform group-hover:rotate-180 ${
                          parentActive
                            ? "text-brand-600"
                            : "text-gray-500"
                        }`}
                      />
                    </button>
                    <div className="absolute left-0 top-full z-40 hidden group-hover:block">
                      <div className="mt-1 min-w-[180px] rounded-lg border border-gray-200 bg-white p-1 shadow-theme-lg">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            className={`block rounded-md px-2 py-1.5 text-theme-xs transition ${
                              isActive(sub.path)
                                ? "bg-brand-50 text-brand-600"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 ml-auto">
          {/* Layout Toggle Button */}
          <button
            onClick={toggleOrientation}
            className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            title={`Switch to ${orientation === 'horizontal' ? 'vertical' : 'horizontal'} layout`}
          >
            {orientation === 'horizontal' ? (
              // Show sidebar icon when horizontal (suggests switching to vertical/sidebar layout)
              <SidebarIcon className="w-4 h-4" />
            ) : (
              // Show hamburger icon when vertical (suggests switching to horizontal/hamburger layout)
              <HamburgerIcon className="w-4 h-4" />
            )}
          </button>
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
