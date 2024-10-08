import Dropdown from "./Dropdown";
import LogoutOrLogin from "./LogoutOrLogin";

export default function NavBar({ children }) {
  return (
    <nav className="bg-gray-900 tex-white py-3 px-5">
      <div className="flex justify-between items-center w-full">
        <Dropdown />
        <LogoutOrLogin />
      </div>
    </nav>
  );
}
