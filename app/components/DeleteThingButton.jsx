'use client';
import { deleteThing } from "../data/things/actions";

export default function DeleteThingButton({thingId}){
   return (
       <button
       onClick={() => deleteThing(thingId)}
       className="text-red-500 p-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
           X
       </button>)}
