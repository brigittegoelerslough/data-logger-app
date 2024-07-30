"use client";

import { Chart as ChartJS, defaults } from "chart.js/auto"
import {Bar, Doughnut, Line } from "react-chartjs-2"
import revenueData from "./revenueData.json"

// defaults.maintainAspectRatio = false;
// defaults.responsive = true;

// defaults.plugins.title.display = true;
// defaults.plugins.title.align = "middle";
// defaults.plugins.title.font.size = 20;
// defaults.plugins.title.color = "white";

export default function BarChartEx(things){
   return (
       <div>
         <Bar 
            data={{
               labels: revenueData.map((data) => data.label),
               datasets: [
                  {
                     label: "Revenue",
                     data: revenueData.map((data) => data.revenue),
                     backgroundColor: "#064FF0",
                     borderColor: "#064FF0",
                  },
                  {
                     label: "Cost",
                     data: revenueData.map((data) => data.cost),
                     backgroundColor: "#FF3030",
                     borderColor: "#FF3030",
                  },
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
      )
   }

// export default function BarChart5(things){
//    const thingsData = things.things.things
//    const days = Object.groupBy(thingsData, ({created_date}) => created_date)
//    // console.log(thingsData)
//    // console.log(days)
//    return (
//       <div>
//        <div>
//          <Bar 
//             data={{
//                // labels: revenueData.map((data) => data.label),
//                labels: thingsData.map((data) => data.id),
//                datasets: [
//                   {
//                      // label: "Revenue",
//                      // data: revenueData.map((data) => data.revenue),
//                      data: thingsData.map((data) => data.amount),
//                      backgroundColor: "#cafc03",
//                      borderColor: "#cafc03",
//                   },
//                   // {
//                   //    label: "Cost",
//                   //    // data: revenueData.map((data) => data.cost),
//                   //    data: thingsData.map((data) => data.amount),
//                   //    backgroundColor: "#fc4503",
//                   //    borderColor: "#fc4503",
//                   // },
//                ],
//             }}
//             options={{
//                elements:{
//                   line: {
//                      // tension: 0.5,
//                   }
//                },
//                plugins: {
//                   title: {
//                      text: "Monthly Revenue and Cost"
//                   }
//                }
//             }}
//          />
//        </div>

//       </div>
//       )
//    }