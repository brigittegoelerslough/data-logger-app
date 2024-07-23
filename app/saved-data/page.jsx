import BarChart from "../components/BarChart";
import ChartSelector from "../components/ChartSelector";
import DeleteThingButton from "../components/DeleteThingButton";
import { createClient } from "../utils/supabase/server";

export default async function SavedData() {
    const supabase = createClient();
    const {data:userData} = await supabase.auth.getUser();
    let things = [];
    if (userData.user){
        const {data: thingsData, error} = await supabase.from('things').select('*');
        if (error){
            console.error('Error fetching things:', error)}
        things = thingsData;}
    let header = 'Saved Things';
    if (!things.length){
        header = 'Save some things to see your data'}
    if (!userData.user){
        header = 'Login to see your data'}

    for (var key in Object.keys(things)){
        things[key]['dateobj'] = new Date(things[key].created_at)
        }
        things.sort((a,b) => b.dateobj - a.dateobj)
 
    return (
        <main className="bg-gray-800 min-h-screen items-center justify-center text-center text-white p-4">

            <div>
                <ChartSelector things={things}/>
            </div>


            {/* <div className="grid grid-cols-3 mt--10 py-6">
                <div className="col-span-3 mt-10">
                    <h1 className="text-2xl font-bold mb-4">{header}</h1>
                    <ul>
                        {things.map((thing) => (
                                <div key={thing.id} className="flex items-center justify-center space-x-2">
                                    <li className="list-none">
                                        {'ID: ' + thing.id +
                                        ' --- AMMT: ' + thing.amount +
                                        ' --- ON: ' + thing.created_at.substring(5, 7) + '/' + thing.created_at.substring(8, 10) + '/' + thing.created_at.substring(0, 4) +
                                        ' --- @ ' + thing.created_at.substring(11, 19)
                                        }
                                        <DeleteThingButton thingId={thing.id} />
                                    </li>
                                </div>
                            ))
                            }
                    </ul> 
                </div>   
            </div> */}

            {/* <div className="col-span-2 m-8" >  
                    <h1 className="text-2xl font-bold mb-4" >Monthly Revenue and Cost</h1>
                    <BarChart />
            </div>   */}
        </main>
        )
     }