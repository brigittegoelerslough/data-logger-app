"use client";


// import chooseGraph from "../saved-data/actions";
// import { useEffect, useRef, useState } from "react";
import { groupBy } from "core-js/actual/array/group-by";
import revalidateTestpage from "../components/actions";
// import { revalidatePath } from "next/cache";

import { useState } from 'react';
// import { MyInput } from "./page2";
export const MyInput = (data) => {
    console.log('DATA', data)
    console.log(data.data[0], data.data[1])
    const name = data.data[0]
    const age = data.data[1]
  return (
    <div>
        <p> TESTING </p>
        <p>Hello, {name}. You are {age}.</p>
    </div>
)
};

// 'use client';

// import DataLogger from "../components/DataLogger";
// import DeleteJokeButton from "../components/DeleteJokeButton";
// import { createClient } from "../utils/supabase/server"


// export default async function tester() {
//     const test = []

//    return (
// <main 
// className="bg-gray-800 min-h-screen flex flex-col items-center pt-10 text-center text-white p-4"
// >
//     <div 
//     className="md:flex"
//     >
//         <div 
//             className="md:flex-shrink-0 md:flex-grow basis-1/3" //md:w-1/2
//             >
//             <img 
//                 className="rounded-lg" 
//                 // src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=448&q=80" 
//                 src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
//                 // width="448" 
//                 // height="299" 
//                 />
//             <p>JUST TESTING SOME THINGS</p>
//         </div>
//         <div 
//             className="mt-4 md:mt-0 md:ml-6"
//             >
//             <div 
//                 className="text-3xl text-yellow-600 sm:text-indigo-600 md:text-green-600 lg:text-fuchsia-600 xl:text-orange-600 font-bold uppercase" //tracking = space between letters
//                 >
//                     Size
//             </div>
//             <div 
//                 className="text-sm md:text-2xl uppercase tracking-wide text-indigo-600 font-bold" //tracking = space between letters
//                 >
//                     Marketing
//             </div>
//             <a 
//                 className="block mt-1 text-lg font-semibold text-gray-900 hover:underline"
//                 >
//                     Finding customers for your new business
//             </a>
//             <p 
//                 className="mt-2 text-gray-600 leading-tight" //leading = line spacing vertically
//                 >
//                     Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.
//             </p>
//         </div>
//     </div>
// </main>
//        )
//     }



    // <main className="bg-gray-800 min-h-screen flex items-center justify-center text-center text-white ">
    //     <div className="md:flex">
    //         <div className="md:flex-shrink-0 md:flex-grow basis-1/4"> 
    //             <DataLogger user={test} />
    //         </div>
    //         <div className="md:flex-shrink-0 md:flex-grow basis-1/4"> 
    //             <p/>
    //         </div>
    //         <div className="mt-4 md:mt-0 md:ml-6">
    //             <h1 className="text-2xl font-bold mb-4">YEEHAW</h1>
    //             <button
    //             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2"
    //             > 
    //             <a href="/login"> Login/Signup</a>
    //             </button>
    //             <p>
    //                 Here's some testing to see how far across this paragraph will get in the div
    //             </p>
    //         </div>
    //     </div>
    // </main>




    // import Image from "next/image";
    // import DataLogger from "../components/DataLogger";
    // import { createClient } from "../utils/supabase/server";
    // import DeleteThingButton from "../components/DeleteThingButton";
    // import {convert_time, convert_date} from "./actions";
    
    
    // export default async function Home() {
    
    //   const supabase = createClient();
    //   const {data} = await supabase.auth.getUser();
    
    //   // const supabase = createClient();
    //   const {data:userData} = await supabase.auth.getUser();
    //   let things = [];
    //   if (userData.user){
    //       const {data: thingsData, error} = await supabase.from('things').select('*');
    //       if (error){
    //           console.error('Error fetching things:', error)}
    //       things = thingsData;}
    //   let header = 'Delete Previous Entries:';
    //   if (!things.length){
    //       header = 'Save Some Things to See Your Data'}
    //   if (!userData.user){
    //       header = 'Login to Delete Previous Entries:';
    //       return (
    //       <main className="px-5 md:px-0 bg-gray-800 min-h-screen flex pt-10 md:pt-0 md:items-center justify-center text-center text-white ">
    //       {/* <div className="grid grid-cols-4 gap-10 "> */}
    //       <div className="md:flex ">
    //         {/* <div className="col-span-1">  */}
    //         <div className="md:flex-shrink-0 md:flex-grow basis-1/3"> 
    //           <DataLogger user={data.user} />
    //         </div>
    //         {/* <div className="col-span-1"> */}
    //         <div className="md:flex-shrink-0 md:flex-grow basis-1/4">
    //           <p></p>
    //         </div>
    //         {/* <div className="col-span-2"> */}
    //         <div className="mt-4 md:mt-0 md:ml-6 md:flex-shrink-0 md:flex-grow basis-1/2">
    //           <h1 className="text-2xl font-bold mb-4">{header}</h1>
    //           <button
    //           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2"
    //           > 
    //           <a href="/login"> Login/Signup</a>
    //           </button>
    //         </div>
    //       </div>
    //     </main> )
    //     //   return (
    //     //     <main className="bg-gray-800 min-h-screen flex items-center justify-center text-center text-white ">
    //     //       <div>
    //     //         <h1 className="text-4xl font-bold mb-4 -mt-20">{header}</h1>
    //     //         <button
    //     //             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-8"
    //     //             > 
    //     //             <a href="/login"> Login/Signup</a>
    //     //         </button>
    //     //       </div>
    //     //     </main>
    //     // )
    //   }
    
    //   for (var key in Object.keys(things)){
    //     things[key]['dateobj'] = new Date(things[key].created_at)
    //   }
    //   things.sort((a,b) => b.dateobj - a.dateobj)
    
    //   if (things.length % 2 == 1){
    //     var halfway = Math.floor(things.length/2)+1
    //   } else {
    //     var halfway = things.length/2
    //   }
    //   const first_keys = Object.keys(things).slice(0,halfway)
    //   var first_half = []
    //   for (const key in first_keys) {
    //    const id = first_keys[key]
    //    first_half.push(things[id])
    //   }
    //   const second_keys = Object.keys(things).slice(halfway,things.length)
    //   const second_half = []
    //   for (const key in second_keys) {
    //    const id = second_keys[key]
    //    second_half.push(things[id])
    //   }
    
    //   return (
    //     <main className="px-5 md:px-0 bg-gray-800 min-h-screen flex pt-10 justify-center text-center text-white ">
    
    //       {/* <div className="grid grid-cols-4 gap-10 mt-12 mx-4"> */}
    //       <div className="md:flex ">
    
    //         {/* <div className="col-span-1">  */}
    //         <div className="md:flex-shrink-0 md:flex-grow basis-1/4"> 
    //           <DataLogger user={data.user} />
    //         </div>
    
    //         {/* <div className="col-span-1"> */}
    //         <div className="md:flex-shrink-0 md:flex-grow basis-1/12">
    //           <p></p>
    //         </div>
    
    //         {/* <div className="col-span-2"> */}
            // <div className="mt-4 md:mt-0 md:ml-6 md:flex-shrink-0 md:flex-grow basis-2/3">
            //   <h1 className="text-2xl font-bold mb-4">{header}</h1>
              
            //   {/* <div className="grid grid-cols-2 gap-4"> */}
            //   <div className="">
            //   {/* <div className="md:flex-shrink-0 md:flex-grow"> */}
            //     <div className="basis-1/3">
            //         <ul>
            //           {first_half.map((thing) => (
            //             <div key={thing.id} className="flex items-center justify-center space-x-2">
            //                 <li className="list-none">
            //                   {
            //                   convert_date(thing.created_at.substring(5, 7)) + '/' + thing.created_at.substring(8, 10) + '/' + thing.created_at.substring(0, 4) +
            //                   ' at ' + convert_time(thing.created_at.substring(11,16)) + ' '
            //                   } 
            //                   {/* &mdash;  */}
            //                   &#8943;
            //                   {/* &#8943; */}
            //                   {/* &#10870; */}
            //                   {' Amount: ' + thing.amount
            //                   }
            //                   <DeleteThingButton thingId={thing.id} />
            //                 </li>
            //             </div>
            //             ))}
            //         </ul> 
            //       </div>
            //     {/* <div className="col-span-1"> */}
            //     <div className="basis-1/3 text-red-800">
            //       {/* <h1 className="text-2xl font-bold mb-4 text-gray-800"> {header} </h1> */}
            //         <ul>
            //           {second_half.map((thing) => (
            //             <div key={thing.id} className="flex items-center justify-center space-x-2">
            //                 <li className="list-none">
            //                   {
            //                   convert_date(thing.created_at.substring(5, 7)) + '/' + thing.created_at.substring(8, 10) + '/' + thing.created_at.substring(0, 4) +
            //                   ' at ' + convert_time(thing.created_at.substring(11,16)) + ' '
            //                   } 
            //                   {/* &mdash;  */}
            //                   &#8943;
            //                   {/* &#8943; */}
            //                   {/* &#10870; */}
            //                   {' Amount: ' + thing.amount
            //                   }
            //                   <DeleteThingButton thingId={thing.id} />
            //                 </li>
            //             </div>
            //             ))}
            //         </ul> 
            //     </div>
            //   </div>
            // </div>
            
    
    //       </div>
    //     </main>
    //   );
    // }
    




