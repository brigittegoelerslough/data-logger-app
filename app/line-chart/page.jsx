import BarChart from "../components/Charts/ExampleBarChart";
import BarChart4 from "../components/Charts/BarChartEmpty";
import ChartSelector from "../components/ChartSelector";
import DeleteThingButton from "../components/DeleteThingButton";
import { createClient } from "../utils/supabase/server";
import LineChartSelector from "../components/LineChartSelector";

export default async function SavedData() {
    const supabase = createClient();
    const {data:userData} = await supabase.auth.getUser();
    let things = [];
    if (userData.user){
        const {data: thingsData, error} = await supabase.from('things').select('*');
        if (error){
            console.error('Error fetching things:', error)}
        things = thingsData;}
    let header = 'Saved Data';
    if (!things.length){
        header = 'Save some things to see your data'}
    if (!userData.user){
        header = 'Login to see your data';
        return (
            // <main className="bg-gray-800 min-h-screen flex items-center justify-center text-center text-white col-span-1 content-center">
            //     <div className="grid grid-cols-5 gap-24 mx-12 -mt-14">
            //         <div className="col-span-1 content-center">
            //         <h1 className="text-4xl font-bold mb-4 -mt-20">{header}</h1>
            //         <button
            //             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
            //             > 
            //             <a href="/login"> Login/Signup</a>
            //         </button>
            //         </div>
            //         <div className="col-span-4">
            //             <h1 className="text-2xl font-bold mb-4" >Consumption Over Time</h1>
            //             <BarChart4 />
            //         </div>
            //     </div>
            // </main>
            <main className="md:w-screen bg-gray-800 min-h-screen flex justify-center text-center text-white col-span-1 content-center">
            {/* <div className="grid grid-cols-5 gap-24 mx-12 -mt-14"> */}
                <div className="lg:flex md:w-screen">
                    {/* <div className="col-span-1 content-center"> */}
                    <div className="lg:flex-shrink-0 lg:flex-grow basis-1/4 pt-10 lg:pt-64">
                        {/* <h1 className="text-4xl font-bold mb-4 -mt-20">{header}</h1> */}
                        <h1 className="text-xl xl:text-2xl font-bold mb-3 lg:mb-4">{header}</h1>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
                            > 
                            <a href="/login"> Login/Signup</a>
                        </button>
                    </div>

                    {/* <div className="col-span-4"> */}
                    <div className="mt-10 lg:mt-5 lg:ml-6 lg:flex-grow basis-3/4">
                        <h1 className="text-2xl font-bold mb-4" >Consumption Over Time</h1>
                        <BarChart4 />
                    </div>
                </div>
            </main>
        )
        }

    for (var key in Object.keys(things)){
        things[key]['dateobj'] = new Date(things[key].created_at)
        }
        things.sort((a,b) => b.dateobj - a.dateobj)
 
    return (
        <main className="bg-gray-800 min-h-screen items-center justify-center text-center text-white p-4">

            <div>
                {/* <h1 className="text-4xl font-bold mb-4">{header}</h1> */}
                <LineChartSelector things={things}/>
            </div>
        </main>
        )
     }