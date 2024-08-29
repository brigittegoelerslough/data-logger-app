"use client";

import { Bar } from "react-chartjs-2";

export default function BarChartEmpty() {
  var chartheight = "100%";
  if (self.innerWidth < 750) {
    chartheight = 350;
  } else if (self.innerWidth < 1023) {
    chartheight = "100%";
  } else if (self.innerWidth < 1500) {
    chartheight = 550;
  } else {
    chartheight = "100%";
  }
  return (
    <div>
      <div>
        <Bar
          style={{
            height: chartheight,
            width: "100%",
          }}
          data={{
            datasets: [
              {
                label: "Amount",
                data: [],
                backgroundColor: "rgba(0, 0, 0, 0)",
                borderColor: "rgba(0, 0, 0, 0)",
              },
            ],
          }}
          options={{
            elements: {
              line: {
              },
            },
            plugins: {
              title: {
                text: "Monthly Revenue and Cost",
              },
            },
          }}
        />
      </div>
    </div>
  );
}
