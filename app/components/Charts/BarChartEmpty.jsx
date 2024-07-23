"use client";

import { Chart as ChartJS, defaults } from "chart.js/auto"
import {Bar, Doughnut, Line } from "react-chartjs-2"

// defaults.maintainAspectRatio = false;
// defaults.responsive = true;

// defaults.plugins.title.display = true;
// defaults.plugins.title.align = "middle";
// defaults.plugins.title.font.size = 20;
// defaults.plugins.title.color = "white";

export default function BarChartEmpty(){
   return (
      <div>
       <div>
         <Bar 
            data={{
               // labels: revenueData.map((data) => data.label),
               datasets: [
                  {
                     label: "Amount",
                     data: [],
                     backgroundColor: 'rgba(0, 0, 0, 0)',
                     borderColor: 'rgba(0, 0, 0, 0)',
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
