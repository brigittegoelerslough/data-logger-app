import {
    Chart as ChartJs,
    LineElement,
    // CategoryScale,
    TimeScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
} from 'chart.js';

import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';

ChartJs.register(
    LineElement,
    // CategoryScale,
    TimeScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

export default function LineChartMonth(things) {
    const thingsData = things.things

    let sortable = [];
    for (var key in thingsData) {
        var item = thingsData[key]
        var day = new Date(item['created_at'])
        sortable.push([day, item['amount']]);
    }

    sortable.sort(function(a, b) {
        return a[0] - b[0];
    });
    console.log('SORTED', sortable)

    const dates = []
    const totals = []
    var sum = 0
    for (var entry of sortable){
        // console.log(entry)
        dates.push(entry[0])
        sum += entry[1]
        totals.push(sum)
    }

    // const minimumDate = new Date(Math.min.apply(null, dates));
    // const maximumDate = new Date(Math.max.apply(null, dates));
    const maximumDate = new Date();
    const month = maximumDate.toISOString().substring(5,7);
    if (month === '02'){
       var num_days = 28
    } else if (month === '02' || month === '02' || month === '02' || month === '02'){
       var num_days = 30
    }  else {
       var num_days = 31
    }
    var day = 60 * 60 * 24 * 1000;
    const minimumDate = new Date(maximumDate.getTime() - (num_days * day))

    const data = {
        labels: dates,
        datasets: [
            {
                label: 'Amount',
                data: totals,
                // backgroundColor: 'aqua',
                backgroundColor: 'rgba(255, 0, 0, 0.3',
                borderColor: 'red',
                borderWidth: 4,
                pointStyle: 'circle',
                pointRadius: 6,
                pointHoverRadius: 10,
                pointBorderWidth: 1
                // tension: 0.4
            }
        ]
    }

    const options = {
        scales: {
            y: {
                // beginAtZero: true
            },
            x: {
                type: 'time',
                time: {
                    unit: 'day'
                },
                max: maximumDate,
                min: minimumDate
            }
        }
    }

    return (
        <div>
            <Line
                data = {data}
                options = {options}
            />
        </div>
    )
}