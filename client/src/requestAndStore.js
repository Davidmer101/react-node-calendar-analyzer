import axios from 'axios';
import * as myDate from './date.js';

export let starterURL = 'http://localhost:5500/' 
let calendarList = [];
let eventList = [];
let gapi = window.gapi; 

// async function loadAndInitGapi() {
//   await gapi.load('client:auth2', initClient);

//   

// }

/**
 * for each calendar request events between dayBehind and dayAhead dates
 * @param {date} dayBehind 
 * @param {date} dayAhead 
 */
   export async function listOfCalendars(dayBehind, dayAhead) {
    try {
      if(!(gapi.client.calendar)) {  //if undefined load it first

        // await loadAndInitGapi()
      }
      let response = await gapi.client.calendar.calendarList.list({});
      let calendars = response.result.items;
      for(let i = 0; i< calendars.length; i++) {
          let calendar = calendars[i];
          calendarList.push(calendar.summary)
          await events('day', calendar.summary, calendar.id, dayBehind.toISOString(), dayAhead.toISOString());
        }
    } catch (error) {
      console.log('error in requestAndStore-> listOfCalendars ' + error.message);
    }
  }

  /**
 * for a given week, it adds up the hours for each calendar 
 * by making sure events that start the previos week or spans to the next week 
 * are correctly updated 
 * 
 * @param {string} timeId 
 * @param {string} calName 
 * @param {*} calId 
 * @param {dateISOString} minDate 
 * @param {dateISOString} maxDate 
 * 
 * Eventually, it will populate @object weeklyData and call @function sendToServer() 
 */
 async function events(timeId, calName, calId, minDate, maxDate) {

  try {
    let response = await gapi.client.calendar.events.list({
      'calendarId': calId,
      'singleEvents': true,
      // 'orderBy': 'startTime',
      'timeZone': myDate.timeZone(new Date().toString()),
      'timeMin': minDate,
      'timeMax': maxDate,
      'maxResults': 2400,
      
  });

  const events = response.result.items;
  for(const event of events) {
    await filterAndPost(event, calName)    
  }

  } catch (error) {
    console.log('error in requestAndStore-> events: ' + error.message)
  }
 }

 /**
  * filters events and sends them to backend to be stored in db
  * @param {google event Object} event 
  * @param {String} calName 
  * @returns 
  */
 async function filterAndPost(event, calName) {
   if (event.summary !== undefined && !event.start.date) { // ignores undefined and all day events
    if (!(eventList.includes(event.summary))) {
      eventList.push(event.summary)
    }
    let eventStartsAt = new Date(event.start.dateTime);
    let eventEndsAt = new Date(event.end.dateTime);
    let eventDuration =  roundTo2Decimals(myDate.timeBetween(eventStartsAt, eventEndsAt).hours)

    //if event goes to the next day break it into to events upto 11:59:59 and 12 after that
    if (eventStartsAt.getDate() !== eventEndsAt.getDate()) {
      let dayEndsAt = (new Date(eventStartsAt))
      dayEndsAt.setHours(23, 59, 59)
      let nextDayStartsAt = (new Date(eventEndsAt));
      nextDayStartsAt.setHours(0,0,0)
      let weekNum1 = myDate.weekNumber(eventStartsAt)
      let weekNum2 = myDate.weekNumber(eventEndsAt)
      let monthNum1 = eventStartsAt.getMonth()
      let monthNum2 = eventEndsAt.getMonth()
      let eventDuration1 = roundTo2Decimals(myDate.timeBetween(eventStartsAt, dayEndsAt).hours)
      let eventDuration2 = roundTo2Decimals(myDate.timeBetween(nextDayStartsAt, eventEndsAt).hours)
      await sendPost(eventStartsAt.toDateString(), event.summary, eventStartsAt, dayEndsAt, calName, event.description, eventDuration1, weekNum1, monthNum1, eventStartsAt.getFullYear())
      await sendPost(eventEndsAt.toDateString(), event.summary, nextDayStartsAt, eventEndsAt, calName, event.description, eventDuration2, weekNum2, monthNum2, eventEndsAt.getFullYear())
      
    } else {
      let weekNum = myDate.weekNumber(eventStartsAt)
      let monthNum = eventStartsAt.getMonth()
      await sendPost(eventStartsAt.toDateString(), event.summary, eventStartsAt, eventEndsAt, calName, event.description, eventDuration, weekNum, monthNum, eventStartsAt.getFullYear())
    }
    
   }

    return 
}

 export async function sendPost(id, eventName, startTime, endTime, calName, description, duration, weekNum, monthNum, yearNum){
  try {
   let result = await axios ({
     method: 'post',
     url: `${starterURL}api/daily/`,
     data: {
        "id": id,
        "eventName": eventName,
        "startTime": startTime,
        "endTime": endTime,
        "calName": calName,
        "description": description,
        "duration": duration,
        "weekNum": weekNum,
        "monthNum": monthNum,
        "yearNum": yearNum
     }
     
 })
 return result
//  alert(JSON.stringify(result))
  } catch (error) {
    console.log('error in requestAndStore-> sendPost: ' + error.message)
  }
 }

 export function roundTo2Decimals(number) {
   return Math.round(number*100)/100
 }