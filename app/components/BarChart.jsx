"use client";

import { Chart as ChartJS, defaults } from "chart.js/auto"
import {Bar, Doughnut, Line } from "react-chartjs-2"
import revenueData from "./ChartData/revenueData.json"


// defaults.maintainAspectRatio = false;
// defaults.responsive = true;

// defaults.plugins.title.display = true;
// defaults.plugins.title.align = "middle";
// defaults.plugins.title.font.size = 20;
// defaults.plugins.title.color = "white";

export default function BarChart(things){
   return (
      <div>

       {/* <div>
         <Bar 
            data={{
               labels: ["A", "B", "C"],
               datasets: [
                  {
                     label: "Revenue",
                     data: [200, 300, 400]
                  },
                  {
                     label: "Loss",
                     data: [90, 80, 70]
                  },
               ],
            }}
            options={{
               plugins: {
                  title: {
                     text: "Revenue Sources"
                  }
               }
            }}
         />
       </div> */}

      {/* <div>
         <h1>Monthly Revenue and Cost</h1>
      </div> */}
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

      </div>
      )
   }