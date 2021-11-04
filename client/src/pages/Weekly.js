import useFetch from "../useFetch";
import '../App.css'
import React from "react"
import * as myDate from '../date.js';
import { useTable } from 'react-table'

  let productivity = {counter: [{productive: 0}, {neutral: 0}, {destructive: 0}], list:{productivityList: ["education", "med", "work", "tasks"], neturalList:["life"], destructiveList:['entertainment']}}
  
  class Weekly extends React.Component {
    render() {
      return(
        <>
            <div class = 'columns'>
              <div class = 'column'>
                <div class = 'column'>
                  <CalendarView/>
                </div>
                
              </div>
              <div class = 'column'>
                <Summaries/>
              </div>
              <div class = 'column'> 
                Productivity View
              </div>
            </div>
            
        </>
      )
    }
    
  }
// {/* <h2 >{requested.date.slice(11)}</h2> */}

let measureProductivity = (cal, spent) => {
  if (productivity.list.productivityList.includes(cal.toLowerCase())) {
    productivity.counter.productive += spent
  } else if (productivity.list.neturalList.includes(cal.toLowerCase())) {
    productivity.counter.neutral += spent
  } else if (productivity.list.destructiveList.includes(cal.toLowerCase())) {
    productivity.counter.destructive += spent
  }
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

  class CalendarView extends React.Component {
   


    render() {
      return(
        <>
            <p class="is-centered">Calendar</p>
            <ViewButtons type='calendar'/>
            <TableData />
      
            
        </>
       
      )
    }
    
  }
  
  
 
 
  function TableData(columns1, data1) {
    let requestData =  useFetch(`/api/weekly/${35}`)
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
  
    if(requestData) {
      data = requestData.records
    }
    const columns = React.useMemo(
      () => [
        {
          Header: 'Calendar',
          accessor: 'calName', // accessor is the "key" in the data
        },
        {
          Header: 'Hours',
          accessor: 'totalHours',
        },
      ],
      []
    )
  
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
  
  let Summaries = (timePeriod, totalHours) => {
    return (
      <>
        <p> Summaries </p>

        <div class="field has-addons">
          <p class="control">
          <button id="left-arrow" class="button"> 
            <span class="icon is-small">
              <i class="fas fa-arrow-circle-left"></i>
            </span>
          </button>
          </p>
          <p class="control">
          <button class="button">
            <span id="viewing"> Monday, November 9</span>
          </button>
          </p>
          <p class="control">
          <button id="right-arrow" class="button">
            <span class="icon is-small">
              <i class="fas fa-arrow-alt-circle-right"></i>
          </span>
          </button>
          </p>
        </div>
        
        <p> Total Hours: 139</p>
      </>
    )
  }
    export default Weekly;

