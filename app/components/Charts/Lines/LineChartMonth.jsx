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

   const thingsData = things.data[0]
   const chosenDate = things.data[1]

   const chosenMonth = chosenDate.toISOString().substring(5,7)
   const chosenYear = chosenDate.toISOString().substring(0,4)

   if (chosenMonth === '02'){
    var num_days = 28
    } else if (chosenMonth === '09' || chosenMonth === '04' || chosenMonth === '06' || chosenMonth === '11'){
        var num_days = 30
    }  else {
        var num_days = 31
    }
    // var day = 60 * 60 * 24 * 1000;
    // const minimumDate = new Date(maximumDate.getTime() - (num_days * day))
    const maxChosenDate = chosenYear + '-' + chosenMonth + '-' + num_days + 'T07:24:00'
    const minChosenDate = chosenYear + '-' + chosenMonth + '-01' + 'T00:00:00'
    var maximumDate = new Date(maxChosenDate);
    
    const today = new Date()
    if (maximumDate > today) {
        maximumDate = today
    }
    const minimumDate = new Date(minChosenDate);

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
    console.log('SORTED', sortable)

    const dates = []
    const totals = []
    if (sortable.length > 0) {
        dates.push(minimumDate)
        totals.push(0)
    }
    var sum = 0
    for (var entry of sortable){
        dates.push(entry[0])
        sum += entry[1]
        totals.push(sum)
    }
    if (sum > 0) {
        dates.push(maximumDate)
        totals.push(sum)
    }

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