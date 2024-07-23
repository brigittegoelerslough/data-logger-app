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
           <a className="text-white hover:text-blue-500" href="/login">
               Login
           </a>
       </div>)}
