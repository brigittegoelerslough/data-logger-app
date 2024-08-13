'use client';

import { useRef } from "react";
import { redirect } from "next/navigation";
import { saveThing } from "../data/things/actions";
import { toast } from "react-hot-toast";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

// import "react-toastify/dist/ReactToastify.css";

// toast.configure();

export default function DataLogger(user){

   const saveDataText = user.user ? 'Save Data' : 'Login To Save Data'
   const myElementRef = useRef()
   const myTimeRef = useRef()
   const myDateRef = useRef()

   if (!user.user){
    return (
        <div className="justify-center items-center">
         <h1 className="text-2xl font-bold ">Log Data:</h1>
 
         <form className="w-72 mx-auto py-6">
         <label htmlFor="ammt" className="block mb-2 text-xl font-medium text-white"> Choose an amount: </label>
             <select ref={myElementRef} id="ammt" name="ammt" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                 <option value=""></option>
                 <option value="1">1</option>
                 <option value="2">2</option>
                 <option value="3">3</option>
                 <option value="4">4</option>
                 <option value="5">5</option>
                 <option value="6">6</option>
             </select>
 
             <input type="time" ref={myTimeRef} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
             <input type="date" ref={myDateRef} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
 
             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-8"> 
                <a href="/login"> Login/Signup</a>
            </button>
         </form>
        </div>
        ) }

   var now = new Date();
   var minDate = now.toISOString().substring(0,10);

   return (
       <div className="justify-center items-center">
        <h1 className="text-2xl font-bold ">Log Data:</h1>

        <form className="max-w-sm mx-auto py-6 justify-center items-center">
        <label htmlFor="ammt" className="block mb-2 text-xl font-medium text-white"> Choose an amount: </label>
            <select 
            ref={myElementRef} 
            id="ammt" 
            name="ammt" 
            className="mx-auto w-72 h-11 items-center justify-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>

            <input 
                type="time" 
                placeholder="--:-- --"
                ref={myTimeRef} 
                className="mx-auto w-72 h-11 items-center justify-center mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            
            <input 
                type="date" 
                placeholder="mm/dd/yyyy"
                ref={myDateRef} 
                max ={minDate}
                className="mx-auto w-72 h-11 items-center justify-center mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>

            <button
               disabled={!user}
               className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-8"
               onClick={async () => {
                   if (!user) {
                    console.log('TESTPROBL1')
                    // redirect('/login');
                    return;};
                    if(user.user === null) {
                        console.log('TESTPROBL2')
                        // redirect('/login'); 
                        // return;
                        // await redirectlogin();
                        throw Error('Must be an authenticated user to perform this action');
                    }

                    const ammt = Number(myElementRef.current.value);
                    const time = myTimeRef.current.value;
                    const date = myDateRef.current.value;
                    const datetime = date.concat(" ", time, ":00")

                    const curr_time = new Date;
                    const curr_datetime = curr_time.toISOString().replace("T"," ").substring(0, 19);
                    const curr_date = curr_time.toISOString().substring(0, 10);
                    
                    if (time == null || date == null) {
                        var formData = {amount: ammt, created_date: curr_date, created_at: curr_datetime}
                    } else {
                        var formData = {amount: ammt, created_date: date, created_at: datetime}
                    }

                    // tempAlert("Data Saved!", 20000);
                    // alert('Data Saved!')      
                    // await saveThing(formData);
                    await saveThing(formData);
                    toast.custom(
                    <div className="flex gap-4 bg-green-100 text-black h-10 w-44 rounded-lg items-center justify-left">
                        <div className="ml-1 items-center justify-center inline-flex h-8 w-8 shrink-0 rounded-lg bg-green-300 text-green-700 dark:bg-green-800 dark:text-green-200">
                            <HiCheck className="h-5 w-5" />
                            {/* <HiCheck className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200" /> */}
                        </div>
                        <p className="ml-2 text-md font-normal">
                            Data Saved!
                        </p>
                    </div>, {
                        duration: 4000,
                        position: 'top-center'
                    });
                   }}
                   >
                   {saveDataText}
               </button> 
        </form>
       </div>)}
