"use client";

import { Chart as ChartJS, defaults } from "chart.js/auto"
import {Bar, Doughnut, Line } from "react-chartjs-2"

export default function BarChartWeekSum(things){

  const finalResult = things.data[0]
  const date = things.data[1]
  // console.log(date.toISOString().split('T')[0], finalResult)
  const datestring = date.toISOString().split('T')[0]
  var mmddyyyy = datestring.substring(5,7) + '/' + datestring.substring(8,10) + '/' + datestring.substring(0,4);
  // console.log(mmddyyyy, finalResult)

  const lasti = Object.keys(finalResult).findIndex(x => x == mmddyyyy)

  //  const last_week_keys = Object.keys(finalResult).slice(-7)
  if (lasti == -1) {
    var last_week_keys = []
  } else {
    var last_week_keys = Object.keys(finalResult).slice(lasti-7, lasti)
  }
   const lastWeek = {}
   for (const key in last_week_keys) {
    const day = last_week_keys[key]
    lastWeek[day] = finalResult[day]
   }

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
         />
       </div>

      </div>
      )
   }