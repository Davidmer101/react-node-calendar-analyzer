
import {useLocation} from 'react-router-dom';
import axios from 'axios'
import useFetch from '../useFetch.js'
import {CalendarView} from './Views.js';
export default  function CalName(props) {
    let location = useLocation(); // {"pathname":"/daily/calendar","search":"?calName=Education&dateRange=Sat%20Nov%2020%202021","hash":"","state":null,"key":"v6dus8ud"}
    let query = location.search
    let url =  `/api${location.pathname + query}`
    let requestData =  useFetch(url)
    if (requestData) {
        // alert(JSON.stringify(requestData))
    }
    // axios.get(`/api/daily/calendar?calName=Education&dateRange=Sat%20Nov%2020%202021`)
    //     .then((response) =>alert(JSON.stringify(response)))
    //     .catch((error) =>alert(error.message))
        
    // alert('calName updating')
    function showTable(data) {
        let dataMapped = null
        if (data) {
            dataMapped = data.records.map(function (record){
                return {
                    calName: record.eventName, 
                    totalHours: record.totalHours}
            })
        }
        return dataMapped
    }
    let data = showTable(requestData)
    // alert(JSON.stringify(data))
    return (
        <div class = "column">
            <br/>
            <div class='block'>
                <h2>Events Breakdown for {query.substring(9, query.indexOf('&') )} </h2>
                <h3> Date showing: {query.substring(query.indexOf('dateRange') + 10, ).replaceAll('%20', ' ')}  </h3>
                {/* <p> url to send is: {JSON.stringify(url)}</p> */}
                <br/>
                <div class='block'> <CalendarView dataC= {data}/>  </div>

            </div>            
        </div>
    )
    
}