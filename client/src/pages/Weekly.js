import useFetch from "../useFetch";
import '../App.css'
import React, {useState} from "react"
import * as myDate from '../date.js';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import {CalendarView, Productivity} from './Views.js';
import { Calendar } from "react-modern-calendar-datepicker";


  let Weekly = (props) => {
      let [weekNum, setWeekNum] = useState(props.weekNum)
      let requestData =  useFetch(`/api/weekly/${weekNum}`)
      let data= null
      let dateRange =  {weekStartsOn: new Date('Sun Oct 31 2021'), weekEndsOn: new Date('Sat Nov 5 2021')}
      if(requestData) {
        data = requestData.records
        if(data.length > 0) {
          dateRange = myDate.oneWeek(data[0].id)
        }
      }

      let adjustWeek = (e) => {
        if(e.target && e.target.id) {
          if (e.target.id == 'right-arrow') {
            setWeekNum(weekNum + 1)
          } else if (e.target.id == 'left-arrow') {
            setWeekNum(weekNum - 1)
         }
        } else {
          //make date
          let date =  new Date(`${e.from.year}, ${e.from.month}, ${e.from.day}`)
          // find it's week num
          let weekNum = myDate.weekNumber(date)
          // update weekNum
          setWeekNum(weekNum)
          // alert('pressed is: ' + (JSON.stringify(e)))
          // alert(date.toLocaleDateString())
        }
      }

      return(
        <>
              <div class = 'columns'>
                <CalendarView dataC={data}/>
                <Summaries onClick = {e => adjustWeek(e)} dateRange = {dateRange} />
                <Productivity data = {data}/>
              </div>
              <div class ='column'>
                
              </div>
              <div class = 'columns'>
                <div class = 'column'>
                  <Day date={(dateRange.weekStartsOn).toDateString()} />
                </div>
                <div class ='column'>
                  <Day date={(myDate.updateDate(new Date(dateRange.weekStartsOn), 1 )).toDateString()} />
                </div>
                <div class ='column'>
                  <Day date={(myDate.updateDate(new Date(dateRange.weekStartsOn), 2 )).toDateString()} />
                </div>
                <div class ='column'>
                  <Day date={(myDate.updateDate(new Date(dateRange.weekStartsOn), 3 )).toDateString()} />
                </div>
                <div class ='column' >
                  <Day date={(myDate.updateDate(new Date(dateRange.weekStartsOn), 4 )).toDateString()} />
                </div>
                <div class ='column'>
                  <Day date={(myDate.updateDate(new Date(dateRange.weekStartsOn), 5)).toDateString()} />
                </div>
                <div class ='column'>
                  <Day date={(myDate.updateDate(new Date (dateRange.weekStartsOn), 6 )).toDateString()} />
                </div>
                  
              </div>
        </>
      )
  }
// {/* <h2 >{requested.date.slice(11)}</h2> */}

export let Summaries = (props) => {
  let date = new Date(props.dateRange.weekEndsOn)
  let weekNumber = myDate.weekNumber(date)
  let currentWeek = myDate.weekNumber(new Date())

  if(weekNumber == (currentWeek - 1)) {
    weekNumber = `${weekNumber} (previous week)`
  } else if(weekNumber == currentWeek ){
    weekNumber = `${weekNumber} (current week)`
  } else if (weekNumber == (currentWeek + 1)) {
    weekNumber = `${weekNumber} (next week)`
  }
  let options = {weekday: "short",  month: "short", day: "numeric", year: "numeric"}
  return (
    <div class = 'column is-centered'>
      <h2>  Your week {weekNumber} summary </h2>
      <DateRangeView 
        dateRange={props.dateRange} 
        onClick={props.onClick}
        style={{height:10}}/>
      
      <ShowCalendar onClick={props.onClick} dateRange={props.dateRange} />
      <p>Today's date is <strong>{new Date().toLocaleDateString("en-US", options)} </strong> , week {myDate.weekNumber(new Date())}  </p>
    </div>
  )
}

