
import {useLocation} from 'react-router-dom';
import axios from 'axios'
import useFetch from '../useFetch.js'
import {CalendarView} from './Views.js';
export default  function CalName(props) {
    
    return (
        <div class = "column">
            <br/>
            <div class='block'>
                <h2>Events Breakdown for  </h2>
                <h3> Date showing:   </h3>
            
            </div>            
        </div>
    )
    
}