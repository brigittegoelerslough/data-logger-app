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
import { groupBy } from "core-js/actual/array/group-by";
import LineChart from "./Charts/Lines/ExampleLineChart";
import LineChartAll from "./Charts/Lines/LineChartAll";
import LineChartMonth from "./Charts/Lines/LineChartMonth";
import LineChartWeek from "./Charts/Lines/LineChartWeek";

export default function LineChartSelector(things){

    if (things.things.length == 0) {return};

    const thingsData = things.things
    const days = Object.groupBy(thingsData, ({created_date}) => created_date)
    // const days = thingsData.groupBy((created_date) => created_date)
    
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
    // var day = 60 * 60 * 24 * 1000;
    // const minimumDate = new Date(maximumDate.getTime() - (31 * day))
 
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
    const graphAllSum = useRef()
    const graphMonthSum = useRef()
    const graphWeekSum = useRef()


    const now = new Date();


    // Month Chooser
    const monthRef = useRef()
    const [monthState, setMonthState] = useState(now);

    function increaseM() {
        var datestring = monthState.toISOString()
        var currMonth = parseInt(monthState.toISOString().substring(5,7));
        if (currMonth < 12) {
            currMonth += 1
            if (currMonth < 10) {
                var newDay = datestring.substring(0,4) + '-0' + currMonth + '-10' + datestring.substring(10,30)
            } else {
                var newDay = datestring.substring(0,4) + '-' + currMonth + '-10' + datestring.substring(10,30)
            }
        } else if (currMonth == 12) {
            var currYear = parseInt(datestring.substring(0,4))
            currYear += 1
            var newDay = currYear + '-01-10' + datestring.substring(10,30)
        } else {
            alert('error')
        }
        const nextMonth = new Date(newDay)
        setMonthState(nextMonth) 
    }

    function decreaseM() {
        var datestring = monthState.toISOString()
        var currMonth = parseInt(monthState.toISOString().substring(5,7));
        if (currMonth > 1) {
            currMonth -= 1
            if (currMonth < 10) {
                var newDay = datestring.substring(0,4) + '-0' + currMonth + '-10' + datestring.substring(10,30)
            } else {
                var newDay = datestring.substring(0,4) + '-' + currMonth + '-10' + datestring.substring(10,30)
            }
        } else if (currMonth == 1) {
            var currYear = parseInt(datestring.substring(0,4))
            currYear -= 1
            var newDay = currYear + '-12-10' + datestring.substring(10,30)
        } else {
            alert('error')
        }
        const nextMonth = new Date(newDay)
        setMonthState(nextMonth) 
    }

    function chooseMonthToday() {
        const today = new Date()
        setMonthState(today) 
    }
    
    var months = [ "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December" ];
    var dispMonth = months[parseInt(monthState.toISOString().substring(5,7)) - 1];
    var dispYear = monthState.toISOString().substring(0,4);
    var dispDay = dispMonth + ' ' + dispYear


    // Week Chooser
    const weekRef = useRef()
    const [weekState, setWeekState] = useState(now);

    function increaseW() {
        const oneWeek = 7 * 1000 * 60 * 60 * 24;
        const newWeek = new Date(weekState.valueOf() + oneWeek)
        setWeekState(newWeek)
    }

    function decreaseW() {
        const oneWeek = 7 * 1000 * 60 * 60 * 24;
        const newWeek = new Date(weekState - oneWeek)
        setWeekState(newWeek)
    }

    function chooseWeekToday() {
        const today = new Date()
        setWeekState(today) 
    }

    const datestring = weekState.toISOString()
    if (datestring[5] == 0 && datestring[8] == 0){
        var mmddyyyy = datestring.substring(6,7) + '/' + datestring.substring(9,10) + '/' + datestring.substring(0,4);
    } else if (datestring[5] == 0) {
        var mmddyyyy = datestring.substring(6,7) + '/' + datestring.substring(8,10) + '/' + datestring.substring(0,4);
    } else if (datestring[8] == 0) {
        var mmddyyyy = datestring.substring(5,7) + '/' + datestring.substring(9,10) + '/' + datestring.substring(0,4);
    } else{
        var mmddyyyy = datestring.substring(5,7) + '/' + datestring.substring(8,10) + '/' + datestring.substring(0,4);
    }
    const oneWeek = 7 * 1000 * 60 * 60 * 24;
    const prevWeek = new Date(weekState - oneWeek)
    const prevdatestring = prevWeek.toISOString()
    if (prevdatestring[5] == 0 && prevdatestring[8] == 0){
        var mmddyyyy2 = prevdatestring.substring(6,7) + '/' + prevdatestring.substring(9,10) + '/' + prevdatestring.substring(0,4);
    } else if (datestring[5] == 0) {
        var mmddyyyy2 = prevdatestring.substring(6,7) + '/' + prevdatestring.substring(8,10) + '/' + prevdatestring.substring(0,4);
    } else if (datestring[8] == 0) {
        var mmddyyyy2 = prevdatestring.substring(5,7) + '/' + prevdatestring.substring(9,10) + '/' + prevdatestring.substring(0,4);
    } else{
        var mmddyyyy2 = prevdatestring.substring(5,7) + '/' + prevdatestring.substring(8,10) + '/' + prevdatestring.substring(0,4);
    }
    var dispWeek =  mmddyyyy2 + ' - ' + mmddyyyy


   return (
    // <div className="grid grid-cols-5 gap-24 m-12">
    <div className="lg:flex">
        {/* <div className="col-span-1 content-center"> */}
        <div className="lg:flex-shrink-0 lg:flex-grow basis-1/4 pt-0 lg:pt-40">

        <div>
        {/* <h1 className="text-2xl font-bold mb-4"> */}
        <h1 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">
            Time Period:
        </h1>

        <select className="max-w-64 m-auto text-black col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ref={timeRef}
            onChange={async () => {
                const timescale = timeRef.current.value;
                if(timescale === "All"){
                    graphAllSum.current.style.display = 'block';
                    graphMonthSum.current.style.display = 'none';
                    graphWeekSum.current.style.display = 'none';
                } else if(timescale === "Month"){
                    graphAllSum.current.style.display = 'none';
                    graphMonthSum.current.style.display = 'block';
                    graphWeekSum.current.style.display = 'none';
                } else if(timescale === "Week"){
                    graphAllSum.current.style.display = 'none';
                    graphMonthSum.current.style.display = 'none';
                    graphWeekSum.current.style.display = 'block';
                } else {
                    graphAllSum.current.style.display = 'block';
                    graphMonthSum.current.style.display = 'none';
                    graphWeekSum.current.style.display = 'none';
                }
                }}> 
            <option value="All">All Time</option>
            <option value="Month">By Month</option>
            <option value="Week">By Week</option>
            {/* <option value="1">Brekadown by Amount</option> */}
            {/* <option value="4"></option> */}
        </select>
        </div>

        </div>

            {/* <div style={{display:"block"}} ref={graphAllSum} className="col-span-4"> */}
            <div style={{display:"block"}} ref={graphAllSum} className="mt-10 lg:mt-5 lg:ml-6 lg:flex-grow basis-3/4">
                <h1 className="text-2xl font-bold mb-4" >Consumption Over All Time</h1>
                {/* <LineChart things={finalResult}/> */}
                
                <div className="-mx-2 lg:mx-0" >
                    <LineChartAll things={thingsData}/>
                </div>
            </div>

            <div style={{display:"none"}} ref={graphMonthSum} className="mt-10 lg:mt-5 lg:ml-6 lg:flex-grow basis-3/4">
                <h1 className="text-2xl font-bold mb-4" >Consumption Over The Month Of:</h1>

                <button className="font-bold" onClick={() => decreaseM()}>
                    &larr; {"\xa0"}
                </button>
                <input 
                    type="text" 
                    ref={monthRef} 
                    readOnly={true} 
                    value = {dispDay}
                    className="max-w-40 max-h-8 m-auto text-black text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                </input>  
                <button className="font-bold" onClick={() => increaseM()}>
                    {"\xa0"} &rarr;
                </button>
                <button 
                    onClick={() => chooseMonthToday()}
                    className="mb-4 mt-4 ml-2 lg:mt-0 lg:ml-10 bg-transparent hover:bg-gray-400 text-white text-md font-semibold hover:text-white py-1 px-2 border border-white hover:border-white rounded">
                    Return to Today
                </button>

                <div className="-mx-2 lg:mx-0" >
                    <LineChartMonth data={[thingsData, monthState]}/>
                </div>
            </div>
            <div style={{display:"none"}} ref={graphWeekSum} className="mt-10 lg:mt-5 lg:ml-6 lg:flex-grow basis-3/4">
                <h1 className="text-2xl font-bold mb-4" >Consumption Over The Week Of:</h1>

                <button className="font-bold" onClick={() => decreaseW()}>
                    &larr; {"\xa0"}
                </button>
                <input 
                    type="text" 
                    ref={weekRef} 
                    readOnly={true} 
                    value = {dispWeek}
                    className="max-w-48 max-h-8 m-auto text-black text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                </input>  
                <button className="font-bold" onClick={() => increaseW()}>
                    {"\xa0"} &rarr;
                </button>
                <button 
                    onClick={() => chooseWeekToday()}
                    className="mb-4 mt-4 ml-2 lg:mt-0 lg:ml-10 bg-transparent hover:bg-gray-400 text-white text-md font-semibold hover:text-white py-1 px-2 border border-white hover:border-white rounded">
                    Return to Today
                </button>

                <div className="-mx-2 lg:mx-0" >
                    <LineChartWeek data={[thingsData, weekState]}/>
                </div>
            </div>               
        </div>
      )
   }