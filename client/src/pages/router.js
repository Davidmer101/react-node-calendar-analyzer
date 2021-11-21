import {useState} from 'react'
import {Link, Outlet, useParams} from 'react-router-dom'
import useFetch from '../useFetch'
import Daily from './Daily.js'
import {CalendarView, Productivity} from './Views.js';
import * as myDate from '../date.js'
import { Calendar } from "react-modern-calendar-datepicker";

export default function Router () {
    let params = useParams()
    let period = params.period //daily, weekly, monthly, custom
    let type = params.type //calName, eventName
    let specific = params.specific //all, specific calendar
    let date = params.date //date, week number, month number, could be range of days
    let url = `/api/${period}/${date}?type:${type}&specific=${specific}&date=${date}`
    let data = useFetch(url)
    
    let dataLinkAdded 
    if(data) {
        data = data.records
        dataLinkAdded = data.map(addLink)
    }
    
    let adjustPeriod = (e) => {
        alert('coming soon')
        if(e.target && e.target.id) {
          if (e.target.id == 'right-arrow') {
            let dayUpdated = myDate.updateDate(new Date(date), 1)
            // setDay(dayUpdated)
          } else if (e.target.id == 'left-arrow') {
            let dayUpdated = myDate.updateDate(new Date(date), -1)
            // setDay(dayUpdated)
         }
        } else {
          //make date
          let date =  new Date(`${e.year}, ${e.month}, ${e.day}`)
          // update date
        //   setDay(date)
        }
      }


    return (
        <>
          <div class = 'columns'>
            <CalendarView dataC={dataLinkAdded}/>
              <Outlet />
            <Summaries onClick = {e => adjustPeriod(e)} dateRange = {new Date(date)} />
            <Productivity data = {data}/>
          </div>
         <p> params is {JSON.stringify(params)} </p>
         <p>type is: {type} </p>
         <p> specific is: {specific} </p>
         <p> url sent is {url} </p>
         <br/>
         <p>data requested is: </p> 
         <p> {JSON.stringify(data)}</p>
        
        </>
        )
}

function addLink (calData) {
    let calLinked = 
        <Link 
          to = {`./${calData.calName}`}
          key={calData.calName}
        >
          {calData.calName}
        </Link>
    return {
      calName: calLinked,
      totalHours: calData.totalHours
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
