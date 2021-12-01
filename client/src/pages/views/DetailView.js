import {useParams} from 'react-router-dom';
import useFetch from '../../useFetch.js'
import {TableView} from './TypeView.js';
export default  function CalName(props) {
    let params = useParams();
    let url = `/api`
    let {period, type, specific, date, detail} = params
    if (type == 'calName') {
        url=`/api/${period}/eventName/${specific}/${date}/${detail}`
    } else if (type == 'eventName') {
        alert("coming soon")
    }
    let data = useFetch(url)
    if(data) {
        data = data.records
        // alert(url + ' and '  + JSON.stringify(data))
        return (
        <TableView dataC={data} type="eventName"/>            
        )
    } else {
        return <h1> Loading...</h1>
    }
    
    
}

/*
IF period has calNames THEN
	IF params has daily THEN
		request daily-get with id=date and calName=detail grouped by eventName
	ELSE IF params has weekly THEN
		request weekly-get with weekNum=date and calName=detail grouped by eventName
	ELSE IF params has monthly THEN
		request monthly-get with monthNum=date and calName=detail grouped by eventName
	END IF
ELSE IF params has eventName THEN
	IF params has daily THEN
		request daily-get with id=date and eventName=detail grouped by description
	ELSE IF params has weekly THEN
		request weekly-get with weekNum=date and eventName=detail grouped by description
	ELSE IF params has monthly THEN
		request monthly-get with weekNum=date and eventName=detail grouped by description
	END IF
*/