import useFetch from "../useFetch";
import '../App.css'
import React, {useState} from "react"
import * as myDate from '../date.js';
import { useTable } from 'react-table'
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import { Calendar } from "react-modern-calendar-datepicker";


let productivity = {counter: {productive: 0, neutral: 0, destructive: 0, others:0}, list:{productivityList: ["education", "med", "work", "tasks"], neturalList:["life"], destructiveList:['entertainment']}}


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

  export let CalendarView = (props) => {
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
          "calName": 'Loading',
          "totalHours": 0,
          "id": 'Loading',
          
        }
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
  


  export let Productivity = (props) => {
    if (props.data) {
        measureProductivity(props.data)
    }
    let totalRecorded = productivity.counter.productive + productivity.counter.neutral + productivity.counter.destructive + productivity.counter.others
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
           <div class= 'column'>
            <strong> Total Hours Recorded: </strong> {totalRecorded}
          </div>

      </div>

    )
  }

  let TextData = (props) => {

    return(
      <>
            <div class= 'column'> 
              <strong> Productive: </strong>  {props.data.productive}
            </div>

            <div class= 'column'> 
              <strong> Neutral: </strong>  {props.data.neutral}
            </div>

            <div class= 'column'> 
              <strong> Destructive: </strong>  {props.data.destructive}
            </div>
      </>
      )
            
          
  }

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