let DateRangeView = (props) => {
  
  let weekStartsOn = props.dateRange.weekStartsOn
  let weekEndsOn = props.dateRange.weekEndsOn
  // year not necessary
  // if same month don't repeat month on weekEndsOn

  let options = {weekday: "short",  month: "short", day: "numeric"}
  weekStartsOn = weekStartsOn.toLocaleDateString("en-US", options)
  
  weekEndsOn = weekEndsOn.toLocaleDateString("en-US", options)
  return(
    <div class="field has-addons is-centered">
        <p class="control">
        <button onClick={props.onClick} value= 'left' id="left-arrow" class="button"> 
          <span class="icon is-small">
            <i class="fas fa-arrow-circle-left"></i>
          </span>
        </button>
        </p>
        <p class="control">
        <button class="button textInside">
          <span id="viewing"> <strong>{weekStartsOn} </strong> to <strong> {weekEndsOn} </strong></span>
        </button>
        </p>
        <p class="control" >
        <button onClick={props.onClick} value = 'right' id="right-arrow" class="button">
          <span class="icon is-small">
            <i class="fas fa-arrow-alt-circle-right"></i>
        </span>
        </button>
        </p>
      </div>
  )
}
let ShowCalendar = (props) => {
   // ✅ a change in default state: { from: ..., to: ... }
   let weekStartsOn = props.dateRange.weekStartsOn
   let weekEndsOn = props.dateRange.weekEndsOn
  //  alert('show calendar: starts On: ' + weekStartsOn)
  //  alert('show calendar: ends on: ' + weekEndsOn)
   let defaultFrom = {
    year: weekStartsOn.getFullYear(),
    month: weekStartsOn.getMonth() + 1,
    day: weekStartsOn.getDate(),
  };
  let defaultTo = {
    year: weekEndsOn.getFullYear(),
    month: weekEndsOn.getMonth() + 1,
    day: weekEndsOn.getDate(),
  };
  // alert('show calendar: default From: ' + JSON.stringify(defaultFrom))
  // alert('show calendar: default to: ' + JSON.stringify(defaultTo))
  
  let defaultValue = {
    from: defaultFrom,
    to: defaultTo,
  };
  let [selectedDayRange, setSelectedDayRange] = useState(
    defaultValue
  );

  return (
    <Calendar
      value={defaultValue}
      onChange={props.onClick}
      colorPrimary="#0fbcf9" // added this
      colorPrimaryLight="rgba(75, 207, 250, 0.4)" // and this
      shouldHighlightWeekends
    />
  );
  // const defaultFrom = {
  //   year: 2021,
  //   month: 10,
  //   day: 31,
  // };
  // const defaultTo = {
  //   year: 2021,
  //   month: 11,
  //   day: 5,
  // };
  // const defaultValue = {
  //   from: defaultFrom,
  //   to: defaultTo,
  // };
  // const [selectedDayRange, setSelectedDayRange] = useState(
  //   defaultValue
  // );

  // return (
  //   <Calendar
  //     value={selectedDayRange}
  //     onChange={setSelectedDayRange}
  //     colorPrimary="#0fbcf9" // added this
  //     colorPrimaryLight="rgba(75, 207, 250, 0.4)" // and this
  //     shouldHighlightWeekends
  //   />
  // );
}


const Day =  (requested) => {
  // alert(requested.date)
  let data =  useFetch(`/api/daily/${requested.date}`)
  let calNames = ['Education', 'Entertainment', 'Life', 'MED', 'Work']
  let editedData = {records: []}
  // alert('data is '+ JSON.stringify(data))
  // data = {"records":[{"calName":"Education","TotalHours":1.25},{"calName":"Entertainment","TotalHours":1},{"calName":"Life","TotalHours":20.99972222222222}]}
  if(data) {
    let calendars = []
    data.records.map(record => {
      calendars.push( record.calName)
    })
    // alert(JSON.stringify( 'calendars are ' + calendars))
    // alert(calendars.includes("Education"))
    for(let i = 0; i < calNames.length; i++) {
    
      if(calendars.includes(calNames[i])) {
        data.records.forEach(record => {
          if (record.calName == calNames[i]) {
            editedData.records[i] = record
          }
        })
        
      } else {
        editedData.records[i] = {calName: calNames[i], totalHours: 0}
      }
    }

    // alert('edited data is ' + JSON.stringify(editedData))
    return (
      <>
        <th class='tc' style={{backgroundColor: "aliceblue"}} >{requested.date.slice(0,11)}</th>
        {editedData.records.map(
          (record) =>  <td  class='tc' style={{backgroundColor: "papayawhip"}}> {record.calName} : {Math.round(record.totalHours * 100)/100} </td>
        )}
      </>
    )
  } else {
    return 'Loading'
  }
  };
  const Week =  (requested) => {

    // alert(requested.date)
    let data =  useFetch(`/api/weekly/`)
    // productivity = {counter: [{productive: 0}, {neutral: 0}, {destructive: 0}], list:{productivityList: ["education", "med", "work", "tasks"], neturalList:["life"], destructiveList:['entertainment']}}
    let calNames = ['Education', 'Entertainment', 'Life', 'MED', 'Work']
    let editedData = {records: []}
    alert('data is '+ JSON.stringify(data))
    // data = {"records":[{"calName":"Education","totalHours":1.25},{"calName":"Entertainment","totalHours":1},{"calName":"Life","totalHours":20.99972222222222}]}
    if(data) {
      let calendars = []

      data.records.map(record => {
        calendars.push( record.calName)
      })
      // alert(JSON.stringify( 'calendars are ' + calendars))
      // alert(calendars.includes("Education"))
      for(let i = 0; i < calNames.length; i++) {
      
        if(calendars.includes(calNames[i])) {
          data.records.forEach(record => {
            if (record.calName == calNames[i]) {
              editedData.records[i] = record
              // measureProductivity(record.calName, record.totalHours)
            }
          })
          
        } else {
          editedData.records[i] = {calName: calNames[i], totalHours: 0, id: 0}
        }
      }

      // alert('edited data is ' + JSON.stringify(editedData))
      let str = ""
      str+= editedData.records[0].id
    //   
      return (
        <>
          <th class='tc' >{requested.date.slice(12)} ({str.slice(0,-5)})</th>
          {editedData.records.map(
            (record) =>  <td  class='tc'> {record.calName} : {Math.round(record.totalHours * 100)/100} </td>
          )}
        </>
      )
    } else {
      return 'Loading'
    }
    };
    
    let handleCalNames = (record, keys) => {
  
      return <td  class='tc'> {record.calName} : {Math.round(record.totalHours * 100)/100} </td>
      }
        


    let handleEventNames = () => {
      alert('there')
    }
  
  
    export default Weekly;