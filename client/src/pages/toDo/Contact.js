import axios from 'axios';
import {handleSignoutClick} from '../../App.js'
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
    handleSignoutClick()
  };
  
  return(
    <div>
      <div class = 'block'> Contact me at merehatibebadane@gmail.com </div>
      <button onClick={sendDelete}> Erase All Data </button>
    </div>
    
  )
  };
  
  export default Contact;