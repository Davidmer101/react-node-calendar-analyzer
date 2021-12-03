import {useState, useEffect} from "react";

let proxy = "https://react-g-calendar-analyzer.herokuapp.com";

function useFetch (url) {
    // alert('url in useFetch is: ' + proxy + '' + url)
    let [data, setData] = useState(null);
    useEffect(() => {
        fetch((proxy+ '' + url))
            .then((res) => res.json())
            .then((data) => setData(data))
    }, [url])
    if (data) {
        // alert('in useFetch to send data is: ' +JSON.stringify(data))
        return data;
    }
   
}

// async function useFetch(url) {
    
//     try {
//       alert('in use Fetch about to send request')
//       const response = await axios.get(proxy+ '' + url);
//       let data = await response.data
//       alert(' in use fetch about to respond with data ' + JSON.stringify(data));
//       return(data)
//     } catch (error) {
//       alert(error.message);
//       return null
//     }
//   }

export default useFetch;