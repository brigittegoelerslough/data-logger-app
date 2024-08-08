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
import buttonClick from "./actions";
import { setWeek } from "date-fns";

export default function ChartSelector(things){
    // console.log(things)

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
    const breakdownRef = useRef()
    const graphAllSum = useRef()
    const graphWeekSum = useRef()
    const graphMonthSum = useRef()
    const graphAllBreakdown = useRef()
    const graphMonthBreakdown = useRef()
    const graphWeekBreakdown = useRef()


    const now = new Date();
    // var datestring = now.toISOString().split('T')[0]

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
        <div className="columns-2 lg:columns-1 lg:flex-shrink-0 lg:flex-grow basis-1/4 pt-2 lg:pt-40">

        <div>
            <h1 className="text-xl xl:text-2xl font-bold mb-3 lg:mb-4">
                Time Period:
            </h1>

            {/* <input className="text-black" type="text" value={childState} onChange={() => handleStateChange} />
            <br></br> */}

            <select className="mb-10 max-w-64 m-auto text-black col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ref={timeRef}
                onChange={async () => {
                    const timescale = timeRef.current.value;
                    // const breakdown = breakdownRef.current.value;
                    if (breakdownRef.current.checked){
                        var breakdown = 'Breakdown'
                    } else{
                        var breakdown = 'Sum'
                    }
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
                <option value="Month">By Month</option>
                <option value="Week">By Week</option>
                {/* <option value="1">Brekadown by Amount</option> */}
                {/* <option value="4"></option> */}
            </select>
        </div>

        {/* <br></br> <br></br> <br></br> <br></br> */}
        <div>
            <h1 className="text-xl xl:text-2xl font-bold mb-3 lg:mb-4 lg:pt-32">Breakdown By Amount:</h1>
            
                <label className="inline-flex items-center cursor-pointer">
                <input 
                    type="checkbox" 
                    value="Breakdown" 
                    className="sr-only peer"
                    ref={breakdownRef}
                    onChange={async () => {
                        const timescale = timeRef.current.value;
                        if (breakdownRef.current.checked){
                            var breakdown = 'Breakdown'
                        } else{
                            var breakdown = 'Sum'
                        }

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
                        }}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                {/* <span className="ms-3 text-lg font-medium text-white">Breakdown By Amount</span> */}
                </label>
        </div>

    </div>

        {/* <div> */}
            {/* <div style={{display:"block"}} ref={graphAllSum} className="col-span-4"> */}
        <div style={{display:"block"}} ref={graphAllSum} className="mt-10 lg:mt-5 lg:ml-6 lg:flex-grow basis-3/4">
            <h1 className="text-2xl font-bold mb-4" >Consumption Over All Time</h1>
            
            <div className="-mx-2 lg:mx-0" >
                <BarChartAllSum things={finalResult}/>
            </div>
            {/* <App/> */}
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
            {/* <br></br> */}
            <button 
                onClick={() => chooseMonthToday()}
                className="mb-4 mt-4 ml-2 lg:mt-0 lg:ml-10 bg-transparent hover:bg-gray-400 text-white text-md font-semibold hover:text-white py-1 px-2 border border-white hover:border-white rounded">
                Return to Today
            </button>

            <div className="-mx-2 lg:mx-0" >
                <BarChartMonthSum data={[finalResult, monthState]}/>
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
                className="max-w-40 max-h-8 m-auto text-black text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                <BarChartWeekSum data={[finalResult, weekState]}/>
            </div>
        </div>

        <div style={{display:"none"}} ref={graphAllBreakdown} className="mt-10 lg:mt-5 lg:ml-6 lg:flex-grow basis-3/4">
            <h1 className="text-2xl font-bold mb-4" >Consumption Over Time</h1>
            <div className="-mx-2 lg:mx-0" >
                <BarChartAllBreakdown things={thingsData} />
            </div>
        </div>
            
        <div style={{display:"none"}} ref={graphMonthBreakdown} className="mt-10 lg:mt-5 lg:ml-6 lg:flex-grow basis-3/4">
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
                <BarChartMonthBreakdown data={[thingsData, monthState]} />
            </div>
        </div>    
            
        <div style={{display:"none"}} ref={graphWeekBreakdown} className="mt-4 lg:mt-0 lg:ml-6 lg:flex-grow basis-3/4">
            <h1 className="text-2xl font-bold mb-4" >Consumption Over The Week Of:</h1>

            <button className="font-bold" onClick={() => decreaseW()}>
                &larr; {"\xa0"}
            </button>
            <input 
                type="text" 
                ref={weekRef} 
                readOnly={true} 
                value = {dispWeek}
                className="max-w-40 max-h-8 m-auto text-black text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                <BarChartWeekBreakdown data={[thingsData, weekState]} />
            </div>
        </div>                

    </div>
      )
   }