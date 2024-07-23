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
      header = 'Save some things to see your data'}
  if (!userData.user){
      header = 'Login to see your data'}

  for (var key in Object.keys(things)){
    things[key]['dateobj'] = new Date(things[key].created_at)
  }
  things.sort((a,b) => b.dateobj - a.dateobj)

  const halfway = Math.floor(things.length/2)+1
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
    <main className="bg-gray-800 min-h-screen flex items-center justify-center text-center text-white ">
      {/* <div className="grid grid-cols-4 gap-40"> */}

      <div className="grid grid-cols-4 gap-10 ">

        <div className="col-span-1"> 
          <DataLogger user={data.user} />
        </div>

        <div className="col-span-1">
          <p></p>
        </div>

        <div className="col-span-2">
          <h1 className="text-2xl font-bold mb-4">{header}</h1>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <div className="col-span-1">
                  <ul>
                    {first_half.map((thing) => (
                      <div key={thing.id} className="flex items-center justify-center space-x-2">
                          <li className="list-none">
                            {
                            convert_date(thing.created_at.substring(5, 7)) + '/' + thing.created_at.substring(8, 10) + '/' + thing.created_at.substring(0, 4) +
                            ' at ' + convert_time(thing.created_at.substring(11,16)) + ' '
                            } 
                            {/* &mdash;  */}
                            &#8943;
                            {/* &#8943; */}
                            {/* &#10870; */}
                            {' Amount: ' + thing.amount
                            }
                            <DeleteThingButton thingId={thing.id} />
                          </li>
                      </div>
                      ))}
                  </ul> 
                  </div>
              </div>
            <div className="col-span-1">
              {/* <h1 className="text-2xl font-bold mb-4 text-gray-800"> {header} </h1> */}
                <div className="col-span-1">
                    <ul>
                      {second_half.map((thing) => (
                        <div key={thing.id} className="flex items-center justify-center space-x-2">
                            <li className="list-none">
                              {
                              convert_date(thing.created_at.substring(5, 7)) + '/' + thing.created_at.substring(8, 10) + '/' + thing.created_at.substring(0, 4) +
                              ' at ' + convert_time(thing.created_at.substring(11,16)) + ' '
                              } 
                              {/* &mdash;  */}
                              &#8943;
                              {/* &#8943; */}
                              {/* &#10870; */}
                              {' Amount: ' + thing.amount
                              }
                              <DeleteThingButton thingId={thing.id} />
                            </li>
                        </div>
                        ))}
                    </ul> 
                    </div>
                </div>
          </div>
        </div>
        

      </div>
    </main>
  );
}
