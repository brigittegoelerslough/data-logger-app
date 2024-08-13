"use client";

// import { revalidatePath } from "next/cache";
import { groupBy } from "core-js/actual/array/group-by";
import { useState } from 'react';


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


    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
    //     <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
    //       Get started by editing&nbsp;
    //       <code className="font-mono font-bold">app/page.js</code>
    //     </p>
    //     <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
    //       <a
    //         className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
    //         href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         By{" "}
    //         <Image
    //           src="/vercel.svg"
    //           alt="Vercel Logo"
    //           className="dark:invert"
    //           width={100}
    //           height={24}
    //           priority
    //         />
    //       </a>
    //     </div>
    //   </div>

    //   <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
    //     <Image
    //       className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
    //       src="/next.svg"
    //       alt="Next.js Logo"
    //       width={180}
    //       height={37}
    //       priority
    //     />
    //   </div>

    //   <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
    //     <a
    //       href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`mb-3 text-2xl font-semibold`}>
    //         Docs{" "}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
    //         Find in-depth information about Next.js features and API.
    //       </p>
    //     </a>

    //     <a
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`mb-3 text-2xl font-semibold`}>
    //         Learn{" "}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
    //         Learn about Next.js in an interactive course with&nbsp;quizzes!
    //       </p>
    //     </a>

    //     <a
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`mb-3 text-2xl font-semibold`}>
    //         Templates{" "}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
    //         Explore starter templates for Next.js.
    //       </p>
    //     </a>

    //     <a
    //       href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`mb-3 text-2xl font-semibold`}>
    //         Deploy{" "}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
    //         Instantly deploy your Next.js site to a shareable URL with Vercel.
    //       </p>
    //     </a>
    //   </div>
    // </main>

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