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
import axios from 'axios';
let gapi = window.gapi; 


let firstTime = true

async function DeleteMonths(){
  // alert('deleting months')
  let weekNum = myDate.weekNumber((new Date()));
  try {
   let result = await axios ({
     method: 'delete',
     url: `${starterURL}api/weekly/${weekNum}`,
   })
  // alert(JSON.stringify(result))

  } catch (error) {
    alert('error in requestAndStore-> sendPost: ' + error.message)
  }
};


export async function FillRecentData () {
  let date = myDate.edgeDaysOfEachMonth()
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
      //delete recent data
      let currentWeek = myDate.oneWeek((new Date()));
      let weekStarts = myDate.updateDate(currentWeek.weekStartsOn, -1);
      let weekEnds =myDate.updateDate(currentWeek.weekEndsOn, 1);
      // alert(weekStarts.toLocaleDateString() + " " + weekEnds.toLocaleDateString())
      await listOfCalendars(weekStarts , weekEnds)
      // alert('done')

    }, function(error) {
      console.log(JSON.stringify(error, null, 2));
    });
  }

}

export async function FillDb () {
  console.log(firstTime)
  let date = myDate.edgeDaysOfEachMonth()
  let url = `api/daily/calName/all/${(date.startOfSixMonthsAgo).toDateString()}/none/${date.startOfNineMonthsAgo.getFullYear()}`
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

                  document.getElementById('monthly').style.visibility = 'hidden'
                  document.getElementById('custom').style.visibility = 'hidden'
                  await listOfCalendars(date.startOfSixMonthsAgo, date.startOfTwoMonthsAgo)
                  await listOfCalendars (date.startOfTwelveMonthsAgo, date.startOfSixMonthsAgo)
                  document.getElementById('monthly').style.visibility = 'visible'
                  document.getElementById('custom').style.visibility = 'visible'
                
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

export async function RefereshData() {
  await DeleteMonths();
  await FillRecentData();
  // window.location.reload();
}

export default function Router () {

    

  if(firstTime) { 
    console.log('calling FillDb')
    FillDb()
    firstTime = false
  }
      
    let weekRange = {weekStartsOn: new Date('Sun Oct 31 2021'), weekEndsOn: new Date('Sat Nov 5 2021')}
    let dateInMonth = new Date()
    let params = useParams()
    // alert(JSON.stringify(params) + ' ' + counter);
    // counter +=1; 
    let navigate = useNavigate()
    let {period, type, specific, date, detail, year} = params // period=daily/weekly/monthly/custom, type=calName/eventName specific=all/{calName}, date=date/weekNum/monthNum/customDates
    let url = `/api/${period}/${type}/${specific}/${date}/none/${year}`
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
                  if (date > 51) {
                    date = 0
                    year = parseInt(year) + 1
                  }
                  break;
                case 'monthly':
                  date = parseInt(date) + 1
                  if(date > 11) { //month is done go to next year
                    date = 0
                    year = parseInt(year) + 1
                    dateInMonth.setMonth(0)
                    dateInMonth.setFullYear(year)
                  } else {
                    dateInMonth.setMonth(dateInMonth.getMonth() + 1)
                  }
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
                  if (date < 0) {
                    date = 51
                    year = parseInt(year) - 1
                  }
                  break;
                case 'monthly':
                  date = parseInt(date) - 1
                  if(date < 0) {
                    date = 11
                    year = parseInt(year) - 1
                    dateInMonth.setFullYear(year, date)
                  } else {
                    dateInMonth.setMonth(dateInMonth.getMonth() - 1)
                  }
                  break;
                default:
                  break;
              }
            }
            navigate(`/${period}/${type}/${specific}/${date}/${year}`)
        } else {
            switch (period) {
              case 'daily':
                date =  new Date(`${e.year}, ${e.month}, ${e.day}`)
                navigate(`/${period}/${type}/${specific}/${date.toDateString()}/${date.getFullYear()}`)
                break;
              case 'weekly':
                date = new Date(`${e.from.year}, ${e.from.month}, ${e.from.day}`)
                let weekNum = myDate.weekNumber(date)
                navigate(`/${period}/${type}/${specific}/${weekNum}/${date.getFullYear()}`)
                break;
              case 'monthly':
                dateInMonth = new Date(`${e.from.year}, ${e.from.month}, ${e.from.day}`)
                let monthNum = dateInMonth.getMonth()
                navigate(`/${period}/${type}/${specific}/${monthNum}/${dateInMonth.getFullYear()}`)
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

 
