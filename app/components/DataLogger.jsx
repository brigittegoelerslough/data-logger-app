'use client';
import { useEffect, useRef, useState } from "react";
import { saveJoke } from "../data/joke/actions";
import { redirect } from "next/navigation";
import { redirectlogin } from "../data/joke/actions";
import { saveThing } from "../data/things/actions";

function tempAlert(msg,duration){
    var el = document.createElement("p");
    // el.setAttribute("style","position:absolute;top:40%;left:20%;background-color:white;");
    el.setAttribute("style","\
        left:45%; \
        right:45%; \
        ");
    el.classList.add("text-black");
    el.classList.add("text-xl");
    el.classList.add("bg-white");
    el.classList.add("absolute");
    // el.classList.add("inset-x-64");
    el.classList.add("top-1");
    el.classList.add("items-center");
    el.classList.add("justify-center");
    el.classList.add("place-content-center");
    el.classList.add("p-5");
    // el.classList.add("");

    el.innerHTML = msg;
    setTimeout(function(){
    el.parentNode.removeChild(el);
    },duration);
    document.body.appendChild(el);
    }

export default function DataLogger(user){
//    const [joke, setJoke] = useState('');
//    const fetchJoke = async () =>{
//        const response = await fetch('https://icanhazdadjoke.com/', {
//            headers: {Accept: 'application/json'}})
//        const data = await response.json()
//        setJoke(data.joke) }
//    useEffect(() => {
//        fetchJoke();
//    }, []);

   const saveDataText = user.user ? 'Save Data' : 'Login To Save Data'
   const myElementRef = useRef()
   const myTimeRef = useRef()
   const myDateRef = useRef()

   if (!user.user){
    return (
        <div>
         <h1 className="text-2xl font-bold ">Log Data:</h1>
 
         <form className="max-w-sm mx-auto py-6">
         <label htmlFor="ammt" className="block mb-2 text-xl font-medium text-white"> Choose an amount: </label>
             <select ref={myElementRef} id="ammt" name="ammt" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                 <option value=""></option>
                 <option value="1">1</option>
                 <option value="2">2</option>
                 <option value="3">3</option>
                 <option value="4">4</option>
                 <option value="5">5</option>
                 {/* <option value="6">6</option>
                 <option value="7">7</option>
                 <option value="8">8</option>
                 <option value="9">9</option>
                 <option value="10">10</option> */}
             </select>
 
             <input type="time" ref={myTimeRef} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
             <input type="date" ref={myDateRef} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
 
             <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-8"
                > 
                <a href="/login"> Login/Signup</a>
            </button>
 
         </form>
 
        </div>)
   }

   var now = new Date();
   var minDate = now.toISOString().substring(0,10);

   return (
       <div>
        <h1 className="text-2xl font-bold ">Log Data:</h1>

        <form className="max-w-sm mx-auto py-6">
        <label htmlFor="ammt" className="block mb-2 text-xl font-medium text-white"> Choose an amount: </label>
            <select ref={myElementRef} id="ammt" name="ammt" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                {/* <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option> */}
            </select>

            <input 
                type="time" 
                ref={myTimeRef} 
                className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            <input 
                type="date" 
                ref={myDateRef} 
                max ={minDate}
                className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>

            <button
            //    type="submit"
            //    formAction={saveThing}
               disabled={!user}
               className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-8"
               onClick={async () => {
                   if (!user) {
                    console.log('TESTPROBL1')
                    // redirect('/login');
                    return;};
                    // console.log(user);
                    if(user.user === null) {
                        console.log('TESTPROBL2')
                        // redirect('/login'); 
                        // return;
                        await redirectlogin();
                        throw Error('Must be an authenticated user to perform this action');
                    }
                //    if (!user) throw Error('Must be an authenticated user to perform this action');
                    // const ammt = 2

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
                    // await saveThing(ammt);
                    await saveThing(formData);
                    // console.log('after save')
                    // alert('Data Saved Successfully!')
                   // TODO CHANGE TO TOAST MESSAGE
                   }}
                   >
                   {saveDataText}
               </button> 

        </form>

           {/* <p className="text-lg md:text-xl lg:text-2xl p-5">
            {joke || 'Loading joke...'}
           </p> */}

           {/* <div className="flex justify-center gap-10">
               <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchJoke}>
                   Regenerate
               </button>
               <button
               disabled={!user}
               className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
               onClick={async () => {
                   if (!user) return;
                    // console.log(user);
                    if(user.user === null) {
                        // redirect('/login'); 
                        // return;
                        await redirectlogin();
                        throw Error('Must be an authenticated user to perform this action');
                    }
                //    if (!user) throw Error('Must be an authenticated user to perform this action');
                   await saveThing(joke);
                   alert('Joke Saved!')
                   // TODO CHANGE TO TOAST MESSAGE
                   }}>
                   {saveJokeText}
               </button>               
           </div> */}

       </div>)}
