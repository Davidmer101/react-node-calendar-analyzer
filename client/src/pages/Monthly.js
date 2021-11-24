import useFetch from "../useFetch";
import {useState} from 'react'
import {TableView, Productivity} from './Views.js'
import * as myDate from '../date.js';
import { Calendar } from "react-modern-calendar-datepicker";

let Monthly = (props) => {
    let [monthNum, setMonthNum] = useState(props.monthNum)
    let requestData =  useFetch(`/api/monthly/${monthNum}`)
    let data = null
    let dateRange = new Date()
    if(requestData) {
        data = requestData.records
        if (data.length > 0) {
          dateRange = new Date(data[0].id)
        }
      } else {
        // alert('no data stored for this day')
        // dateRange =  day
      }

      let adjustMonth = (e) => {
        if(e.target && e.target.id) {
          if (e.target.id == 'right-arrow') {
            setMonthNum(monthNum + 1)
            dateRange.setMonth(dateRange.getMonth() + 1)
          } else if (e.target.id == 'left-arrow') {
            setMonthNum(monthNum - 1)
            dateRange.setMonth(dateRange.getMonth() - 1)
         }
        } else {
          //make date
          dateRange =  new Date(`${e.from.year}, ${e.from.month}, ${e.from.day}`)
          // find it's week num
          let monthNum = dateRange.getMonth()
          // update weekNum
          setMonthNum(monthNum)
          // alert('pressed is: ' + (JSON.stringify(e)))
          // alert(date.toLocaleDateString())
        }
      }

    return (
        <div class = 'columns'>
            {/* <TableView dataC={data}/> */}
            <MonthlyCalendarView onClick = {e => adjustMonth(e)} dateRange = {dateRange} />
            <Productivity data = {data}/>
          </div>
        )
}

export let MonthlyCalendarView = (props) => {
    let date = new Date(props.dateRange)
    let monthNumber = date.getMonth()
    let currentMonth = (new Date()).getMonth()
  
    if(monthNumber == (currentMonth - 1)) {
      monthNumber = `${monthNumber} (previous month)`
    } else if(monthNumber == currentMonth ){
        monthNumber = `${monthNumber} (current month)`
    } else if (monthNumber == (currentMonth + 1)) {
        monthNumber = `${monthNumber} (next month)`
    }
    let options = {weekday: "short",  month: "short", day: "numeric", year: "numeric"}
    return (
      <div class = 'column is-centered'>
        <h1>  Your month {monthNumber} summary </h1>
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
    
    // let weekStartsOn = props.dateRange.weekStartsOn
    // let weekEndsOn = props.dateRange.weekEndsOn
    // year not necessary
    // if same month don't repeat month on weekEndsOn
  
    let options = {month: "short", year: "numeric"}
    // weekStartsOn = weekStartsOn.toLocaleDateString("en-US", options)
    
    // weekEndsOn = weekEndsOn.toLocaleDateString("en-US", options)
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
            <span id="viewing"> <strong> {props.dateRange.toLocaleDateString('en-US', options)} </strong></span>
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
    //  let weekStartsOn = props.dateRange.weekStartsOn
    //  let weekEndsOn = props.dateRange.weekEndsOn
    //  alert('show calendar: starts On: ' + weekStartsOn)
    //  alert('show calendar: ends on: ' + weekEndsOn)
     let defaultFrom = {
      year: props.dateRange.getFullYear(),
      month: props.dateRange.getMonth() + 1,
      day: 1,
    };
    // get last date
    let nextDate = new Date(props.dateRange)
    nextDate.setMonth(props.dateRange.getMonth() + 1)
    nextDate.setDate(0)

    let defaultTo = {
        year: props.dateRange.getFullYear(),
        month: props.dateRange.getMonth() + 1,
        day: nextDate.getDate(),
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

export default Monthly