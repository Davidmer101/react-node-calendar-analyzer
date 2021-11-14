import useFetch from "../useFetch";
import '../App.css'
import * as myDate from '../date.js';

// copied from weekly.js
import React, {useState} from "react"
import { useTable } from 'react-table'
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import { Calendar } from "react-modern-calendar-datepicker";

  let productivity = {counter: {productive: 0, neutral: 0, destructive: 0, others:0}, list:{productivityList: ["education", "med", "work", "tasks"], neturalList:["life"], destructiveList:['entertainment']}}
  
  let Daily = (props) => {
      let [day, setDay] = useState(props.day)
      let requestData =  useFetch(`/api/daily/${day.toDateString()}`)
      let data= null
      let totalRecorded = 0
      let dateRange = day
      if(requestData) {
        data = requestData.records
        measureProductivity(data)
        if (data.length > 0) {
          dateRange = new Date(data[0].id)
        }
        
        totalRecorded = productivity.counter.productive + productivity.counter.neutral + productivity.counter.destructive + productivity.counter.others
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

      return(
          <div class = 'columns'>
            <CalendarView dataC={data}/>
            <Summaries onClick = {e => adjustDay(e)} dateRange = {dateRange} />
            <Productivity totalRecorded = {totalRecorded}/>
          </div>
      )   
  }
// {/* <h2 >{requested.date.slice(11)}</h2> */}

let measureProductivity = (records) => {
  productivity.counter ={productive: 0, neutral: 0, destructive: 0, others:0}
  records.forEach((record) => {
    if (productivity.list.productivityList.includes(record.calName.toLowerCase())) {
      productivity.counter.productive += record.totalHours
    } else if (productivity.list.neturalList.includes(record.calName.toLowerCase())) {
      productivity.counter.neutral += record.totalHours
    } else if (productivity.list.destructiveList.includes(record.calName.toLowerCase())) {
      productivity.counter.destructive += record.totalHours
    } else {
      productivity.counter.others += record.totalHours
    }
  })
  
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

  let CalendarView = (props) => {
      let columnsData = [
        {
          Header: 'Calendar',
          accessor: 'calName', // accessor is the "key" in the data
        },
        {
          Header: 'Hours',
          accessor: 'totalHours',
        },
      ]

     
      let data = [
        {
          "calName": 'Hello',
          "totalHours": 100,
          "id": 'World',
          
        },
        {
          "calName": 'Hello',
          "totalHours": 100,
          "id": 'World',
        },
        {
          "calName": 'Hello',
          "totalHours": 100,
          "id": 'World',
        },
      ]
    
      if (props.dataC) {
        data = props.dataC
      }
      

      return(
        <div class = 'column'>
            <p class="is-centered">Calendar</p>
            <ViewButtons type='calendar'/>
            <TableData columnsT={columnsData} dataT={data}/>

        </div>
       
      )
    
  }
  
  
 
 
  function TableData(props) {
    
    const columns = React.useMemo(
      () => props.columnsT, []
    )
    let data = props.dataT
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({ columns, data })
  
    return (
      <table class='table' {...getTableProps()} style={{ border: 'solid 1px blue' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    border: 'solid 1px blue',
                    borderBottom: 'solid 2px red',
                    background: 'aliceblue',
                    color: 'black',
                    fontWeight: 'bold',
                    
                  }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        border: 'solid 1px gray',
                        background: 'papayawhip',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
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

  let Productivity = (props) => {
    let columnsData = [
      {
        Header: 'Productive',
        accessor: 'productive', // accessor is the "key" in the data
      },
      {
        Header: 'Neutral',
        accessor: 'neutral',
      },
      {
        Header: 'Destructive',
        accessor: 'destructive',
      },
    ]

    let productivityPercentage = {
      productive: roundTo1Decimals((productivity.counter.productive)/props.totalRecorded*100)+'%',
      neutral: roundTo1Decimals((productivity.counter.neutral)/props.totalRecorded*100) + '%',
      destructive: roundTo1Decimals((productivity.counter.destructive)/props.totalRecorded*100) + '%',  
    }
    // let data = [productivity.counter, productivityPercentage]
    let data = [productivity.counter]
    return (
      <div class = 'column'> 
          <p> Productivity</p>
          <ViewButtons type='productivity'/>
          <TableData columnsT={columnsData} dataT={data}/>
          <p> Total Hours: {props.totalRecorded}</p>

      </div>
      

    )
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