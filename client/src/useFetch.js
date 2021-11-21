import {useState, useEffect} from "react";
let proxy = "http://localhost:5000";

function useFetch (url) {
    // alert('url in useFetch is: ' + proxy + '' + url)
    let [data, setData] = useState(null);
    useEffect(() => {
        fetch((proxy+ '' + url))
            .then((res) => res.json())
            .then((data) => setData(data))
    }, [url])
    return data;
}

export default useFetch;