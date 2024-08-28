"use client";
import React, { useState } from "react";
import LogoutButton from "./LogoutButton";
import { FaUser } from "react-icons/fa";
// import LogoutOrLogin from './LogoutOrLogin';

export default function UserDropdown(data) {
  var children = data.data;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="justify-items-end">
      <button
        type="button"
        // className="items-center w-28 py-2 px-3 text-white hover:text-blue-500 bg-transparent focus:outline-none inline-flex"
        className="justify-end items-center py-2 w-28 px-3 text-white hover:text-blue-500 bg-transparent focus:outline-none inline-flex"
        onClick={toggleDropdown}
        // onMouseOver={openDropdown}
      >
        {/* User {"\xa0"} */}
        <FaUser fontSize={22} />

        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        // <div className="origin-top-right absolute mt-1 py-1 w-28 shadow-lg bg-gray-900 ring-2 ring-black ring-opacity-5">
        // <div className="origin-top-right absolute mt-1 py-1 w-35 shadow-lg bg-gray-900 ring-2 ring-black ring-opacity-5">
        <div>
          {/* <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <li>
                                    {children}
                                </li>
                            </ul> */}
          {/* USER OPTIONS */}
          {children}
        </div>
      )}
    </div>
  );
}
