import * as myDate from '../../date.js';
import React, {useState} from "react"
import { Calendar } from "react-modern-calendar-datepicker";
import useFetch from "../../useFetch.js";
import {TableView} from "./TypeView.js";

export let DailyCalendarView = (props) => {
    let date = props.dateRange
    let info = ''
    if(date.getDate() == (myDate.updateDate((new Date()), - 1)).getDate()) {
      info = 'Yesterday'
    } else if(date.getDate() == (new Date()).getDate() ){
      info = `Today`
    } else if (date.getDate() == (myDate.updateDate((new Date()), 1)).getDate()) {
      info = `Tomorrow`
    }
    let options = {weekday: "short",  month: "short", day: "numeric", year: "numeric"}
    return (
      <div class = 'column is-centered is-4'>
        <div class="columns ">
          <div  class="column is-centered">
          <h1>{info} </h1>
            <DailyDateRangeView 
            dateRange={props.dateRange} 
            onClick={props.onClick}
            style={{height:10}}/>
          </div>
        </div>
        
        <DailyShowCalendar onClick={props.onClick} dateRange={props.dateRange} />
        <p>Today's date is <strong>{new Date().toLocaleDateString("en-US", options)} </strong> , week {myDate.weekNumber(new Date())}  </p>
        
      </div>
    )
  }

  let DailyDateRangeView = (props) => {
    
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
  let DailyShowCalendar = (props) => {
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


  export let WeeklyCalendarView = (props) => {
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
        <h1>  Your week {weekNumber} summary </h1>
        <WeeklyDateRangeView 
          dateRange={props.dateRange} 
          onClick={props.onClick}
          style={{height:10}}/>
        
        <WeeklyShowCalendar onClick={props.onClick} dateRange={props.dateRange} />
        <p>Today's date is <strong>{new Date().toLocaleDateString("en-US", options)} </strong> , week {myDate.weekNumber(new Date())}  </p>
      </div>
    )
  }
  
  let WeeklyDateRangeView = (props) => {
    
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
  let WeeklyShowCalendar = (props) => {
     // ✅ a change in default state: { from: ..., to: ... }
     let weekStartsOn = props.dateRange.weekStartsOn
     let weekEndsOn = props.dateRange.weekEndsOn
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
  
  export let WeekDaysView = (props) => {
    let dateRange = props.dateRange
    return (
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
    )
  }

  const Day =  (requested) => {
    let data =  useFetch(`/api/daily/calName/all/${requested.date}/none`)
    let calNames = ['Education', 'Entertainment', 'Life', 'MED', 'Work']
    let editedData = {records: []}
    // data = {"records":[{"calName":"Education","TotalHours":1.25},{"calName":"Entertainment","TotalHours":1},{"calName":"Life","TotalHours":20.99972222222222}]}
    if(data) {
      let calendars = []
      data.records.map(record => {
        calendars.push( record.calName)
      })
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

      return (
        <>
          
          <th class='tc' style={{
                    // border: 'solid 1px blue',
                    // borderBottom: 'solid 2px red',
                    background: 'aliceblue',
                    color: 'black',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    width: "85%"
                    
                  }} >{requested.date.slice(0,11)}</th>
          <TableView dataC={editedData.records} type={'calName'}  />
          {/* {editedData.records.map(
            (record) =>  <td  class='tc'> {record.calName} : {Math.round(record.totalHours * 100)/100} </td>
          )} */}
        </>
      )
    } else {
      return 'Loading'
    }
    };

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
        <MonthlyDateRangeView 
          dateRange={props.dateRange} 
          onClick={props.onClick}
          style={{height:10}}/>
        
        <MonthlyShowCalendar onClick={props.onClick} dateRange={props.dateRange} />
        <p>Today's date is <strong>{new Date().toLocaleDateString("en-US", options)} </strong> , week {myDate.weekNumber(new Date())}  </p>
      </div>
    )
  }
  
  let MonthlyDateRangeView = (props) => {
    
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
  let MonthlyShowCalendar = (props) => {
     // ✅ a change in default state: { from: ..., to: ... }
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
