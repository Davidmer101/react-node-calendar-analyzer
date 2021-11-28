import {useState} from 'react'
import {NavLink, Outlet, useParams, useNavigate} from 'react-router-dom'
import useFetch from '../useFetch'
import Daily from './Daily.js'
import {TableView, Productivity} from './Views.js';
import * as myDate from '../date.js'
import { Calendar } from "react-modern-calendar-datepicker";
import{ DailyCalendarView} from './Daily.js'
import {WeeklyCalendarView} from './Weekly.js'
import {MonthlyCalendarView} from './Monthly.js'
import Loader from './Loader.js'

export function FirstNavigation () {
 
  
}

export default function Router () {
  // let first = window.localStorage.getItem('firstTime');
  // if(first) {
  //   alert('first time')
  //   window.localStorage.removeItem('firstTime');
  // }
    // alert('in router')
    let weekRange = {weekStartsOn: new Date('Sun Oct 31 2021'), weekEndsOn: new Date('Sat Nov 5 2021')}
    let dateInMonth = new Date()
    let params = useParams()
    // alert(JSON.stringify(params) + ' ' + counter);
    // counter +=1; 
    let navigate = useNavigate()
    let {period, type, specific, date, detail} = params // period=daily/weekly/monthly/custom, type=calName/eventName specific=all/{calName}, date=date/weekNum/monthNum/customDates
    let url = `/api/${period}/${type}/${specific}/${date}/none`
    // alert('in router before requesting data: ')
    let data = useFetch(url)
    if(!data || !(data.records)) {
      return <Loader /> 
    }
    // alert(' in router after requesting data, data is: ' + JSON.stringify(data))
    let dataLinkAdded 
    if(data) {
        data = data.records
        if(data) {
          dataLinkAdded = data.map(addLink)
          if(period == 'weekly') {
            weekRange = myDate.oneWeek(data[0].id)
         } else if (period == 'monthly') {
           dateInMonth = new Date(data[0].id)
         }
 
        }
        
    }
    let adjustPeriod = (e) => {
        if(e.target && e.target.id) {
            if (e.target.id == 'right-arrow') {
              switch (period) {
                case 'daily':
                  let dayUpdated = myDate.updateDate(new Date(date), 1)
                  date = dayUpdated.toDateString()
                  break;
                case 'weekly':
                  date = parseInt(date) + 1
                  break;
                case 'monthly':
                  date = parseInt(date) + 1
                  dateInMonth.setMonth(dateInMonth.getMonth() + 1)
                  break;
                default:
                  break;
              }
            } else if (e.target.id == 'left-arrow') {
              switch (period) {
                case 'daily':
                  let dayUpdated = myDate.updateDate(new Date(date), -1)
                  date = dayUpdated.toDateString()
                  break;
                case 'weekly':
                  date = parseInt(date) - 1
                  break;
                case 'monthly':
                  date = parseInt(date) - 1
                  dateInMonth.setMonth(dateInMonth.getMonth() - 1)
                  break;
                default:
                  break;
              }
            }
            navigate(`/${period}/${type}/${specific}/${date}`)
        } else {
            switch (period) {
              case 'daily':
                date =  new Date(`${e.year}, ${e.month}, ${e.day}`)
                navigate(`/${period}/${type}/${specific}/${date.toDateString()}`)
                break;
              case 'weekly':
                date = new Date(`${e.from.year}, ${e.from.month}, ${e.from.day}`)
                let weekNum = myDate.weekNumber(date)
                navigate(`/${period}/${type}/${specific}/${weekNum}`)
                break;
              case 'monthly':
                dateInMonth = new Date(`${e.from.year}, ${e.from.month}, ${e.from.day}`)
                let monthNum = dateInMonth.getMonth()
                navigate(`/${period}/${type}/${specific}/${monthNum}`)
                break;
              default:
                break;
        }
        
        }
      }



    return (
        <>
          <div class = 'columns' style={{'margin-top': 'auto', 'border-top': '1px solid gray'}}> 
            
            {period == 'daily' && <DailyCalendarView onClick = {e => adjustPeriod(e)} dateRange = {new Date(date)} /> }
            {period == 'weekly' && <WeeklyCalendarView onClick = {e => adjustPeriod(e)} dateRange = {weekRange} />}
            {period == 'monthly' && <MonthlyCalendarView onClick = {e => adjustPeriod(e)} dateRange = {dateInMonth} />}
            {dataLinkAdded && <TableView dataC={dataLinkAdded} type={type} onClick = {e => adjustPeriod(e)} dateRange = {new Date(date)}/>}
              <Outlet />
            <Productivity data = {data} show={detail ? 'text': 'table' } />
          </div>       
        </>
        )
}

function addLink (calData) {
    let calLinked = 
        <NavLink 
          style={({isActive})=>{
            return {
              color: isActive ? "red" : ""
            };
          }}
          to = {`./${calData.calName}`}
          key={calData.calName}
        >
          {calData.calName}
        </NavLink>
    return {
      calName: calLinked,
      totalHours: calData.totalHours
    }
  }

 
