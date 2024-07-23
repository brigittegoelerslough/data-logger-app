"use client";

import { Chart as ChartJS, defaults } from "chart.js/auto"
import {Bar, Doughnut, Line } from "react-chartjs-2"
import revenueData from "./ChartData/revenueData.json"
// import chooseGraph from "../saved-data/actions";
import { useEffect, useRef, useState } from "react";
import BarChart from "./BarChart";
import BarChart2 from "./BarChart2";
import BarChart3 from "./BarChart3";
import BarChart4 from "./BarChart4";

export default function ChartSelector(things){

    if (things.things.length == 0) {
        return
    }

    const thingsData = things.things
    const days = Object.groupBy(thingsData, ({created_date}) => created_date)
 
    const newData = {}
    for (const day in days){
       var counter=0
       for (const item in day){
          try {
          counter += days[day][item]['amount']}
          catch(e){
             {}}
       }
       newData[day] = counter;
       counter=0
    };
 
    const sortedData = Object.keys(newData)
    .sort()
    .reduce((acc, key) => { 
       acc[key] = newData[key];
       return acc;
    }, {});
       
    //converting string to date objects
    const dates = [];
    for (const day in sortedData){
       dates.push(new Date(day))
    }
    const minimumDate = new Date(Math.min.apply(null, dates));
    const maximumDate = new Date(Math.max.apply(null, dates));
    // var num_days = parseInt((maximumDate - minimumDate) / (1000 * 60 * 60 * 24), 10); 
 
    //creating array with all dates (missing ones)
    var new_dates = []
    let i = minimumDate.getTime();
    do {
       let date = new Date(i);
       new_dates.push(date)
       i += 86400000;
    } while (i <= maximumDate);
    
    //filling in new object using old list and new missing dates filled in with 0
    let finalResult = {};
    new_dates.forEach(date => {
       var datestring = date.toISOString().split('T')[0]
       var mmddyyy = datestring.substring(5,7) + '/' + datestring.substring(8,10) + '/' + datestring.substring(0,4);
          if(!sortedData.hasOwnProperty(datestring)) {
             finalResult[mmddyyy] = 0;
          } else {
             finalResult[mmddyyy] = sortedData[datestring];
          }
    });



    const myElementRef2 = useRef()
    const graph1 = useRef()
    const graph2 = useRef()
    const graph3 = useRef()
    const graph4 = useRef()

   return (
    <div className="grid grid-cols-5 gap-24 m-12">
        <div className="col-span-1 content-center">
        <h1 className="text-2xl font-bold mb-4">
            Time Period
        </h1>
        <select id='purpose' className="text-black col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ref={myElementRef2}
            onChange={async () => {
                const ammt = myElementRef2.current.value;
                // console.log(ammt)
                if(ammt === "1"){
                    graph1.current.style.display = 'block';
                    graph2.current.style.display = 'none';
                    graph3.current.style.display = 'none';
                    graph4.current.style.display = 'none';
                } else if(ammt === "2"){
                    graph1.current.style.display = 'none';
                    graph2.current.style.display = 'block';
                    graph3.current.style.display = 'none';
                    graph4.current.style.display = 'none';
                } else if(ammt === "3"){
                    graph1.current.style.display = 'none';
                    graph2.current.style.display = 'none';
                    graph3.current.style.display = 'block';
                    graph4.current.style.display = 'none';
                } else if(ammt === "4"){
                    graph1.current.style.display = 'none';
                    graph2.current.style.display = 'none';
                    graph3.current.style.display = 'none';
                    graph4.current.style.display = 'block';
                } else {
                    graph1.current.style.display = 'none';
                    graph2.current.style.display = 'none';
                    graph3.current.style.display = 'none';
                    graph4.current.style.display = 'block';
                }
                }}> 
            <option value="2">All Time</option>
            {/* <option value="1">Double Bar</option> */}
            <option value="4">Last Month</option>
            <option value="3">Last Week</option>
            {/* <option value="4"></option> */}
        </select>

        </div>

        <div style={{display:"none"}} ref={graph1} className="col-span-4">
            <h1 className="text-2xl font-bold mb-4" >Consumption Over Time</h1>
            <BarChart things={finalResult}/>
        </div>
        <div style={{display:"block"}} ref={graph2} className="col-span-4">
            <h1 className="text-2xl font-bold mb-4" >Consumption Over All Time</h1>
            <BarChart2 things={finalResult}/>
        </div>
        <div style={{display:"none"}} ref={graph3} className="col-span-4">
            <h1 className="text-2xl font-bold mb-4" >Consumption Over The Last Week</h1>
            <BarChart3 things={finalResult}/>
        </div>
        <div style={{display:"none"}} ref={graph4} className="col-span-4">
            <h1 className="text-2xl font-bold mb-4" >Consumption Over The Last Month</h1>
            <BarChart4 things={finalResult}/>
        </div>
    </div>
      )
   }