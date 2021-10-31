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

