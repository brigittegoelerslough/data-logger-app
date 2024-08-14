"use client";

import { Chart as ChartJS, defaults } from "chart.js/auto"
import {Bar, Doughnut, Line } from "react-chartjs-2"
// import chooseGraph from "../saved-data/actions";
import { useEffect, useRef, useState } from "react";
import BarChartAllSum from "./Charts/Sum/BarChartAllSum";
import BarChartWeekSum from "./Charts/Sum/BarChartWeekSum";
import BarChartMonthSum from "./Charts/Sum/BarChartMonthSum";
import BarChartAllBreakdown from "./Charts/Breakdown/BarChartAllBreakdown";
import BarChartMonthBreakdown from "./Charts/Breakdown/BarChartMonthBreakdown";
import BarChartWeekBreakdown from "./Charts/Breakdown/BarChartWeekBreakdown";
import { groupBy } from "core-js/actual/array/group-by";
import LineChartAll from "./Charts/Lines/LineChartAll";
import LineChartMonth from "./Charts/Lines/LineChartMonth";
import LineChartWeek from "./Charts/Lines/LineChartWeek";
import { convertToMMDDYYYY, decreaseMHelper, displayMonth, fillInDates, fillInObject, groupByReduce, increaseMHelper, sumData } from "../functions/actions";

export default function LineChartSelector(things){

    if (things.things.length == 0) {return};

    const thingsData = things.things

    const timeRef = useRef()
    const graphAllSum = useRef()
    const graphMonthSum = useRef()
    const graphWeekSum = useRef()

    const now = new Date();

    // Month Chooser
    const monthRef = useRef()
    const [monthState, setMonthState] = useState(now);

    function increaseM() {
        const nextMonth = increaseMHelper(monthState)
        setMonthState(nextMonth) 
    }

    function decreaseM() {
        const prevMonth = decreaseMHelper(monthState)
        setMonthState(prevMonth) 
    }

    function chooseMonthToday() {
        const today = new Date()
        setMonthState(today) 
    }
    
    var dispDay = displayMonth(monthState)

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

    const mmddyyyy = convertToMMDDYYYY(weekState)
    const oneWeek = 7 * 1000 * 60 * 60 * 24;
    const prevWeek = new Date(weekState - oneWeek)
    const mmddyyyy2 = convertToMMDDYYYY(prevWeek)

    var dispWeek =  mmddyyyy2 + ' - ' + mmddyyyy

    var chartheight = '100%'
    if (self.innerWidth < 750) {
     chartheight = 350
    } else if (self.innerWidth < 1023) {
     chartheight = '100%' 
    } else if (self.innerWidth < 1500) {
     chartheight = 550
    } else {
     chartheight = '100%'
    }


   return (
    <div className="lg:flex">
        
        <div className="lg:flex-shrink-0 lg:flex-grow basis-1/4 pt-0 object-center lg:my-auto "> 
                <h1 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4 lg:-mt-10">
                    Time Period:
                </h1>

                <select className="max-w-64 h-10 m-auto text-black col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                </select>
        </div>

        <div style={{display:"block"}} ref={graphAllSum} className="mt-10 lg:mt-5 lg:ml-6 lg:flex-grow basis-3/4">
            <h1 className="text-2xl font-bold mb-4" >Consumption Over All Time</h1>
            
            <div className="-mx-2 lg:mx-0" >
                <LineChartAll things={[thingsData, chartheight]}/>
            </div>
        </div>

        <div style={{display:"none"}} ref={graphMonthSum} className="mt-10 lg:mt-5 lg:ml-6 lg:flex-grow basis-3/4">
            <h1 className="text-xl lg:text-2xl font-bold mb-2 lg:mb-4" >Consumption Over The Month Of:</h1>

            <button className="-ml-3 font-bold" onClick={() => decreaseM()}>
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
                className="-mr-3 mb-4 mt-4 ml-2 lg:mt-0 lg:ml-10 bg-transparent hover:bg-gray-400 text-white text-md font-semibold hover:text-white py-1 px-2 border border-white hover:border-white rounded">
                Return to Today
            </button>

            <div className="-mx-2 lg:mx-0" >
                <LineChartMonth data={[thingsData, monthState, chartheight]}/>
            </div>
        </div>
        <div style={{display:"none"}} ref={graphWeekSum} className="mt-10 lg:mt-5 lg:ml-6 lg:flex-grow basis-3/4">
            <h1 className="text-xl lg:text-2xl font-bold mb-2 lg:mb-4" >Consumption Over The Week Of:</h1>

            <button className="-ml-3 font-bold" onClick={() => decreaseW()}>
                &larr; {"\xa0"}
            </button>
            <input 
                type="text" 
                ref={weekRef} 
                readOnly={true} 
                value = {dispWeek}
                className="max-w-56 max-h-8 m-auto text-black text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
            </input>  
            <button className="font-bold" onClick={() => increaseW()}>
                {"\xa0"} &rarr;
            </button>
            <button 
                onClick={() => chooseWeekToday()}
                className="-mr-3 mb-4 mt-4 ml-2 lg:mt-0 lg:ml-10 bg-transparent hover:bg-gray-400 text-white text-md font-semibold hover:text-white py-1 px-2 border border-white hover:border-white rounded">
                Return to Today
            </button>

            <div className="-mx-2 lg:mx-0" >
                <LineChartWeek data={[thingsData, weekState, chartheight]}/>
            </div>
        </div>               
        </div>
      )
   }