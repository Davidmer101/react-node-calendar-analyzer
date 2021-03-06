/**
 * @param {date, number}
 * @return {date} the new date shifted by the number 
 * example: updateDate(today, 1) gives you the next day
 */
  function updateDate(currentDate, shift) {
    if(shift < 0 && Math.abs(shift) > currentDate.getDate()) {
        currentDate.setMonth(currentDate.getMonth() - 1) 
        currentDate.setDate(currentDate.getDate() +  shift + daysInAMonth(currentDate.getMonth()));
        return currentDate;
    }
    currentDate.setDate(currentDate.getDate() +  shift);
    return currentDate; //updated date
  }
  
  
  /**
   * number days in a month
   * @param {number} month 
   * @returns {number} days in a month
   */
   function daysInAMonth (month) {
    let longMonths = ('0, 2, 4, 6, 7, 9, 11')
    if(longMonths.includes(month.toString())) {
        return 31;
    } else if(month === 2) {
        return 28;
    } else {
        return 30;
    }
  }
  
   function timeZone(string) {
    if(string.includes('Pacific')) {
        return 'America/Los_Angeles'
    } else if (string.includes('Eastern')) {
        return 'America/New_York'
    } else if (string.includes('Central')) {
        return 'America/Chicago'
    } else if (string.includes('Mountain')) {
        return 'America/Denver'
    } else if (string.includes('Alaska')) {
        return ('America/Anchorage')
    } else if (string.includes('Hawaii')) {
        return ('Pacific/Honolulu');
    } else {
        return ('Etc/GMT')
    }
  }
  
  /**
   * givent two dates, it gives the difference in ms, minutes, hours, days, and years.
   * 
   * @param date1 first day
   * @param date2  second day
   * 
   * @return Object date2 -date1 in {ms: ms, minutes: minutes, hours: hours, days: days, years: years}
   */
  function timeBetween (date1, date2) {
    let ms = date2.getTime() - date1.getTime();
    let minutes = ms/(1000*60);
    let hours = minutes/60;
    let days = hours/24;
    let weeks = Math.floor(days/7);
    let years = days/365;
    return {ms: ms, minutes: minutes, hours: hours, days: days, weeks:weeks, years: years};
  }
  
  /**
   * given a date retunrs the week number starting from 0
   * @param {Date Object} date 
   * @returns {integer} week number
   */
   function weekNumber (date) {
    let yearStarts = new Date(date.getFullYear(), 0, 1, 0, 0)
    let secondWeekStartsOn = secondWeekStarts(yearStarts)
    yearStarts.setDate(secondWeekStartsOn)
    let weekNum = timeBetween(yearStarts, date).weeks
    return weekNum + 1 //week starts from 0, 1, 2...
  }
  
  function secondWeekStarts(date) {
    return 8 - date.getDay()
  }

  /**
 * @param {Date} date
 * @param {number} days
 * @return {number} day updated incase it's below 0 or above number of dates in that month
 */
function validityCheck (date, day) {
    if(day < 0) {
        return day + daysInAMonth(date.getMonth() - 1)

    } else if (day > 23) {
        if(day > daysInAMonth(date.getMonth())) {
            return day - daysInAMonth(date.getMonth());
        } else {
            return day;
        }
    } else {
        return day;
        
    }
}

/** after this is getting weekly range */
function adjustDate(date) {
    let day = new Date(date).getDay();
    let shiftLeft = 0
    let shiftRight = 0
    if (day == 0){
        shiftRight = 6
    } else if (day == 1) {
        shiftLeft = -1
        shiftRight = 5
    } else if (day == 2) {
        shiftLeft = -2
        shiftRight = 4
    } else if (day == 3) {
        shiftLeft = -3
        shiftRight = 3
    } else if (day == 4) {
        shiftLeft = -4
        shiftRight = 2
    } else if (day == 5) {
        shiftLeft = -5
        shiftRight = 1
    } else if (day == 6) {
        shiftLeft = -6
    } else {
        alert('no shift made')
    }

    return{shiftLeft: shiftLeft, shiftRight: shiftRight}
}

 function oneWeek(date) {
    let shifts = adjustDate(date)
    let weekStartsOn = new Date(date)
    let weekEndsOn = new Date(date)
    weekStartsOn = updateDate(weekStartsOn, shifts.shiftLeft)
    weekEndsOn = updateDate(weekEndsOn, shifts.shiftRight)
    return {weekStartsOn: weekStartsOn, weekEndsOn: weekEndsOn}
}

let input = 'Mon Nov 29 2021'
let date = new Date(input)
let givenWeek = oneWeek(date)

/**
 * gives first and last day of months starting on the current month
 * @params {}
 */
function edgeDaysOfEachMonth () {
  //end of this month  ex: Nov 30
  let endOfCurrentMonth = adjustMonthDate(1, 0)
  //Aug Sep Oct Nov
  //three months ago Sept 1
  let startOfOneMonthAgo = adjustMonthDate(0, 1)
  let startOfTwoMonthsAgo = adjustMonthDate(-1, 1);
  let startOfThreeMonthsAgo = adjustMonthDate(-2, 1);
  let startOfSixMonthsAgo = adjustMonthDate(-5, 1)
  let startOfNineMonthsAgo = adjustMonthDate(-8, 1)
  let startOfTwelveMonthsAgo = adjustMonthDate(-11, 1)
//   let aYearAgo = new Date((new Date()).setYear(2020))
  let aYearAgo = adjustMonthDate(-12, (new Date).getDate())

  return {endOfCurrentMonth: endOfCurrentMonth, startOfOneMonthAgo: startOfOneMonthAgo, startOfTwoMonthsAgo:startOfTwoMonthsAgo ,startOfThreeMonthsAgo: startOfThreeMonthsAgo, startOfSixMonthsAgo, startOfNineMonthsAgo:startOfNineMonthsAgo, startOfTwelveMonthsAgo: startOfTwelveMonthsAgo, aYearAgo: aYearAgo}
}

/**
 * gives the last date or first date of a month found by shifting in the params
 * @param {number} shiftMonth  how much to shift month from current month
 * @param {number} day what date to set it
 * @returns 
 */
function adjustMonthDate(shiftMonth, day) {
    let date = new Date();
    date.setMonth(date.getMonth() + shiftMonth);
    date.setDate(day)

    return date
}

export {updateDate, timeZone, timeBetween, weekNumber, oneWeek, edgeDaysOfEachMonth}
