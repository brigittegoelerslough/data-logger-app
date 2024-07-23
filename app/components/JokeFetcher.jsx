'use client';
import { useEffect, useState } from "react";
import { saveJoke } from "../data/joke/actions";
import { redirect } from "next/navigation";
import { redirectlogin } from "../data/joke/actions";


export default function JokeFetcher(user){
   const [joke, setJoke] = useState('');
   const fetchJoke = async () =>{
       const response = await fetch('https://icanhazdadjoke.com/', {
           headers: {Accept: 'application/json'}})
       const data = await response.json()
       setJoke(data.joke) }
   useEffect(() => {
       fetchJoke();
   }, []);
   const saveJokeText = user.user ? 'Save Joke' : 'Login To Save Jokes'
   return (
       <div>
           <p className="text-lg md:text-xl lg:text-2xl p-5">{joke || 'Loading joke...'}</p>
           <div className="flex justify-center gap-10">
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
                   await saveJoke(joke);
                   alert('Joke Saved!')
                   // TODO CHANGE TO TOAST MESSAGE
                   }}>
                   {saveJokeText}
               </button>               
           </div>
       </div>)}
