"use client";

import { groupByReduce } from "@/app/functions/actions";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

export default function BarChartWeekBreakdown(things) {
  const thingsData = things.data[0];
  const chosenDate = things.data[1];
  const chartheight = things.data[2];

  const chosendatestring = chosenDate.toISOString().split("T")[0];
  var searchDate =
    chosendatestring.substring(5, 7) +
    "/" +
    chosendatestring.substring(8, 10) +
    "/" +
    chosendatestring.substring(0, 4);
  const lasti = Object.keys(thingsData).findIndex(
    (x) => thingsData[x]["date"] == searchDate,
  );
  var last_week_keys = Object.keys(thingsData).slice(lasti - 7, lasti);

  let finalResult = [];
  for (const key of last_week_keys) {
    finalResult.push(thingsData[key]);
  }

  return (
    <div>
      <div style={{ height: chartheight }}>
        <Bar
          options={{
            maintainAspectRatio: false,
            aspectRatio: 1,
            plugins: {
              legend: {
                labels: {
                  boxWidth: 35,
                },
              },
            },
            scales: {
              y: {
                grid: {
                  color: "#474747",
                },
                ticks: {
                  color: "#a8a8a8",
                },
              },
              x: {
                grid: {
                  color: "#474747",
                },
                ticks: {
                  color: "#a8a8a8",
                },
              },
            },
          }}
          data={{
            labels: finalResult.map((data) => data.date),
            datasets: [
              {
                label: "1",
                data: finalResult.map((data) => data["1"]),
                backgroundColor: "#4275f5",
                borderColor: "#4275f5",
              },
              {
                label: "2",
                data: finalResult.map((data) => data["2"]),
                backgroundColor: "#ed214a",
                borderColor: "#ed214a",
              },
              {
                label: "3",
                data: finalResult.map((data) => data["3"]),
                backgroundColor: "#ed9821",
                borderColor: "#ed9821",
              },
              {
                label: "4",
                data: finalResult.map((data) => data["4"]),
                backgroundColor: "#21ed6f",
                borderColor: "#21ed6f",
              },
              {
                label: "5",
                data: finalResult.map((data) => data["5"]),
                backgroundColor: "#9121ed",
                borderColor: "#9121ed",
              },
              {
                label: "6",
                data: finalResult.map((data) => data["6"]),
                backgroundColor: "#70f1ff",
                borderColor: "#70f1ff",
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
