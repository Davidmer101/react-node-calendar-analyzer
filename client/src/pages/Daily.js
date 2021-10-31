import useFetch from "../useFetch";
import '../App.css'
import * as myDate from '../date.js';



  const Daily = (requested) => {
    let tomorrow = (myDate.updateDate((new Date()), 1)).toDateString()
    let today = (new Date()).toDateString()
    let today_1 = (myDate.updateDate((new Date()), -1)).toDateString()
    let today_2 = (myDate.updateDate((new Date()), -2)).toDateString()
    let today_3 = (myDate.updateDate((new Date()), -3)).toDateString()
    let today_4 = (myDate.updateDate((new Date()), -4)).toDateString()
    let today_5 = (myDate.updateDate((new Date()), -5)).toDateString()
    let today_6 = (myDate.updateDate((new Date()), -6)).toDateString()
     {/* <Day date={`/api/daily/${today_6}`}/>
            <Day date={`/api/daily/${today_5}`}/> 
            <Day date={`/api/daily/${today_4}`}/>
            <Day date={`/api/daily/${today_3}`}/>
            <Day date={`/api/daily/${today_2}`}/>
            <Day date={`/api/daily/${today_1}`}/>
            <Day date={`/api/daily/${today}`}/>
            <Day date={`/api/daily/${tomorrow}`}/> */}
    return(
          <table class="table is-bordered is-striped is-narrow"> 
            <tr class='tc'> <Day date={`/api/daily/${today_6}`}/> </tr>
            <tr class='tc'> <Day date={`/api/daily/${today_5}`}/> </tr>
            <tr class='tc'> <Day date={`/api/daily/${today_4}`}/> </tr>
            <tr class='tc'> <Day date={`/api/daily/${today_3}`}/> </tr>
            <tr class='tc'> <Day date={`/api/daily/${today_2}`}/> </tr>
            <tr class='tc'> <Day date={`/api/daily/${today_1}`}/> </tr>
            <tr class='tc'> <Day date={`/api/daily/${today}`}/> </tr>
            <tr class='tc'> <Day date={`/api/daily/${tomorrow}`}/> </tr>
           

 
               
          </table>
    )
  }
// {/* <h2 >{requested.date.slice(11)}</h2> */}

  const Day =  (requested) => {
    // alert(requested.date)
    let data =  useFetch(requested.date)
    let calNames = ['Education', 'Entertainment', 'Life', 'MED', 'Work']
    let editedData = {records: []}
    // alert('data is '+ JSON.stringify(data))
    // data = {"records":[{"calName":"Education","TotalHours":1.25},{"calName":"Entertainment","TotalHours":1},{"calName":"Life","TotalHours":20.99972222222222}]}
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
            }
          })
          
        } else {
          editedData.records[i] = {calName: calNames[i], TotalHours: 0}
        }
      }

      // alert('edited data is ' + JSON.stringify(editedData))
      return (
        <>
          <th class='tc' >{requested.date.slice(11)}</th>
          {editedData.records.map(
            (record) =>  <td  class='tc'> {record.calName} : {Math.round(record.TotalHours * 100)/100} </td>
          )}
        </>
      )
    } else {
      return 'Loading'
    }
    };
    
    let handleCalNames = (record, keys) => {
  
      return <td  class='tc'> {record.calName} : {Math.round(record.TotalHours * 100)/100} </td>
      }
        


    let handleEventNames = () => {
      alert('there')
    }
  
  export default Daily;