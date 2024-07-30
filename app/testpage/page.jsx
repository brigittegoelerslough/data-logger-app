

import DataLogger from "../components/DataLogger";
import DeleteJokeButton from "../components/DeleteJokeButton";
import { createClient } from "../utils/supabase/server"
import BarChart4 from "../components/Charts/BarChartEmpty";
import BarChartEx from "../components/Charts/ExampleBarChart";

export default async function tester() {
    const test = []

    return (
        <main className="px-5 lg:px-0 bg-gray-800 min-h-screen flex pt-10 justify-center text-center text-white content-center">
            {/* <div className="grid grid-cols-5 gap-24 mx-12 -mt-14"> */}
            <div className="lg:flex md:w-screen lg:px-10">
                {/* <div className="col-span-1 content-center"> */}
                <div className="lg:flex-shrink-0 lg:flex-grow basis-1/4 pt-0 lg:pt-30">
                    {/* <h1 className="text-4xl font-bold mb-4 -mt-20">COOL</h1> */}
                    <h1 
                        class="text-4xl font-bold mb-4 text-yellow-600 sm:text-indigo-600 md:text-green-600 lg:text-fuchsia-600 xl:text-orange-600 2xl:text-blue-600"
                        >
                            Size
                    </h1>
                    <div>
            <select className="max-w-64 m-auto text-black col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"> 
            <option value="All">All Time</option>
            <option value="Month">Last Month</option>
            <option value="Week">Last Week</option>
            {/* <option value="1">Brekadown by Amount</option> */}
            {/* <option value="4"></option> */}
        </select>

        <br></br> <br></br> <br></br> <br></br>

        <h1 class="text-2xl font-bold mb-4">Breakdown By Amount:</h1>
        <div>
            <label class="inline-flex items-center cursor-pointer">
            <input 
                type="checkbox" 
                value="Breakdown" 
                class="sr-only peer"
            />
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            {/* <span class="ms-3 text-lg font-medium text-white">Breakdown By Amount</span> */}
            </label>
        </div>
                    </div>
                    {/* <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
                        > 
                        <a href="/login"> Login/Signup</a>
                    </button> */}
                </div>

                {/* <div className="col-span-4"> */}
                <div className="mt-4 lg:mt-0 lg:ml-6 lg:flex-grow basis-2/3">
                    <div>
                        <h1 className="text-2xl font-bold mb-4" >Consumption Over Time</h1>
                    </div>
                    <div>
                        <p>Testing to see how far across the text will get if I keep typing things</p>
                    </div>
                    {/* <BarChart4 /> */}
                    <div className="sm:width-8 md:width-8 lg:width-8 xl:width-8 2xl:width-1/2"> 
                        <p class="text-2xl font-bold mb-4 text-yellow-600 sm:text-indigo-600 md:text-green-600 lg:text-fuchsia-600 xl:text-orange-600 2xl:text-blue-600">
                            Testing to see how far across the text will get if I keep typing things</p>
                        <BarChartEx /> 
                    </div>
                </div>
            </div>
        </main>
    )
    }

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