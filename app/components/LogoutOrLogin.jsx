import { createClient } from "../utils/supabase/server";
import LogoutButton from "./LogoutButton";


export default async function LogoutOrLogin(){
   const supabase = createClient();
   const {data} = await supabase.auth.getUser();
   // console.log({data});
   if (data.user){
       return (
           <div>
               <LogoutButton />
           </div>)}
   return (
       <div>
           {/* <a className="text-white hover:text-blue-500" href="/login"> */}
           <a className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-2 py-1 md:px-3.5 md:py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" 
           href="/login">
               Login
           </a>
       </div>)}
