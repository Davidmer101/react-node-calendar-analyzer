import axios from 'axios';
import * as myDate from './date.js';

export let starterURL = 'http://localhost:5000/' 
let calendarList = [];
let eventList = [];
let gapi = window.gapi; 
let numberOfEvents = 0

   export async function listOfCalendars(dayBehind, dayAhead) {
    try {
      let response = await gapi.client.calendar.calendarList.list({});
      let calendars = response.result.items;
      for(let i = 0; i< calendars.length; i++) {
          let calendar = calendars[i];
          calendarList.push(calendar.summary)
          events('day', calendar.summary, calendar.id, dayBehind.toISOString(), dayAhead.toISOString());
          
        }
    } catch (error) {
      alert('error in requestAndStore-> listOfCalendars ' + error.message);
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

  //  console.log(`called with ${timeId}, ${calName}, ${new Date(minDate).toLocaleString()}, ${new Date(maxDate).toLocaleString()}`)
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
  let requestFrom = new Date(minDate);
  let requestUpTo = new Date(maxDate);
  // console.log('sleep requesting from: ' + requestFrom + ' upto ' + requestUpTo);
  events.forEach((event) => {

      numberOfEvents++;
      console.log('num of events is: '+ numberOfEvents)
    //  console.log(event.summary + ':' + new Date(event.start.dateTime).toLocaleString() + ':' + new Date(event.end.dateTime).toLocaleString() + ':' + calName + ':' + 3 + ':' + 3)
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
        // alert('event start and end dates respectively: ' + eventStartsAt.getDate() + ' and ' + eventEndsAt.getDate())
        // alert("eventStartsAt: " + eventStartsAt.toLocaleString() + " AND " + 'eventEndsAt: ' + eventEndsAt.toLocaleString())
        // alert('dayEndsAt: ' + dayEndsAt.toLocaleString())
        // alert('nextdayStartsAt: ' + nextDayStartsAt.toLocaleString())
        //seperate into two events 
        // console.log(event.summary + ':' + eventStartsAt.toLocaleString() + ':' + dayEndsAt.toLocaleString() + ':' + calName + ':' + 3 + ':' + 3)
        // console.log(event.summary + ':' + dayStartsAt.toLocaleString() + ':' + eventEndsAt.toLocaleString() + ':' + calName + ':' + 3 + ':' + 3)
        let weekNum1 = myDate.weekNumber(eventStartsAt)
        let weekNum2 = myDate.weekNumber(eventEndsAt)
        let monthNum1 = eventStartsAt.getMonth()
        let monthNum2 = eventEndsAt.getMonth()
        let eventDuration1 = roundTo2Decimals(myDate.timeBetween(eventStartsAt, dayEndsAt).hours)
        let eventDuration2 = roundTo2Decimals(myDate.timeBetween(nextDayStartsAt, eventEndsAt).hours)
        sendPost(eventStartsAt.toDateString(), event.summary, eventStartsAt, dayEndsAt, calName, event.description, eventDuration1, weekNum1, monthNum1)
        sendPost(eventEndsAt.toDateString(), event.summary, nextDayStartsAt, eventEndsAt, calName, event.description, eventDuration2, weekNum2, monthNum2)
        // console.log(eventStartsAt.toDateString(), event.summary, eventStartsAt.toDateString(), dayEndsAt.toDateString(), calName, event.description, eventDuration1, weekNum1, monthNum1)
        // console.log('second Shift')
        // console.log(eventEndsAt.toDateString(), event.summary, nextDayStartsAt.toDateString(), eventEndsAt.toDateString(), calName, event.description, eventDuration2, weekNum2, monthNum2)

      } else {
        let weekNum = myDate.weekNumber(eventStartsAt)
        let monthNum = eventStartsAt.getMonth()
        // console.log(event.summary + ':' + eventStartsAt.toLocaleString() + ':' + eventEndsAt.toLocaleString() + ':' + calName + ':' + 3 + ':' + 3)
        sendPost(eventStartsAt.toDateString(), event.summary, eventStartsAt, eventEndsAt, calName, event.description, eventDuration, weekNum, monthNum)

      }
      
     }
  })
  
  } catch (error) {
    console.log(error)
    alert('error in requestAndStore-> events: ' + error.message)
  }
 }

 async function sendPost(id, eventName, startTime, endTime, calName, description, duration, weekNum, monthNum ){
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
        "monthNum": monthNum
     }
 })
//  alert(JSON.stringify(result))
  } catch (error) {
    alert('error in requestAndStore-> sendPost: ' + error.message)
  }
 }

 function roundTo2Decimals(number) {
   return Math.round(number*100)/100
 }
