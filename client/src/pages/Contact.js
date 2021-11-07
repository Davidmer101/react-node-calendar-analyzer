import axios from 'axios';

let starterURL = 'http://localhost:5000/' 

const Contact = () => {
  async function sendDelete(){
    try {
     let result = await axios ({
       method: 'delete',
       url: `${starterURL}api/daily/`,
     })
    alert(JSON.stringify(result))
    } catch (error) {
      alert('error in requestAndStore-> sendPost: ' + error.message)
    }
  };
  
  return(
    <button onClick={sendDelete}> Erase All Data </button>
  )
  };
  
  export default Contact;