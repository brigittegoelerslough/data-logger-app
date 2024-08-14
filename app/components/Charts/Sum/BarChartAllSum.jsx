"use client";

import { Chart as ChartJS, defaults } from "chart.js/auto"
import {Bar, Doughnut, Line } from "react-chartjs-2"

import React from "react";
// import "./style.css";
// import { Bar } from "react-chartjs-2";

export default function BarChartAllSum(things){

   const finalResult = things.things
   // console.log('SUM FINAL', finalResult)
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
      <div>
       <div>
         <Bar 
            style={{
              height: chartheight ,
              width: '100%'
            }}
            options= {{
              maintainAspectRatio: false,
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