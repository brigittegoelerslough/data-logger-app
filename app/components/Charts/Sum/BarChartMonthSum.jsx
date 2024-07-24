"use client";

import { Chart as ChartJS, defaults } from "chart.js/auto"
import {Bar, Doughnut, Line } from "react-chartjs-2"

export default function BarChartMonthSum(things){

   const finalResult = things.things

   const now = new Date();
   const month = now.toISOString().substring(5,7);
   if (month === '02'){
      var num_days = 28
   } else if (month === '02' || month === '02' || month === '02' || month === '02'){
      var num_days = 30
   }  else {
      var num_days = 31
   }

   const last_month_keys = Object.keys(finalResult).slice(-num_days)
   const lastMonth = {}
   for (const key in last_month_keys) {
    const day = last_month_keys[key]
    lastMonth[day] = finalResult[day]
   }
   // console.log(lastWeek)

   return (
      <div>
       <div>
         <Bar 
            options= {{
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
               // labels: revenueData.map((data) => data.label),
               labels: Object.keys(lastMonth),
               datasets: [
                  {
                     label: "Ammount",
                     // data: revenueData.map((data) => data.revenue),
                     data: Object.values(lastMonth),
                     backgroundColor: "#13eda1",
                     borderColor: "#13eda1",
                  },
                  // {
                  //    label: "Cost",
                  //    // data: revenueData.map((data) => data.cost),
                  //    data: thingsData.map((data) => data.amount),
                  //    backgroundColor: "#fc4503",
                  //    borderColor: "#fc4503",
                  // },
               ],
            }}
         />
       </div>

      </div>
      )
   }