import { Link, useLocation } from "react-router";
import { mainNavItems, otherNavItems } from "./nav";
import { ChevronDownIcon } from "../icons";
import { useState } from "react";

const AppSidebar: React.FC = () => {
  const location = useLocation();
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});

  const isActive = (path?: string) => (path ? location.pathname === path : false);

  const toggleSubmenu = (itemName: string) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  return (
    <aside className="sticky top-0 h-screen w-56 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      {/* Logo Section - matches header height and padding exactly */}
      <div className="flex items-center gap-1.5 px-2.5 py-2 shrink-0 sm:gap-2.5 lg:px-3">
        <Link to="/ecommerce" className="inline-flex items-center">
          <img src="/images/logo/logo.svg" alt="Logo" height={24} />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto custom-scrollbar">
        <div className="space-y-1">
          {[...mainNavItems, ...otherNavItems].map((item) => {
            const parentActive = item.path
              ? isActive(item.path)
              : item.subItems?.some((sub) => isActive(sub.path));

            return (
              <div key={item.name}>
                {item.path ? (
                  <Link
                    to={item.path}
                    className={`flex items-center w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                      isActive(item.path)
                        ? "bg-brand-50 text-brand-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.name}
                  </Link>
                ) : item.subItems ? (
                  <div>
                    <button
                      type="button"
                      onClick={() => toggleSubmenu(item.name)}
                      className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                        parentActive
                          ? "bg-brand-50 text-brand-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDownIcon
                        className={`w-4 h-4 transition-transform ${
                          openSubmenus[item.name] ? "rotate-180" : ""
                        } ${
                          parentActive
                            ? "text-brand-600"
                            : "text-gray-500"
                        }`}
                      />
                    </button>
                    {openSubmenus[item.name] && (
                      <div className="mt-1 relative">
                        {/* Visual connection line */}
                        <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-200"></div>
                        <div className="ml-3 pl-3 space-y-1 relative">
                          {item.subItems.map((sub) => (
                            <div key={sub.name} className="relative">
                              {/* Horizontal connection line */}
                              <div className="absolute left-0 top-1/2 w-3 h-px bg-gray-200 -translate-y-1/2"></div>
                              <Link
                                to={sub.path}
                                className={`block px-3 py-2 text-sm rounded-lg transition-colors ml-3 ${
                                  isActive(sub.path)
                                    ? "bg-brand-50 text-brand-600"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                              >
                                {sub.name}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};

export default AppSidebar;
