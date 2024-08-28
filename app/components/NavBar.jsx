import Dropdown from "./Dropdown";
import LogoutOrLogin from "./LogoutOrLogin";
import UserDropdown from "./UserDropdown";

export default function NavBar({ children }) {
  return (
    <nav className="bg-gray-900 tex-white py-3 px-5">
      {/* <div className="flex justify-between items-center w-full"> */}
      <div className="flex justify-between items-center w-full">
        <Dropdown />
        <LogoutOrLogin />
        {/* <div className="flex items-center"> */}
        {/* <UserDropdown data={children}/> */}
        {/* {children} */}
        {/* <LogoutOrLogin/> */}
        {/* </div> */}

        {/* <div> */}
        {/* <UserDropdown data={children}/> */}
        {/* </div> */}

        {/* <div>
                    <UserProfile/>
               </div> */}
      </div>
    </nav>
  );
}
