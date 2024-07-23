"use client";

import { Chart as ChartJS, defaults } from "chart.js/auto"
import {Bar, Doughnut, Line } from "react-chartjs-2"
import revenueData from "./Charts/revenueData.json"
// import chooseGraph from "../saved-data/actions";
import { useEffect, useRef, useState } from "react";
import BarChart from "./Charts/ExampleBarChart";
import BarChartAllSum from "./Charts/Sum/BarChartAllSum";
import BarChartWeekSum from "./Charts/Sum/BarChartWeekSum";
import BarChartMonthSum from "./Charts/Sum/BarChartMonthSum";
import BarChartAllBreakdown from "./Charts/Breakdown/BarChartAllBreakdown";
import BarChartMonthBreakdown from "./Charts/Breakdown/BarChartMonthBreakdown";
import BarChartWeekBreakdown from "./Charts/Breakdown/BarChartWeekBreakdown";

export default function ChartSelector(things){

    if (things.things.length == 0) {return};

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
    // const maximumDate = new Date(Math.max.apply(null, dates));
    const maximumDate = new Date();
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

    const timeRef = useRef()
    const breakdownRef = useRef()
    const graphAllSum = useRef()
    const graphWeekSum = useRef()
    const graphMonthSum = useRef()
    const graphAllBreakdown = useRef()
    const graphMonthBreakdown = useRef()
    const graphWeekBreakdown = useRef()


   return (
    <div className="grid grid-cols-5 gap-24 m-12">
        <div className="col-span-1 content-center">
        <h1 className="text-2xl font-bold mb-4">
            Time Period
        </h1>

        <select className="text-black col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ref={breakdownRef}
            onChange={async () => {
                const timescale = timeRef.current.value;
                const breakdown = breakdownRef.current.value;
                // console.log(ammt)
                if(timescale === "All" && breakdown == "Sum"){
                    graphAllSum.current.style.display = 'block';
                    graphMonthSum.current.style.display = 'none';
                    graphWeekSum.current.style.display = 'none';
                    graphAllBreakdown.current.style.display = 'none';
                    graphMonthBreakdown.current.style.display = 'none';
                    graphWeekBreakdown.current.style.display = 'none';
                } else if(timescale === "All" && breakdown == "Breakdown"){
                    graphAllSum.current.style.display = 'none';
                    graphMonthSum.current.style.display = 'none';
                    graphWeekSum.current.style.display = 'none';
                    graphAllBreakdown.current.style.display = 'block';
                    graphMonthBreakdown.current.style.display = 'none';
                    graphWeekBreakdown.current.style.display = 'none';
                } else if(timescale === "Month" && breakdown == "Sum"){
                    graphAllSum.current.style.display = 'none';
                    graphMonthSum.current.style.display = 'block';
                    graphWeekSum.current.style.display = 'none';
                    graphAllBreakdown.current.style.display = 'none';
                    graphMonthBreakdown.current.style.display = 'none';
                    graphWeekBreakdown.current.style.display = 'none';
                } else if(timescale === "Month" && breakdown == "Breakdown"){
                    graphAllSum.current.style.display = 'none';
                    graphMonthSum.current.style.display = 'none';
                    graphWeekSum.current.style.display = 'none';
                    graphAllBreakdown.current.style.display = 'none';
                    graphMonthBreakdown.current.style.display = 'block';
                    graphWeekBreakdown.current.style.display = 'none';
                } else if(timescale === "Week" && breakdown == "Sum"){
                    graphAllSum.current.style.display = 'none';
                    graphMonthSum.current.style.display = 'none';
                    graphWeekSum.current.style.display = 'block';
                    graphAllBreakdown.current.style.display = 'none';
                    graphMonthBreakdown.current.style.display = 'none';
                    graphWeekBreakdown.current.style.display = 'none';
                } else if(timescale === "Week" && breakdown == "Breakdown"){
                    graphAllSum.current.style.display = 'none';
                    graphMonthSum.current.style.display = 'none';
                    graphWeekSum.current.style.display = 'none';
                    graphAllBreakdown.current.style.display = 'none';
                    graphMonthBreakdown.current.style.display = 'none';
                    graphWeekBreakdown.current.style.display = 'block';
                } else {
                    graphAllSum.current.style.display = 'block';
                    graphMonthSum.current.style.display = 'none';
                    graphWeekSum.current.style.display = 'none';
                    graphAllBreakdown.current.style.display = 'none';
                    graphMonthBreakdown.current.style.display = 'none';
                    graphWeekBreakdown.current.style.display = 'none';
                }
                }}> 
            <option value="Sum">Sum</option>
            <option value="Breakdown">Breakdown</option>
            {/* <option value="4"></option> */}
        </select>
        <br></br>

        <select className="text-black col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ref={timeRef}
            onChange={async () => {
                const timescale = timeRef.current.value;
                const breakdown = breakdownRef.current.value;
                // console.log(ammt)
                if(timescale === "All" && breakdown == "Sum"){
                    graphAllSum.current.style.display = 'block';
                    graphMonthSum.current.style.display = 'none';
                    graphWeekSum.current.style.display = 'none';
                    graphAllBreakdown.current.style.display = 'none';
                    graphMonthBreakdown.current.style.display = 'none';
                    graphWeekBreakdown.current.style.display = 'none';
                } else if(timescale === "All" && breakdown == "Breakdown"){
                    graphAllSum.current.style.display = 'none';
                    graphMonthSum.current.style.display = 'none';
                    graphWeekSum.current.style.display = 'none';
                    graphAllBreakdown.current.style.display = 'block';
                    graphMonthBreakdown.current.style.display = 'none';
                    graphWeekBreakdown.current.style.display = 'none';
                } else if(timescale === "Month" && breakdown == "Sum"){
                    graphAllSum.current.style.display = 'none';
                    graphMonthSum.current.style.display = 'block';
                    graphWeekSum.current.style.display = 'none';
                    graphAllBreakdown.current.style.display = 'none';
                    graphMonthBreakdown.current.style.display = 'none';
                    graphWeekBreakdown.current.style.display = 'none';
                } else if(timescale === "Month" && breakdown == "Breakdown"){
                    graphAllSum.current.style.display = 'none';
                    graphMonthSum.current.style.display = 'none';
                    graphWeekSum.current.style.display = 'none';
                    graphAllBreakdown.current.style.display = 'none';
                    graphMonthBreakdown.current.style.display = 'block';
                    graphWeekBreakdown.current.style.display = 'none';
                } else if(timescale === "Week" && breakdown == "Sum"){
                    graphAllSum.current.style.display = 'none';
                    graphMonthSum.current.style.display = 'none';
                    graphWeekSum.current.style.display = 'block';
                    graphAllBreakdown.current.style.display = 'none';
                    graphMonthBreakdown.current.style.display = 'none';
                    graphWeekBreakdown.current.style.display = 'none';
                } else if(timescale === "Week" && breakdown == "Breakdown"){
                    graphAllSum.current.style.display = 'none';
                    graphMonthSum.current.style.display = 'none';
                    graphWeekSum.current.style.display = 'none';
                    graphAllBreakdown.current.style.display = 'none';
                    graphMonthBreakdown.current.style.display = 'none';
                    graphWeekBreakdown.current.style.display = 'block';
                } else {
                    graphAllSum.current.style.display = 'block';
                    graphMonthSum.current.style.display = 'none';
                    graphWeekSum.current.style.display = 'none';
                    graphAllBreakdown.current.style.display = 'none';
                    graphMonthBreakdown.current.style.display = 'none';
                    graphWeekBreakdown.current.style.display = 'none';
                }
                }}> 
            <option value="All">All Time</option>
            <option value="Month">Last Month</option>
            <option value="Week">Last Week</option>
            {/* <option value="1">Brekadown by Amount</option> */}
            {/* <option value="4"></option> */}
        </select>

        </div>

        {/* <div style={{display:"none"}} ref={graphAllBreakdown} className="col-span-4"> */}
            {/* <h1 className="text-2xl font-bold mb-4" >Consumption Over Time</h1> */}
            {/* <BarChartEx things={finalResult}/> */}
            {/* <BarChartBreakdown things={finalResult}/> */}
        {/* </div> */}
            <div style={{display:"block"}} ref={graphAllSum} className="col-span-4">
                <h1 className="text-2xl font-bold mb-4" >Consumption Over All Time</h1>
                <BarChartAllSum things={finalResult}/>
            </div>
            <div style={{display:"none"}} ref={graphWeekSum} className="col-span-4">
                <h1 className="text-2xl font-bold mb-4" >Consumption Over The Last Week</h1>
                <BarChartWeekSum things={finalResult}/>
            </div>
            <div style={{display:"none"}} ref={graphMonthSum} className="col-span-4">
                <h1 className="text-2xl font-bold mb-4" >Consumption Over The Last Month</h1>
                <BarChartMonthSum things={finalResult}/>
            </div>
            <div style={{display:"none"}} ref={graphAllBreakdown} className="col-span-4">
                <h1 className="text-2xl font-bold mb-4" >Consumption Over Time</h1>
                <BarChartAllBreakdown things={thingsData} />
            </div>
            <div style={{display:"none"}} ref={graphMonthBreakdown} className="col-span-4">
                <h1 className="text-2xl font-bold mb-4" >Consumption Over Time</h1>
                <BarChartMonthBreakdown things={thingsData} />
            </div>    
            <div style={{display:"none"}} ref={graphWeekBreakdown} className="col-span-4">
                <h1 className="text-2xl font-bold mb-4" >Consumption Over Time</h1>
                <BarChartWeekBreakdown things={thingsData} />
            </div>                
        </div>
      )
   }