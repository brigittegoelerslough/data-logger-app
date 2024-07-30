import LogoutOrLogin from "./LogoutOrLogin";


export default function NavBar() {
   return(
       <nav className="bg-gray-900 tex-white p-4">
           <div className="flex justify-between items-center w-full">
               <ul className="text-sm md:text-base flex space-x-3 md:space-x-6 justify-center items-center">
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
                           Bar Charts
                       </a>
                   </li>
                   <li>
                       <a href="/line-chart" className="text-white hover:text-blue-500">
                           Line Charts
                       </a>
                   </li>                   {/* <li>
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
