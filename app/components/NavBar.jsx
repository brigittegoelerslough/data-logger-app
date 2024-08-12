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

// export default function NavBar2() {
    
//     return(
//     <nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
//         <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//             {/* <button data-collapse-toggle="navbar-dropdown" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
//                 <span class="sr-only">Open main menu</span>
//                 <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
//                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
//                 </svg>
//             </button> */}
//             <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
//             <ul class="items-center flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                
//                 <li>
//                     <a href="/" 
//                         class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" 
//                         aria-current="/">
//                         Home
//                     </a>
//                 </li>

//                 <Dropdown/>

//                 <li>
//                     <a href="/log-data" 
//                     class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
//                         Log Data
//                     </a>
//                 </li>
                
//                 <li>
//                     <a href="/bar-chart" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
//                         Bar Charts
//                     </a>
//                 </li>
                
//                 <li>
//                     <a href="/line-chart" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
//                         Line Charts
//                     </a>
//                 </li>

//             </ul>

//             </div>
//         </div>
//     </nav>

//     )
//  }