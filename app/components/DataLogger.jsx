'use client';

import { useRef } from "react";
import { redirect } from "next/navigation";
import { saveThing } from "../data/things/actions";
import { toast } from "react-hot-toast";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";


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

   var hours = ''+now.getHours()
   var minutes = ''+now.getMinutes()
   if (hours.length == 1) {
    hours = 0 + hours
   }
   if (minutes.length == 1) {
    minutes = 0 + minutes
   }
   var currTime = hours + ':' + minutes

   var month = '' + (now.getMonth()+1)
   var date = '' + now.getDate()
   var year = '' + now.getFullYear()
   if (month.length == 1) {
    month = 0 + month
   }
   if (date.length == 1) {
    date = 0 + date
   }

   var currDate = year + '-' + month + '-' + date

   return (
       <div className="">
        <h1 className="text-2xl font-bold ">Log Data:</h1>

        <form className="max-w-sm py-6 items-start">
            <label className="text-left ml-1 block mb-1 text-lg font-small text-white"> Amount: </label>
            <select 
            ref={myElementRef} 
            id="ammt" 
            name="ammt" 
            className="mx-auto w-72 lg:w-full h-11 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>

            <label className="text-left ml-1 block mb-1 mt-4 text-lg font-small text-white justify-start"> Time: </label>
            <input 
                type="time" 
                ref={myTimeRef} 
                defaultValue = {currTime}
                className="mx-auto w-72 lg:w-full h-11 items-center justify-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />

            <label className="text-left ml-1 block mb-1 mt-4 text-lg font-small text-white"> Date: </label>
            <input 
                type="date" 
                ref={myDateRef} 
                max ={currDate}
                defaultValue = {currDate}
                className="mx-auto w-72 lg:w-full h-11 items-center justify-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>

            <button
               type='button'
               disabled={!user}
               className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-8"
               onClick={async () => {
                    if(user.user == null || !user) {
                        console.log('TESTPROBL2')
                        throw Error('Must be an authenticated user to perform this action');
                    }

                    const ammt = Number(myElementRef.current.value);
                    const time = myTimeRef.current.value;
                    const date = myDateRef.current.value;
                    const datetime = date.concat(" ", time, ":00")
                    
                    const curr_time = new Date;
                    const curr_datetime = curr_time.toISOString().replace("T"," ").substring(0, 19);
                    const curr_date = curr_time.toISOString().substring(0, 10);
                    
                    if (ammt == '') {
                        toast.dismiss();
                        toast.error('Must enter an amount')
                    } else if (time == '' || date == '') { 
                        toast.dismiss();
                        toast.error('Must enter a date and time')
                    } else {
                        var formData = {amount: ammt, created_date: date, created_at: datetime}
                        await saveThing(formData);

                        toast.dismiss();
                        toast.success('Data Saved!')

                        myElementRef.current.value = null
                        myTimeRef.current.value = null
                        myDateRef.current.value = null
                    }
                }}
                   >
                   {saveDataText}
               </button> 
        </form>
       </div>
       )}
