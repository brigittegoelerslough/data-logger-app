"use client";

import { Chart as ChartJS, defaults } from "chart.js/auto"
import {Bar, Doughnut, Line } from "react-chartjs-2"
import revenueData from "./ChartData/revenueData.json"

export default function BarChart3(things){

   const finalResult = things.things

   const last_week_keys = Object.keys(finalResult).slice(-7)
   const lastWeek = {}
   for (const key in last_week_keys) {
    const day = last_week_keys[key]
    lastWeek[day] = finalResult[day]
   }
   console.log(lastWeek)

   return (
      <div>
       <div>
         <Bar 
            data={{
               // labels: revenueData.map((data) => data.label),
               labels: Object.keys(lastWeek),
               datasets: [
                  {
                     label: "Ammount",
                     // data: revenueData.map((data) => data.revenue),
                     data: Object.values(lastWeek),
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
            options={{
               elements:{
                  line: {
                     // tension: 0.5,
                  }
               },
               plugins: {
                  title: {
                     text: "Monthly Revenue and Cost"
                  }
               }
            }}
         />
       </div>

      </div>
      )
   }