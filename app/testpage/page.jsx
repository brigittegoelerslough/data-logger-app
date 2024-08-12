"use client";


// import chooseGraph from "../saved-data/actions";
// import { useEffect, useRef, useState } from "react";
import { groupBy } from "core-js/actual/array/group-by";
// import { revalidatePath } from "next/cache";

import { useState } from 'react';
// import { MyInput } from "./page2";

// const MyInput = (data) => {
//     console.log('DATA', data)
//     console.log(data.data[0], data.data[1])
//     const name = data.data[0]
//     const age = data.data[1]
//   return (
//     <div>
//         <p> TESTING </p>
//         <p>Hello, {name}. You are {age}.</p>
//     </div>
// )
// };

export default function Form() {
  const [name, setName] = useState('Taylor');
  const [age, setAge] = useState(42);

  return (
    <>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <br></br>
      <button onClick={() => setAge(age + 1)}>
        Increment age
      </button>
      <br></br>
      <button onClick={() => setAge(age - 1)}>
        Decrement age
      </button>
      <br></br><br></br>
    {/* <p>Hello, {name}. You are {age}.</p> */}
      <MyInput data={[name, age]} />
    </>
  );
}


// import { forwardRef, useRef } from 'react';

// const MyInput = forwardRef((props, ref) => {
//     console.log('PROPS:', props)
//   return <input {...props} ref={ref} />;
// });

// export default function Form() {
//   var inputRef = useRef(0);

//   function handleClick() {
//     // inputRef.current.focus();
//     inputRef.current = inputRef.current + 1
//   }

//   return (
//     <>
//       <MyInput ref={inputRef} />
//       <button onClick={handleClick}>
//         Focus the input
//       </button>
//     </>
//   );
// }

// export default function tester() {
    
//     var n = 0;

//     const myRef = useRef()

//     function buttonClick(){
//         n+=1;
//         myRef.current.value = n
//         return n;
//     }

//     return (
//         <main 
//         className="px-5 lg:px-0 bg-gray-800 min-h-screen flex pt-10 justify-center text-center text-white content-center"
//         >
//                 <button onClick={() => buttonClick()}>Click Me</button>
//                 <input type="text" ref={myRef} readOnly={true} 
//                 className="text-black"
//                 ></input>
//         </main>
//     )
//     }


//     <main className="px-5 lg:px-0 bg-gray-800 min-h-screen flex pt-10 justify-center text-center text-white content-center">
//     {/* <div className="grid grid-cols-5 gap-24 mx-12 -mt-14"> */}
//     <div className="lg:flex md:w-screen lg:px-10">
//         {/* <div className="col-span-1 content-center"> */}
//         <div className="lg:flex-shrink-0 lg:flex-grow basis-1/4 pt-0 lg:pt-30">
//             {/* <h1 className="text-4xl font-bold mb-4 -mt-20">COOL</h1> */}
//             <h1 
//                 className="text-4xl font-bold mb-4 text-yellow-600 sm:text-indigo-600 md:text-green-600 lg:text-fuchsia-600 xl:text-orange-600 2xl:text-blue-600"
//                 >
//                     Size
//             </h1>
//             <div>
//     <select className="max-w-64 m-auto text-black col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"> 
//     <option value="All">All Time</option>
//     <option value="Month">Last Month</option>
//     <option value="Week">Last Week</option>
//     {/* <option value="1">Brekadown by Amount</option> */}
//     {/* <option value="4"></option> */}
// </select>

// <br></br> <br></br> <br></br> <br></br>

// <h1 className="text-2xl font-bold mb-4">Breakdown By Amount:</h1>
// <div>
//     <label className="inline-flex items-center cursor-pointer">
//     <input 
//         type="checkbox" 
//         value="Breakdown" 
//         className="sr-only peer"
//     />
//     <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
//     {/* <span class="ms-3 text-lg font-medium text-white">Breakdown By Amount</span> */}
//     </label>
// </div>
//             </div>
//             {/* <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
//                 > 
//                 <a href="/login"> Login/Signup</a>
//             </button> */}
//         </div>

//         {/* <div className="col-span-4"> */}
//         <div className="mt-4 lg:mt-0 lg:ml-6 lg:flex-grow basis-2/3">
//             <div>
//                 <h1 className="text-2xl font-bold mb-4" >Consumption Over Time</h1>
//             </div>
//             <div>
//                 <p>Testing to see how far across the text will get if I keep typing things</p>
//             </div>
//             {/* <BarChart4 /> */}
//             <div className="sm:width-8 md:width-8 lg:width-8 xl:width-8 2xl:width-1/2"> 
//                 <p className="text-2xl font-bold mb-4 text-yellow-600 sm:text-indigo-600 md:text-green-600 lg:text-fuchsia-600 xl:text-orange-600 2xl:text-blue-600">
//                     Testing to see how far across the text will get if I keep typing things</p>
//                 <BarChartEx /> 
//             </div>
//         </div>
//     </div>
// </main>

{/* <div className="md:flex">
    <div className="md:flex-shrink-0 md:flex-grow basis-1/4"> 
        <DataLogger user={test} />
    </div>
    <div className="md:flex-shrink-0 md:flex-grow basis-1/4"> 
        <p/>
    </div>
    <div className="mt-4 md:mt-0 md:ml-6">
        <h1 className="text-2xl font-bold mb-4">YEEHAW</h1>
        <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2"
        > 
        <a href="/login"> Login/Signup</a>
        </button>
        <p>
            Here's some testing to see how far across this paragraph will get in the div
        </p>
    </div>
</div>     */}

