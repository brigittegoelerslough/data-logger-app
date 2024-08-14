// For Both
export function groupByReduce (object, field) {
    return object.reduce((x,y) => {
        (x[y[field]] = x[y[field]] || []).push(y);
        return x;
    } , {});
}

export function convertToMMDDYYYY (dateObj) {
    const datestring = dateObj.toISOString()
    
    if (datestring[5] == 0 && datestring[8] == 0){
        var mmddyyyy = datestring.substring(6,7) + '/' + datestring.substring(9,10) + '/' + datestring.substring(0,4);
    } else if (datestring[5] == 0) {
        var mmddyyyy = datestring.substring(6,7) + '/' + datestring.substring(8,10) + '/' + datestring.substring(0,4);
    } else if (datestring[8] == 0) {
        var mmddyyyy = datestring.substring(5,7) + '/' + datestring.substring(9,10) + '/' + datestring.substring(0,4);
    } else{
        var mmddyyyy = datestring.substring(5,7) + '/' + datestring.substring(8,10) + '/' + datestring.substring(0,4);
    }

    return mmddyyyy
}

export function fillInDates (dataObj) {
    const dates = [];
    for (const day in dataObj){
        dates.push(new Date(day))
    }
    const minimumDate = new Date(Math.min.apply(null, dates));
    const maximumDate = new Date();

    var new_dates = []
    let i = minimumDate.getTime();
    do {
        let date = new Date(i);
        new_dates.push(date)
        i += 86400000;
    } while (i <= maximumDate);

    return new_dates
}

export function fillInObject (dates, oldDataObj, noData) {
    let finalResult = {};
    dates.forEach(date => {
        var datestring = date.toISOString().split('T')[0]
        var mmddyyy = datestring.substring(5,7) + '/' + datestring.substring(8,10) + '/' + datestring.substring(0,4);
            if(!oldDataObj.hasOwnProperty(datestring)) {
                finalResult[mmddyyy] = noData;
            } else {
                finalResult[mmddyyy] = oldDataObj[datestring];
            }
    });
    return finalResult;
}

// For Sum
export function sumData (dataObj) {
    const summedData = {}
    for (const day in dataObj){
        var counter=0
        for (const item in day){
           try {
           counter += dataObj[day][item]['amount']
           } catch(e) {{}}
        }
        summedData[day] = counter;
     };
     return summedData;
}


// For Breakdown
export function groupByAmmount (dataObj) {
    let res = {};
    for (const key in dataObj){
        const amounts = dataObj[key].reduce((x,y) => {
          (x[y.amount] = x[y.amount] || []).push(y);
          return x;
          } , {});
          res[key] = amounts
       };
    return res;
}

export function objPerDate (dataObj) {
    let res = [];
    for (const key in dataObj){
        var obj = {};
        obj['date'] = key;
        var total = 0;
        for (const key2 in dataObj[key]) {
           const len = Object.keys(dataObj[key][key2]).length
           const mult = parseInt(key2) * len
           obj[key2] = mult
           total += mult;
        }
        obj['total'] = total;
        total = 0;
        const pos_amounts = ['1', '2', '3', '4', '5', '6']
        for (const i of pos_amounts) {
           if (!Object.keys(obj).includes(i)){
                 obj[i] = 0
           }
        }
        res.push(obj)
        obj = {}
     }
    return res;
}


// For Line
export function createDatesTotals (dataObj, minimumDate, maximumDate) {
    const dates = []
    const totals = []
    if (dataObj.length > 0) {
        dates.push(minimumDate)
        totals.push(0)
    }
    var sum = 0
    for (var entry of dataObj){
        dates.push(entry[0])
        sum += entry[1]
        totals.push(sum)
    }
    if (sum > 0) {
        dates.push(maximumDate)
        totals.push(sum)
    } else {
        dates.push(minimumDate)
        dates.push(maximumDate)
    }
    return [dates, totals]
}

// Month Chooser
export function increaseMHelper(currDate) {
    var datestring = currDate.toISOString()
    var currMonth = parseInt(currDate.toISOString().substring(5,7));
    if (currMonth < 12) {
        currMonth += 1
        if (currMonth < 10) {
            var newDay = datestring.substring(0,4) + '-0' + currMonth + '-10' + datestring.substring(10,30)
        } else {
            var newDay = datestring.substring(0,4) + '-' + currMonth + '-10' + datestring.substring(10,30)
        }
    } else if (currMonth == 12) {
        var currYear = parseInt(datestring.substring(0,4))
        currYear += 1
        var newDay = currYear + '-01-10' + datestring.substring(10,30)
    } else {
        alert('error')
    }
    const nextMonth = new Date(newDay)
    return nextMonth
}

export function decreaseMHelper(currDate) {
    var datestring = currDate.toISOString()
    var currMonth = parseInt(currDate.toISOString().substring(5,7));
    if (currMonth > 1) {
        currMonth -= 1
        if (currMonth < 10) {
            var newDay = datestring.substring(0,4) + '-0' + currMonth + '-10' + datestring.substring(10,30)
        } else {
            var newDay = datestring.substring(0,4) + '-' + currMonth + '-10' + datestring.substring(10,30)
        }
    } else if (currMonth == 1) {
        var currYear = parseInt(datestring.substring(0,4))
        currYear -= 1
        var newDay = currYear + '-12-10' + datestring.substring(10,30)
    } else {
        alert('error')
    }
    const prevMonth = new Date(newDay)
    return prevMonth
}

export function displayMonth (currDate) {
    var months = [ "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December" ];
    var dispMonth = months[parseInt(currDate.toISOString().substring(5,7)) - 1];
    var dispYear = currDate.toISOString().substring(0,4);
    var dispDay = dispMonth + ' ' + dispYear
    return dispDay
}


