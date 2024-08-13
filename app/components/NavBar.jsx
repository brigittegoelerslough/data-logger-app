import Dropdown from "./Dropdown";
import LogoutOrLogin from "./LogoutOrLogin";


export default function NavBar() {
   return(
       <nav className="bg-gray-900 tex-white py-3 px-5">
           <div className="flex justify-between items-center w-full">
                <Dropdown/>

               <div>
                   <LogoutOrLogin />
               </div>
           </div>
       </nav>
   )
}