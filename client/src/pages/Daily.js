import useFetch from "../useFetch";


const Daily =  (requested) => {
  alert(requested.date)
  let data =  useFetch(requested.date)
  if(data) {
    return JSON.stringify(data);
  } else {
    return 'Loading'
  }
  
  };
  
  export default Daily;