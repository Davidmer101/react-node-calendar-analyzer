import useFetch from "../useFetch";
import '../App.css'
import * as myDate from '../date.js';
import {Link, Outlet} from 'react-router-dom'
// copied from weekly.js
import React, {useState} from "react"
import { useTable } from 'react-table'
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import { Calendar } from "react-modern-calendar-datepicker";
import {CalendarView, Productivity} from './Views.js';
import CalName from './CalName.js'

  let Daily = (props) => {
      let [day, setDay] = useState(props.day)
      let requestData =  useFetch(`/api/daily/${day.toDateString()}`)
      let data= null
      let dataMapped = null
      let dateRange = day
      if(requestData) {
        data = requestData.records
        dataMapped = data.map(addLink)
        if (data.length > 0) {
          dateRange = new Date(data[0].id)
        }
      
      } else {
        // alert('no data stored for this day')
        dateRange =  day
      }

      let adjustDay = (e) => {
        if(e.target && e.target.id) {
          if (e.target.id == 'right-arrow') {
            let dayUpdated = myDate.updateDate(new Date(day), 1)
            setDay(dayUpdated)
          } else if (e.target.id == 'left-arrow') {
            let dayUpdated = myDate.updateDate(new Date(day), -1)
            setDay(dayUpdated)
         }
        } else {
          //make date
          let date =  new Date(`${e.year}, ${e.month}, ${e.day}`)
          // update date
          setDay(date)
        }
      }
      // alert('data is: ' + JSON.stringify(data) + "\n dataMapped is: " + JSON.stringify(dataMapped))
      return(
          <div class = 'columns'>
            <CalendarView dataC={dataMapped}/>
            <div class='column'>
              <Outlet />
            </div>
            <Summaries onClick = {e => adjustDay(e)} dateRange = {dateRange} />
            <Productivity data = {data}/>
          </div>
      )   
  }
// {/* <h2 >{requested.date.slice(11)}</h2> */}

function addLink (calData) {
  let calLinked = 
      <Link 
        to = {`/daily/calendar?calName=${calData.calName}&dateRange=${calData.id}`}
        key={calData.calName}
      >
        {calData.calName}
      </Link>
  return {
    calName: calLinked,
    totalHours: calData.totalHours
  }
}
 
  function  ViewButtons (props) {
    return(
          <div class='buttons has-addons '>
            <button class = "button" > Graph </button>
            <button  value = "table" class = 'button is-selected' onClick = {(event) => handleViewButton(props.type, event.target.value)}> Table</button>
            <button class='button'> Text </button>
          </div>
    )
  }

  let handleViewButton = (type, selected) => {
    if (type == "calendar") {
      alert('in ' + type + ' view ' + selected  +  ' is selected.')
    }
  }

  
  
  let Summaries = (props) => {
    let date = props.dateRange
    let info = ''
    if(date.getDate() == (myDate.updateDate((new Date()), - 1)).getDate()) {
      // alert('yesterday')
      info = 'yesterday'
    } else if(date.getDate() == (new Date()).getDate() ){
      // alert('today')
      info = `today`
    } else if (date.getDate() == (myDate.updateDate((new Date()), 1)).getDate()) {
      info = `tomorrow`
    }
    let options = {weekday: "short",  month: "short", day: "numeric", year: "numeric"}
    return (
      <div class = 'column is-centered'>
        <h2>{info} </h2>
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
    
    let date = props.dateRange
    // year not necessary
    // if same month don't repeat month on weekEndsOn

    let options = {weekday: "short",  month: "short", day: "numeric"}
    date = date.toLocaleDateString("en-US", options)
    
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
            <span id="viewing"> <strong>{date} </strong></span>
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
    //  // ✅ a change in default state: { from: ..., to: ... }
    const defaultValue = {
      year: props.dateRange.getFullYear(),
      month: props.dateRange.getMonth() + 1,
      day: props.dateRange.getDate(),
    };
    const [selectedDay, setSelectedDay] = useState(defaultValue);

    return (
      <Calendar
      value={defaultValue}
      onChange={props.onClick}
      colorPrimary="#9c88ff" // added this
      calendarClassName="custom-calendar" // and this
      calendarTodayClassName="custom-today-day" // also this
      shouldHighlightWeekends
    />
    );
  }

 //



  const DailyPrevious = (requested) => {
    let tomorrow = (myDate.updateDate((new Date()), 1)).toDateString()
    let today = (new Date()).toDateString()
    let today_1 = (myDate.updateDate((new Date()), -1)).toDateString()
    let today_2 = (myDate.updateDate((new Date()), -2)).toDateString()
    let today_3 = (myDate.updateDate((new Date()), -3)).toDateString()
    let today_4 = (myDate.updateDate((new Date()), -4)).toDateString()
    let today_5 = (myDate.updateDate((new Date()), -5)).toDateString()
    let today_6 = (myDate.updateDate((new Date()), -6)).toDateString()
     {/* <Day date={`/api/daily/${today_6}`}/>
            <Day date={`/api/daily/${today_5}`}/> 
            <Day date={`/api/daily/${today_4}`}/>
            <Day date={`/api/daily/${today_3}`}/>
            <Day date={`/api/daily/${today_2}`}/>
            <Day date={`/api/daily/${today_1}`}/>
            <Day date={`/api/daily/${today}`}/>
            <Day date={`/api/daily/${tomorrow}`}/> */}
    return(
          <table class="table is-bordered is-striped is-narrow"> 
            <tr class='tc'> <Day date={`/api/daily/${today_6}`}/> </tr>
            <tr class='tc'> <Day date={`/api/daily/${today_5}`}/> </tr>
            <tr class='tc'> <Day date={`/api/daily/${today_4}`}/> </tr>
            <tr class='tc'> <Day date={`/api/daily/${today_3}`}/> </tr>
            <tr class='tc'> <Day date={`/api/daily/${today_2}`}/> </tr>
            <tr class='tc'> <Day date={`/api/daily/${today_1}`}/> </tr>
            <tr class='tc'> <Day date={`/api/daily/${today}`}/> </tr>
            <tr class='tc'> <Day date={`/api/daily/${tomorrow}`}/> </tr>
           

 
               
          </table>
    )
  }
// {/* <h2 >{requested.date.slice(11)}</h2> */}

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
          editedData.records[i] = {calName: calNames[i], TotalHours: 0}
        }
      }

      alert('edited data is ' + JSON.stringify(editedData))
      return (
        <>
          <th class='tc' >{requested.date.slice(0,11)}</th>
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
  
      return <td  class='tc'> {record.calName} : {Math.round(record.TotalHours * 100)/100} </td>
      }
        


    let handleEventNames = () => {
      alert('there')
    }

    function roundTo1Decimals(number) {
      return Math.round(number*10)/10
    }
  export default Daily;