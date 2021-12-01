import {NavLink, Outlet, useParams, useNavigate} from 'react-router-dom'
import useFetch from '../useFetch'
import {TableView, Productivity} from './views/TypeView.js';
import * as myDate from '../date.js'
import{ DailyCalendarView} from './views/CalendarView.js'
import {WeeklyCalendarView} from './views/CalendarView.js'
import { WeekDaysView } from './views/CalendarView.js';
import {MonthlyCalendarView} from './views/CalendarView.js'
import Loader from './toDo/Loader.js'
import {listOfCalendars} from '../requestAndStore.js'
import {starterURL} from '../requestAndStore.js'
let gapi = window.gapi; 


let firstTime = true
export async function FillDb () {
  console.log(firstTime)
  let date = myDate.edgeDaysOfEachMonth()
  let url = `api/daily/calName/all/${(date.startOfSixMonthsAgo).toDateString()}/none`
  fetch((starterURL+ '' + url))
        .then((res) => res.json())
        .then((data) => {
          if(data.records.length == 0) {
              gapi.load('client:auth2', initClient);
              function initClient() {
                gapi.client.init({
                    // Client ID and API key from the Developer Console
                  apiKey: 'AIzaSyBYxwNwT53EbvQNvhVCDD3FZW3KvTQWRBs',
                  clientId: '958765352456-n0b4hg33876562lgerugi6qfei2jjaja.apps.googleusercontent.com',
                  // Array of API discovery doc URLs for APIs used by the quickstart
                  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
                  // Authorization scopes required by the API; multiple scopes can be
                  // included, separated by spaces.
                  scope: 'https://www.googleapis.com/auth/calendar.readonly'
                }).then(async function () {

                  await listOfCalendars(date.startOfSixMonthsAgo, date.startOfOneMonthAgo)
                  await listOfCalendars (date.startOfTwelveMonthsAgo, date.startOfSixMonthsAgo)
                
                }, function(error) {
                  console.log(JSON.stringify(error, null, 2));
                });
              }
              
          } 
        })
          
  
  // if(data) {
  //   data.records.length ? 
  //     alert(' data in FillDb: ' + JSON.stringify(data)) : 
  //     
  // }
  
 
}

export default function Router () {

  if(firstTime) { 
    console.log('calling FillDb')
    FillDb()
    firstTime = false
  }
  
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
        if(data.length) {
          dataLinkAdded = data.map(addLink)
          if(period == 'weekly') {
            weekRange = myDate.oneWeek(data[0].id)
         } else if (period == 'monthly') {
           dateInMonth = new Date(data[0].id)
         }
 
        } else {
          alert('For now: \n You can only see from the start of this year (Jan 1 2021) \n \t\t upto \n The end of the current month (Nov 30 2021) \n Period will be extend soon')
          window.location.replace(`/daily/calName/all/${(new Date()).toDateString()}`)
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
            
            {period == 'daily' && <DailyCalendarView onClick = {e => adjustPeriod(e)} dateRange = {new Date(date)}  /> }
            {period == 'weekly' && <WeeklyCalendarView onClick = {e => adjustPeriod(e)} dateRange = {weekRange} />}
            {period == 'monthly' && <MonthlyCalendarView onClick = {e => adjustPeriod(e)} dateRange = {dateInMonth} />}
            {dataLinkAdded && <TableView dataC={dataLinkAdded} type={type} onClick = {e => adjustPeriod(e)} dateRange = {new Date(date)}/>}
              <Outlet />
            <Productivity data = {data} show={detail ? 'text': 'table' } />
          </div> 

          {period == 'weekly' && <WeekDaysView dateRange = {weekRange} />}

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

 
