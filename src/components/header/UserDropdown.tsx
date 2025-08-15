import { useState } from "react";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Dropdown } from "../ui/dropdown/Dropdown";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dropdown-toggle text-theme-xs"
      >
        <span className="block mr-2 font-medium">Musharof</span>
        <div className="flex items-center gap-1">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
          <svg
            className={`stroke-gray-500 transition-transform duration-200 ml-1 ${
              isOpen ? "rotate-180" : ""
            }`}
            width="14"
            height="14"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[10px] flex w-[220px] flex-col rounded-xl border border-gray-200 bg-white p-1 shadow-theme-lg"
      >
        <ul className="flex flex-col">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/profile"
              className="flex items-center gap-2 px-2 py-1 font-normal text-gray-700 rounded-lg group text-theme-xs hover:bg-gray-100 hover:text-gray-700"
            >
              Edit profile
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/profile"
              className="flex items-center gap-2 px-2 py-1 font-normal text-gray-700 rounded-lg group text-theme-xs hover:bg-gray-100 hover:text-gray-700"
            >
              Account settings
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/profile"
              className="flex items-center gap-2 px-2 py-1 font-normal text-gray-700 rounded-lg group text-theme-xs hover:bg-gray-100 hover:text-gray-700"
            >
              Support
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/signin"
              className="flex items-center gap-2 px-2 py-1 font-normal text-gray-700 rounded-lg group text-theme-xs hover:bg-gray-100 hover:text-gray-700"
            >
              Sign out
            </DropdownItem>
          </li>
        </ul>
      </Dropdown>
    </div>
  );
}
