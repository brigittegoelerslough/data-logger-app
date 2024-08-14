import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';

import {
    Chart as ChartJs,
    LineElement,
    TimeScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
} from 'chart.js';
import { max } from 'date-fns';
import { createDatesTotals } from '@/app/functions/actions';

ChartJs.register(
    LineElement,
    TimeScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

export default function LineChartWeek(things) {

    const thingsData = things.data[0]
    const chosenDate = things.data[1]
    const chartheight = things.data[2]

    const maximumDate = chosenDate;
    var day = 60 * 60 * 24 * 1000;
    const minimumDate = new Date(maximumDate.getTime() - (7 * day))

    let sortable = [];
    for (var key in thingsData) {
        var item = thingsData[key]
        var day = new Date(item['created_at'])
        if (day > minimumDate && day < maximumDate) {
            sortable.push([day, item['amount']]);
        }
    }

    sortable.sort(function(a, b) {
        return a[0] - b[0];
    });

    let res = createDatesTotals(sortable, minimumDate, maximumDate)
    const dates = res[0]
    const totals = res[1]
    
    const data = {
        labels: dates,
        datasets: [
            {
                label: 'Amount',
                data: totals,
                // backgroundColor: 'aqua',
                backgroundColor: 'rgba(255, 0, 0, 0.3',
                borderColor: 'red',
                borderWidth: 3,
                pointStyle: 'circle',
                pointRadius: 6,
                pointHoverRadius: 10,
                pointBorderWidth: 1,
                // tension: 0.4
                // stepped: true
            }
        ]
    }

    const options = {
        maintainAspectRatio: false,
        aspectRatio: 1,
        scales: {
            y: {
                // beginAtZero: true
            },
            x: {
                type: 'time',
                time: {
                    unit: 'day'
                },
                // max: maximumDate,
                // min: minimumDate
            }
        }
    }

    return (
        <div style={{height: chartheight}}>
            <Line       
                data = {data}
                options = {options}
            />
        </div>
    )
}