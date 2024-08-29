import { createClient } from "../app/utils/supabase/server";
import LogoutButton from "../app/components/LogoutButton";

export default async function UserOptions() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    return (
      // <div className="text-sm origin-top-right absolute x-5 mt-1 py-1 shadow-lg bg-gray-900 ring-2 ring-black ring-opacity-5">
      // <div className="text-sm top-10 right-0 w-32 absolute mt-1 py-1 shadow-lg bg-gray-900 ring-2 ring-black ring-opacity-5">
      <div className="origin-top-right absolute mt-0 py-2 w-28 shadow-lg bg-gray-900 ring-2 ring-black ring-opacity-5">
        <ul
          className=""
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <li>
            <a
              href="/user-profile"
              className="block px-4 py-2 text-sm text-white hover:text-blue-500 hover:bg-gray-800"
              // onClick={closeDropdown}
            >
              User Profile
            </a>
          </li>
          {/* <li className="flex justify-center mt-1"> 
                    <LogoutButton />
                </li> */}
        </ul>
      </div>
    );
  }
  return (
    // <div className="origin-top-right absolute mt-0 py-2 w-28 shadow-lg bg-gray-900 ring-2 ring-black ring-opacity-5">
    <div>
      {/* <ul className="" role="menu" aria-orientation="vertical" aria-labelledby="options-menu"> */}
      {/* <li> */}
      {/* <a
                    href="/user-profile"
                    className="block px-4 py-2 text-sm text-white hover:text-blue-500 hover:bg-gray-800"
                    // onClick={closeDropdown}
                >
                    User Profile
                </a> */}
      {/* <p className="block px-4 py-2 text-sm text-white">
                    Login
                </p> */}
      {/* <p className="block px-4 py-2 text-sm text-white">
                    Sign Up
                </p> */}
      {/* </li> */}
      {/* </ul> */}
    </div>
    //     <div className="right-2 absolute mt-1 py-3 w-24 shadow-lg bg-gray-900 ring-2 ring-black ring-opacity-5">
    //     <ul className="flex justify-center" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
    //         <li>
    //         {/* <a className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-2 py-1 md:px-3.5 md:py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    //         href="/login">
    //             Login
    //         </a> */}
    //         Login
    //         </li>
    //     </ul>
    // </div>
  );
}
