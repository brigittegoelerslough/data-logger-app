"use client";

import { Bar } from "react-chartjs-2";

export default function BarChartAllSum(things) {
  const finalResult = things.things[0];
  const chartheight = things.things[1];

  return (
    <div>
      <div>
        <Bar
          style={{
            height: chartheight,
            width: "100%",
          }}
          options={{
            maintainAspectRatio: false,
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
            labels: Object.keys(finalResult),
            datasets: [
              {
                label: "Ammount",
                data: Object.values(finalResult),
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
