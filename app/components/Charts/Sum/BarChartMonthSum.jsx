"use client";

import { Chart as ChartJS, defaults } from "chart.js/auto"
import {Bar, Doughnut, Line } from "react-chartjs-2"

export default function BarChartMonthSum(things){

   const finalResult = things.data[0]
   const chooseMonth = things.data[1]

   // const now = new Date();
   // const month = now.toISOString().substring(5,7);
   // if (month === '02'){
   //    var num_days = 28
   // } else if (month === '02' || month === '02' || month === '02' || month === '02'){
   //    var num_days = 30
   // }  else {
   //    var num_days = 31
   // }
   // const last_month_keys = Object.keys(finalResult).slice(-num_days)
   // const lastMonth = {}
   // for (const key in last_month_keys) {
   //  const day = last_month_keys[key]
   //  lastMonth[day] = finalResult[day]
   // }

   // console.log(chooseMonth)
   // console.log(chooseMonth.toISOString())
   // console.log(finalResult)
   const month = chooseMonth.toISOString().substring(5,7)
   const year = chooseMonth.toISOString().substring(0,4)
   var dates = []
   var values = []
   for (const key of Object.keys(finalResult)) {
      if (key.substring(0,2) == month && key.substring(6,10) == year) {
         dates.push(key)
         values.push(finalResult[key])
      }
   }

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
               // labels: Object.keys(lastMonth),
               labels: dates,
               datasets: [
                  {
                     label: "Ammount",
                     // data: revenueData.map((data) => data.revenue),
                     // data: Object.values(lastMonth),
                     data: values,
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