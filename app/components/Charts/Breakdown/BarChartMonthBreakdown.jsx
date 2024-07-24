"use client";

import { Chart as ChartJS, defaults } from "chart.js/auto"
import {Bar, Doughnut, Line } from "react-chartjs-2"

export default function BarChartMonthBreakdown(things){

   var thingsData = things.things
//    console.log(thingsData)
   const days = Object.groupBy(thingsData, ({created_date}) => created_date)
//    console.log('DAYS:', Object.keys(days), days)
//    const amounts = Object.groupBy(thingsData, ({amount}) => amount)
//    console.log(amounts)

   const sortedData = Object.keys(days)
   .sort()
   .reduce((acc, key) => { 
      acc[key] = days[key];
      return acc;
   }, {});

   const dates = [];
   for (const day in sortedData){
      dates.push(new Date(day))
   }
   const minimumDate = new Date(Math.min.apply(null, dates));
   // const maximumDate = new Date(Math.max.apply(null, dates));
   const maximumDate = new Date();
   // var num_days = parseInt((maximumDate - minimumDate) / (1000 * 60 * 60 * 24), 10); 
   // var day = 60 * 60 * 24 * 1000;
   // const minimumDate = new Date(maximumDate.getTime() - (31 * day))

   //creating array with all dates (missing ones)
   var new_dates = []
   let i = minimumDate.getTime();
   do {
      let date = new Date(i);
      new_dates.push(date)
      i += 86400000;
   } while (i <= maximumDate);
   
   //filling in new object using old list and new missing dates filled in with 0
   let finalResult = {};
   new_dates.forEach(date => {
      var datestring = date.toISOString().split('T')[0]
      var mmddyyy = datestring.substring(5,7) + '/' + datestring.substring(8,10) + '/' + datestring.substring(0,4);
         if(!sortedData.hasOwnProperty(datestring)) {
            finalResult[mmddyyy] = [];
         } else {
            finalResult[mmddyyy] = sortedData[datestring];
         }
   });

   // console.log('111', finalResult)

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

   let finalResult2 = {};
//    console.log(Object.keys(finalResult))
   for (const key in lastMonth){
    // console.log(key, finalResult[key])
    const amounts = Object.groupBy(lastMonth[key], ({amount}) => amount)
    finalResult2[key] = amounts
   }
//    console.log('2: BREAKDOWN FINAL', finalResult2)


   let finalResult3 = [];
      for (const key in finalResult2){
        var obj = {};
        obj['date'] = key;
        var total = 0;
        for (const key2 in finalResult2[key]) {
            const len = Object.keys(finalResult2[key][key2]).length
            const mult = parseInt(key2) * len
            obj[key2] = mult
            total += mult;
        }
        obj['total'] = total;
        total = 0;
        const pos_amounts = ['1', '2', '3', '4', '5']
        for (const i of pos_amounts) {
            if (!Object.keys(obj).includes(i)){
                obj[i] = 0
            }
        }
        finalResult3.push(obj)
        obj = {}
      }
   //  console.log('3 BREAKDOWN FINAL', finalResult3)

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
            //    labels: Object.keys(finalResult),
               labels: finalResult3.map((data) => data.date),
               datasets: [
                  {
                     label: "1",
                     // data: revenueData.map((data) => data.revenue),
                     data: finalResult3.map((data) => data['1']),
                     backgroundColor: "#4275f5",
                     borderColor: "#4275f5",
                  },
                  {
                    label: "2",
                    // data: revenueData.map((data) => data.revenue),
                    data: finalResult3.map((data) => data['2']),
                    backgroundColor: "#ed214a",
                    borderColor: "#ed214a",
                 },
                 {
                    label: "3",
                    // data: revenueData.map((data) => data.revenue),
                    data: finalResult3.map((data) => data['3']),
                    backgroundColor: "#ed9821",
                    borderColor: "#ed9821",
                 }, 
                 {
                    label: "4",
                    // data: revenueData.map((data) => data.revenue),
                    data: finalResult3.map((data) => data['4']),
                    backgroundColor: "#21ed6f",
                    borderColor: "#21ed6f",
                 },
                 {
                    label: "5",
                    // data: revenueData.map((data) => data.revenue),
                    data: finalResult3.map((data) => data['5']),
                    backgroundColor: "#9121ed",
                    borderColor: "#9121ed",
                 },
               //   {
               //    label: "total",
               //    // data: revenueData.map((data) => data.revenue),
               //    data: finalResult3.map((data) => data['total']),
               //    backgroundColor: "#ffffff",
               //    borderColor: "#ffffff",
               // },                                                        
               ],
            }}
            // options={{
            //    elements:{
            //       line: {
            //          // tension: 0.5,
            //       }
            //    },
            //    plugins: {
            //       title: {
            //          text: "Monthly Revenue and Cost"
            //       }
            //    }
            // }}
         />
       </div>

      </div>
      )
   }