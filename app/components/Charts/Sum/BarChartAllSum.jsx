"use client";

import { Chart as ChartJS, defaults } from "chart.js/auto"
import {Bar, Doughnut, Line } from "react-chartjs-2"

import React from "react";
// import "./style.css";
// import { Bar } from "react-chartjs-2";

const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 13, 15, 12, 13],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)"
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)"
      ],
      borderWidth: 1
    }
  ]
};

const options = {
  scales: {
    y:       {
      // grid: {
      //   color: "white"
      // },
      ticks: {
       color: "white"
      }
    }
    ,
    x: 
      {
        grid: {
          color: "white"
        },
        ticks: {
         color: "white"
        }
      }
  }
};

// export default function App() {
//   return (
//     <div>
//       <Bar data={data} options={options} />
//     </div>
//   );
// }

export default function BarChartAllSum(things){

   const finalResult = things.things
   // console.log('SUM FINAL', finalResult)

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
         />
       </div>

      </div>
      )
   }