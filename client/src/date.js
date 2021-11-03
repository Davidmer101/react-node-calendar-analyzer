/**
 * @param {date, number}
 * @return {date} the new date shifted by the number 
 * example: updateDate(today, 1) gives you the next day
 */
 export function updateDate(currentDate, shift) {
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
  
  export function timeZone(string) {
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
   export function timeBetween (date1, date2) {
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
   export function weekNumber (date) {
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

  /**
 * when called on a date, it gives the date ex Date with date 15
 * @weekStart ex Sun 14
 * @weekEnd ex Sat 20
 */
export function weekSpan (date) {
    if(date.getDay() == 0) {
        let weekStart = `Sun ${date.getDate()}`
        let weekEnd = `Sat ${date.getDate() + 6}`
        return {weekStart, weekEnd}
    
    }
    // if(date.getDay() == 1) {date.weekStart = `Sun ${validityCheck(date,date.getDate()-1)}`, date.weekEnd = `Sat ${validityCheck(date,date.getDate() + 5)}`}
    // if(date.getDay() == 2) {date.weekStart = `Sun ${validityCheck(date,date.getDate()-2)}`, date.weekEnd = `Sat ${validityCheck(date,date.getDate() + 4)} ` }
    // if(date.getDay() == 3) {date.weekStart = `Sun ${validityCheck(date,date.getDate()-3)}`, date.weekEnd = `Sat ${validityCheck(date,date.getDate() + 3)}`}
    // if(date.getDay() == 4) {date.weekStart = `Sun ${validityCheck(date,date.getDate()-4)}`, date.weekEnd = `Sat ${validityCheck(date,date.getDate() + 2)}`}
    // if(date.getDay() == 5) {date.weekStart = `Sun ${validityCheck(date,date.getDate()-5)}`, date.weekEnd = `Sat ${validityCheck(date,date.getDate() + 1)}`}
    // if(date.getDay() == 6) {date.weekStart = `Sun ${validityCheck(date,date.getDate()-6)}`, date.weekEnd = `Sat ${date.getDate()}`}
}

