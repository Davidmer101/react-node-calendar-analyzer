import useFetch from "../useFetch";
import '../App.css'
import React, {useState} from "react"
import * as myDate from '../date.js';
import { useTable } from 'react-table'
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import { Calendar } from "react-modern-calendar-datepicker";

  let productivity = {counter: {productive: 0, neutral: 0, destructive: 0, others:0}, list:{productivityList: ["education", "med", "work", "tasks"], neturalList:["life"], destructiveList:['entertainment']}}
  
  let Weekly = (props) => {
      let [weekNum, setWeekNum] = useState(props.weekNum)
      let requestData =  useFetch(`/api/weekly/${weekNum}`)
      let data= null
      let totalRecorded = 0
      let dateRange = 'Sun Oct 31 - Sat Nov 5'
      if(requestData) {
        data = requestData.records
        measureProductivity(data)
        dateRange = myDate.oneWeek(data[0].id)
        totalRecorded = productivity.counter.productive + productivity.counter.neutral + productivity.counter.destructive + productivity.counter.others
      }

      let adjustWeek = (arrow) => {
        if (arrow == 'right-arrow') {
          setWeekNum(weekNum + 1)
        } else if (arrow == 'left-arrow') {
          setWeekNum(weekNum - 1)
        } else {
          alert('pressed is: ' + arrow)
        }
      }

      return(
        <div class = 'columns'>
          <CalendarView dataC={data}/>
          <Summaries onClick = {e => adjustWeek(e.target.id)} dateRange = {dateRange} totalRecorded = {totalRecorded}/>
          <Productivity/>
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

  const Week =  (requested) => {

    // alert(requested.date)
    let data =  useFetch(requested.date)
    productivity = {counter: [{productive: 0}, {neutral: 0}, {destructive: 0}], list:{productivityList: ["education", "med", "work", "tasks"], neturalList:["life"], destructiveList:['entertainment']}}
    let calNames = ['Education', 'Entertainment', 'Life', 'MED', 'Work']
    let editedData = {records: []}
    // alert('data is '+ JSON.stringify(data))
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
              measureProductivity(record.calName, record.totalHours)
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
                    borderBottom: 'solid 3px red',
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
    return (
      <div class = 'column is-centered'>
        <h2> Summaries </h2>
        <p> Total Hours: {props.totalRecorded}</p>
        <DateRangeView 
          dateRange={props.dateRange} 
          onClick={props.onClick}
          style={{height:10}}/>
        
        <ShowCalendar/>
        
      </div>
    )
  }

  let DateRangeView = (props) => {
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
          <button class="button">
            <span id="viewing"> {props.dateRange.weekStartDate} to {props.dateRange.weekEndDate} </span>
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
  let ShowCalendar = () => {
     // ✅ a change in default state: { from: ..., to: ... }
    const [selectedDayRange, setSelectedDayRange] = useState({
      from: null,
      to: null
    });
    return (
      <Calendar
        value={selectedDayRange}
        onChange={setSelectedDayRange}
        shouldHighlightWeekends
        style={{height: '60%'}}
      />
    );
  }

  let Productivity = () => {
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

    let data = [productivity.counter]
    return (
      <div class = 'column'> 
          <p> Productivity</p>
          <ViewButtons type='productivity'/>
          <TableData columnsT={columnsData} dataT={data}/>
      </div>
      

    )
  }
    export default Weekly;
