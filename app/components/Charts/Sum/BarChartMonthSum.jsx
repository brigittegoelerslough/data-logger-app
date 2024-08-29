"use client";

import { Bar } from "react-chartjs-2";

export default function BarChartMonthSum(things) {
  const finalResult = things.data[0];
  const chooseMonth = things.data[1];
  const chartheight = things.data[2];

  const month = chooseMonth.toISOString().substring(5, 7);
  const year = chooseMonth.toISOString().substring(0, 4);
  var dates = [];
  var values = [];
  for (const key of Object.keys(finalResult)) {
    if (key.substring(0, 2) == month && key.substring(6, 10) == year) {
      dates.push(key);
      values.push(finalResult[key]);
    }
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
            labels: dates,
            datasets: [
              {
                label: "Ammount",
                data: values,
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
