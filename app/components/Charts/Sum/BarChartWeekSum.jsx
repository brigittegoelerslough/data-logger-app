"use client";

import { Bar } from "react-chartjs-2";

export default function BarChartWeekSum(things) {
  const finalResult = things.data[0];
  const date = things.data[1];
  const chartheight = things.data[2];

  const datestring = date.toISOString().split("T")[0];
  var mmddyyyy =
    datestring.substring(5, 7) +
    "/" +
    datestring.substring(8, 10) +
    "/" +
    datestring.substring(0, 4);

  const lasti = Object.keys(finalResult).findIndex((x) => x == mmddyyyy);

  if (lasti == -1) {
    var last_week_keys = [];
  } else {
    var last_week_keys = Object.keys(finalResult).slice(lasti - 7, lasti);
  }
  const lastWeek = {};
  for (const key in last_week_keys) {
    const day = last_week_keys[key];
    lastWeek[day] = finalResult[day];
  }

  return (
    <div>
      <div style={{ height: chartheight }}>
        <Bar
          options={{
            maintainAspectRatio: false,
            aspectRatio: 1,
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
            labels: Object.keys(lastWeek),
            datasets: [
              {
                label: "Ammount",
                data: Object.values(lastWeek),
                backgroundColor: "#13eda1",
                borderColor: "#13eda1",
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
