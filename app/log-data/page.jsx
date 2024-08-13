import Image from "next/image";
import DataLogger from "../components/DataLogger";
import { createClient } from "../utils/supabase/server";
import DeleteThingButton from "../components/DeleteThingButton";
import {convert_time, convert_date} from "./actions";


export default async function Home() {

  const supabase = createClient();
  const {data} = await supabase.auth.getUser();

  // const supabase = createClient();
  const {data:userData} = await supabase.auth.getUser();
  let things = [];
  if (userData.user){
      const {data: thingsData, error} = await supabase.from('things').select('*');
      if (error){
          console.error('Error fetching things:', error)}
      things = thingsData;}
  let header = 'Delete Previous Entries:';
  if (!things.length){
      header = 'Save Some Things to See Your Data'}
  if (!userData.user){
      header = 'Login to Delete Previous Entries:';
      return (
      <main className="px-5 md:px-0 bg-gray-800 min-h-screen flex pt-10 md:pt-0 md:items-center justify-center text-center text-white ">
      {/* <div className="grid grid-cols-4 gap-10 "> */}
      <div className="md:flex ">
        {/* <div className="col-span-1">  */}
        <div className="md:flex-shrink-0 md:flex-grow basis-1/3"> 
          <DataLogger user={data.user} />
        </div>
        {/* <div className="col-span-1"> */}
        <div className="md:flex-shrink-0 md:flex-grow basis-1/4">
          <p></p>
        </div>
        {/* <div className="col-span-2"> */}
        <div className="mt-4 md:mt-0 md:ml-6 md:flex-shrink-0 md:flex-grow basis-1/2">
          <h1 className="text-2xl font-bold mb-4">{header}</h1>
          <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2"
          > 
          <a href="/login"> Login/Signup</a>
          </button>
        </div>
      </div>
    </main> )
    //   return (
    //     <main className="bg-gray-800 min-h-screen flex items-center justify-center text-center text-white ">
    //       <div>
    //         <h1 className="text-4xl font-bold mb-4 -mt-20">{header}</h1>
    //         <button
    //             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-8"
    //             > 
    //             <a href="/login"> Login/Signup</a>
    //         </button>
    //       </div>
    //     </main>
    // )
  }

  for (var key in Object.keys(things)){
    things[key]['dateobj'] = new Date(things[key].created_at)
  }
  things.sort((a,b) => b.dateobj - a.dateobj)

  if (things.length % 2 == 1){
    var halfway = Math.floor(things.length/2)+1
  } else {
    var halfway = things.length/2
  }
  const first_keys = Object.keys(things).slice(0,halfway)
  var first_half = []
  for (const key in first_keys) {
   const id = first_keys[key]
   first_half.push(things[id])
  }
  const second_keys = Object.keys(things).slice(halfway,things.length)
  const second_half = []
  for (const key in second_keys) {
   const id = second_keys[key]
   second_half.push(things[id])
  }

  return (
    <main className="px-5 md:px-0 bg-gray-800 min-h-screen flex pt-10 justify-center text-center text-white ">

      <div className="md:flex md:w-screen md:px-10 md:mx-10">

        <div className="md:flex-shrink-0 md:flex-grow basis-1/4 justify-center items-center"> 
          <DataLogger user={data.user} />
        </div>

        <div className="md:flex-shrink-0 md:flex-grow basis-1/12">
          <p></p>
        </div>

        <div className="mt-4 md:mt-0 md:ml-6 md:flex-shrink-0 md:flex-grow basis-2/3">
              <h1 className="text-2xl font-bold mb-4">{header}</h1>
            <div className="md:columns-1 lg:columns-2 min-[1400px]:columns-3 min-[1800px]:columns-4 pb-10">
                    <ul>
                      {first_half.map((thing) => (
                        <div key={thing.id} className="flex justify-center space-x-2">
                        <li className="list-none">
                              {
                              convert_date(thing.created_at.substring(5, 7)) + '/' + thing.created_at.substring(8, 10) + '/' + thing.created_at.substring(0, 4) +
                              ' at ' + convert_time(thing.created_at.substring(11,16)) + ' '
                              } 
                              {"\xa0"}
                              &mdash; 
                              {"\xa0"}
                              {' ' + thing.amount + ' '}
                              <DeleteThingButton thingId={thing.id} />
                            </li>
                        </div>
                        ))}
                    </ul> 
                  </div>
            </div>
      </div>
    </main>
  );
}
