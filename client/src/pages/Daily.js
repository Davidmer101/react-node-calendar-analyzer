import useFetch from "../useFetch";


const Daily =  (requested) => {
  // alert(requested.date)
  let data =  useFetch(requested.date)
  if(data) {
    return (
      <>      
        <div> 
            <h2>{requested.date.slice(11)}</h2>
            {data.records.map((record) => 
                <p> {record.calName} : {Math.round(record.TotalHours * 100)/100} </p>
            )}
         </div>
         <p>........................................................................................................................................</p>
      </>      

    )
  } else {
    return 'Loading'
  }
  
  };
  
  export default Daily;