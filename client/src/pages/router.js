import {useParams} from 'react-router-dom'
import useFetch from '../useFetch'

export default function Router () {
    let params = useParams()
    let period = params.period //daily, weekly, monthly, custom
    let type = params.type //calName, eventName
    let specific = params.specific //all, specific calendar
    let date = params.date //date, week number, month number, could be range of days
    let url = `/api/${period}/${date}?type:${type}&specific=${specific}&date=${date}`
    let data = useFetch(url)

    return (
        <>
         <p> params is {JSON.stringify(params)} </p>
         <p>type is: {type} </p>
         <p> specific is: {specific} </p>
         <p> url sent is {url} </p>
         <br/>
         <p>data requested is: </p> 
         <p> {JSON.stringify(data)}</p>
        
        </>
        )
}