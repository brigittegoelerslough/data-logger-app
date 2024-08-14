"use client";

import { groupByReduce } from "@/app/functions/actions";
import { Chart as ChartJS, defaults } from "chart.js/auto"
import {Bar, Doughnut, Line } from "react-chartjs-2"

export default function BarChartMonthBreakdown(things){

   const thingsData = things.data[0]
   const date = things.data[1]
   const chartheight = things.data[2]


   const chosenMonth = date.toISOString().substring(5,7)
   const chosenYear = date.toISOString().substring(0,4)

   let finalResult = []
   for (const item of thingsData) {
      if (item['date'].substring(0,2) == chosenMonth && item['date'].substring(6,10) == chosenYear){
         finalResult.push(item)
      }
   }

   return (
      <div>
       <div style={{height: chartheight}}>
         <Bar 
             options= {{
               maintainAspectRatio: false,
               aspectRatio: 1,
               plugins: {
                  legend: {
                     labels: {
                       boxWidth: 35,
                     }
                   },
               },
               scales: {
                 y:       {
                   grid: {
                     color: "#474747"
                   },
                   ticks: {
                    color: "#a8a8a8"
                   }
                 }
                 ,
                 x: 
                   {
                     grid: {
                       color: "#474747"
                     },
                     ticks: {
                      color: "#a8a8a8"
                     }
                   }
               }
             }}
            data={{
               labels: finalResult.map((data) => data.date),
               datasets: [
                  {
                     label: "1",
                     data: finalResult.map((data) => data['1']),
                     backgroundColor: "#4275f5",
                     borderColor: "#4275f5",
                  },
                  {
                    label: "2",
                    data: finalResult.map((data) => data['2']),
                    backgroundColor: "#ed214a",
                    borderColor: "#ed214a",
                 },
                 {
                    label: "3",
                    data: finalResult.map((data) => data['3']),
                    backgroundColor: "#ed9821",
                    borderColor: "#ed9821",
                 }, 
                 {
                    label: "4",
                    data: finalResult.map((data) => data['4']),
                    backgroundColor: "#21ed6f",
                    borderColor: "#21ed6f",
                 },
                 {
                    label: "5",
                    data: finalResult.map((data) => data['5']),
                    backgroundColor: "#9121ed",
                    borderColor: "#9121ed",
                 },
                 {
                  label: "6",
                  data: finalResult.map((data) => data['6']),
                  backgroundColor: "#70f1ff",
                  borderColor: "#70f1ff",
                 },                                                    
               ],
            }}
         />
       </div>

      </div>
      )
   }