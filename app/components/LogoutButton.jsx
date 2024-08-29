"use client";

import { logout } from "../logout/actions";

export default function LogoutButton() {
  return (
    <button
      onClick={() => logout()}
      className="-mr-1 px-2 py-1 md:mg-0 md:px-3 md:py-1.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-200 ease-in-out"
    >
      Logout
    </button>
  );
}