//     <div className="grid grid-cols-2 gap-4">
//     <div className="col-span-1">
//     {/* <div className="md:flex-shrink-0 md:flex-grow"> */}
//       {/* <div className="basis-1/3"> */}
//         <ul>
//           {first_half.map((thing) => (
//             // <div key={thing.id} className="flex items-center justify-center space-x-2">
//             <div key={thing.id} className="flex justify-end space-x-2">
//             <li className="list-none">
//                   {
//                   convert_date(thing.created_at.substring(5, 7)) + '/' + thing.created_at.substring(8, 10) + '/' + thing.created_at.substring(0, 4) +
//                   ' at ' + convert_time(thing.created_at.substring(11,16)) + ' '
//                   } 
//                   {"\xa0"}
//                   &mdash; 
//                   {"\xa0"}
//                   {/* &#8943; */}
//                   {/* &#8943; */}
//                   {/* &#10870; */}
//                   {/* {' Ammount: ' + thing.amount */}
//                   {' ' + thing.amount + ' '}
//                   <DeleteThingButton thingId={thing.id} />
//                 </li>
//             </div>
//             ))}
//         </ul> 
//       </div>
//     <div className="col-span-1 text-aqua-800">
//     {/* <div className="basis-1/3 text-red-800"> */}
//       {/* <h1 className="text-2xl font-bold mb-4 text-gray-800"> {header} </h1> */}
//         <ul>
//           {second_half.map((thing) => (
//             // <div key={thing.id} className="flex items-center justify-center space-x-2">
//             <div key={thing.id} className="flex items-center justify-start space-x-2">
//               <li className="list-none">
//                   {
//                   convert_date(thing.created_at.substring(5, 7)) + '/' + thing.created_at.substring(8, 10) + '/' + thing.created_at.substring(0, 4) +
//                   ' at ' + convert_time(thing.created_at.substring(11,16)) + ' '
//                   } 
//                   {"\xa0"}
//                   &mdash; 
//                   {"\xa0"}
//                   {/* &#8943; */}
//                   {/* &#8943; */}
//                   {/* &#10870; */}
//                   {' ' + thing.amount + ' '}
//                   {/* {' Amount: ' + thing.amount
//                   } */}
//                   <DeleteThingButton thingId={thing.id} />
//                 </li>
//             </div>
//             ))}
//         </ul> 
//     </div>
//   </div>