import '../../App.css'
import React from "react"
import { useTable } from 'react-table'
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import {roundTo2Decimals} from '../../requestAndStore.js'

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

  export let TableView = (props) => {
    let columnsData, data
    if (props.type == 'calName') {
      columnsData = [
        {
          Header: 'Calendar',
          accessor: 'calName', // accessor is the "key" in the data
        },
        {
          Header: 'Hours',
          accessor: 'totalHours',
        },
      ]
  
       data = [
        {
          "calName": 'Loading',
          "totalHours": 0,
          "id": 'Loading',
          
        }
      ]
    } else {
      columnsData = [
        {
          Header: 'Event',
          accessor: 'eventName', // accessor is the "key" in the data
        },
        {
          Header: 'Hours',
          accessor: 'totalHours',
        },
      ]
 
       data = [
        {
          "eventName": 'Loading',
          "totalHours": 0,
          "id": 'Loading',
          
        }
      ]
    }
 
      if (props.dataC) {
        data = props.dataC
      }
      
      return(
        <div class = 'column' >
            {/* <ViewButtons type='calendar'/> */}
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
  
 
  function percentage(decimal) {
    return (Math.round(decimal * 100) + '%')
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
    let data = [productivity.counter, {productive: percentage(productivity.counter.productive/totalRecorded), neutral:  percentage(productivity.counter.neutral/totalRecorded), destructive: percentage(productivity.counter.destructive/totalRecorded)}]

    let dataToChart = {
      labels: ['productive', 'neutral', 'destructive'],
      datasets: [
        {
          label: 'hours',
          data: [percentage(productivity.counter.productive/totalRecorded), percentage(productivity.counter.neutral/totalRecorded), percentage(productivity.counter.destructive/totalRecorded) ],
          // data: [18, 39, 17],
          backgroundColor: [
            'rgba(75, 255, 0, 19)',
            'rgba(125, 99, 255, 24)',
            'rgba(255, 15, 6, 12)',
          ], 
          borderColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],  
          borderWidth: 1,      
          
        },
        


      ],

    }

  
    return (
      <div class = 'column is-centered'> 

              {/* <h1 style={{color: 'brown', 'text-align': 'center', 'margin-bottom': '2px'}}> Productivity </h1> */}
              {/* <ViewButtons type='productivity'/> */}
              {props.show == 'table' ? 
                <TableData columnsT={columnsData} dataT={data}/>:
                <TextData data = {productivity.counter} />
              }
      
          <div class= 'column is-centered' >
          {/* <Chart
              width={"100%"}
              height={"100%"}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Productivity', 'Hours per Day'],
                ['Pro', productivity.counter.productive],
                ['Neu', productivity.counter.neutral],
                ['Des', productivity.counter.destructive],
              ]}
              options={{
                // title: 'My Daily Activities',
                // legend: {
                //   position: 'labeled'
                // },
                pieSliceText: 'label',
                legend: 'none' 
                
              }}
              rootProps={{ 'data-testid': '1' }}
            /> */}
          </div>
          <div class= 'column is-centered' >
            <strong> Total Hours Recorded: </strong> {roundTo2Decimals(totalRecorded)}
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

