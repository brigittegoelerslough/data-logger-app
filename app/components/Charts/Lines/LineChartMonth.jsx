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
import { createDatesTotals } from '@/app/functions/actions';

ChartJs.register(
    LineElement,
    TimeScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

export default function LineChartMonth(things) {

    const thingsData = things.data[0]
    const chosenDate = things.data[1]
    const chartheight = things.data[2]

    const chosenMonth = chosenDate.toISOString().substring(5,7)
    const chosenYear = chosenDate.toISOString().substring(0,4)

    if (chosenMonth === '02' && chosenYear % 4 == 0){
        var num_days = 29
    } else if (chosenMonth === '02'){
        var num_days = 28
    } else if (chosenMonth === '09' || chosenMonth === '04' || chosenMonth === '06' || chosenMonth === '11'){
        var num_days = 30
    }  else {
        var num_days = 31
    }

    const maxChosenDate = chosenYear + '-' + chosenMonth + '-' + num_days + 'T23:59:00'
    const minChosenDate = chosenYear + '-' + chosenMonth + '-01' + 'T00:00:00'
    var maximumDate = new Date(maxChosenDate);
    const minimumDate = new Date(minChosenDate);
    
    const today = new Date()
    if (maximumDate > today) {
        if (today.toISOString().substring(5,7) == chosenDate) {
            maximumDate = today
        }
    }

    let sortable = [];
    for (var key in thingsData) {
        var item = thingsData[key]
        if (item['created_at'].substring(5,7) == chosenMonth && item['created_at'].substring(0,4) == chosenYear) {
            var day = new Date(item['created_at'])
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