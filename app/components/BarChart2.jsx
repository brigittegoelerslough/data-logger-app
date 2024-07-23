"use client";

import { Chart as ChartJS, defaults } from "chart.js/auto"
import {Bar, Doughnut, Line } from "react-chartjs-2"
import revenueData from "./ChartData/revenueData.json"

export default function BarChart2(things){

   const finalResult = things.things

   return (
      <div>
       <div>
         <Bar 
            data={{
               // labels: revenueData.map((data) => data.label),
               labels: Object.keys(finalResult),
               datasets: [
                  {
                     label: "Ammount",
                     // data: revenueData.map((data) => data.revenue),
                     data: Object.values(finalResult),
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