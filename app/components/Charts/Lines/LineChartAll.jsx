import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import {
  Chart as ChartJs,
  LineElement,
  TimeScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJs.register(LineElement, TimeScale, LinearScale, PointElement, Tooltip, Legend);

export default function LineChartAll(things) {
  const thingsData = things.things[0];
  const chartheight = things.things[1];

  let sortable = [];
  for (var key in thingsData) {
    var item = thingsData[key];
    var day = new Date(item["created_at"]);
    sortable.push([day, item["amount"]]);
  }

  sortable.sort(function (a, b) {
    return a[0] - b[0];
  });

  const dates = [];
  const totals = [];
  var sum = 0;
  for (var entry of sortable) {
    dates.push(entry[0]);
    sum += entry[1];
    totals.push(sum);
  }

  const minimumDate = new Date(Math.min.apply(null, dates));
  const maximumDate = new Date();

  dates.push(maximumDate);
  totals.push(sum);

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Amount",
        data: totals,
        // backgroundColor: 'aqua',
        backgroundColor: "rgba(255, 0, 0, 0.3",
        borderColor: "red",
        borderWidth: 3,
        pointStyle: "circle",
        pointRadius: 6,
        pointHoverRadius: 10,
        pointBorderWidth: 1,
        // tension: 0.4
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
    },
  };

  return (
    <div>
      <Line
        style={{
          height: chartheight,
          width: "100%",
        }}
        data={data}
        options={options}
      />
    </div>
  );
}
