import LogoutOrLogin from "./LogoutOrLogin";


export default function NavBar() {
   return(
       <nav className="bg-gray-900 tex-white p-4">
           <div className="flex justify-between items-center w-full">
               <ul className="flex space-x-4 justify-center items-center">
                   <li>
                       <a href="/" className="text-white hover:text-blue-500">
                           Home
                       </a>
                   </li>
                   <li>
                       <a href="/log-data" className="text-white hover:text-blue-500">
                           Log Data
                       </a>
                   </li>
                   <li>
                       <a href="/saved-data" className="text-white hover:text-blue-500">
                           Saved Data
                       </a>
                   </li>
                   {/* <li>
                       <a href="/saved-jokes" className="text-white hover:text-blue-500">
                           Saved Jokes
                       </a>
                   </li> */}
               </ul>
               <div>
                   <LogoutOrLogin />
               </div>
           </div>
       </nav>
   )
}
