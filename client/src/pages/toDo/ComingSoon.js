import '../../App.css'
import * as myDate from '../../date.js'

export default function ComingSoon () {
    return (
        // style={{'background-image' : "url('https://www.howtogeek.com/wp-content/uploads/2018/06/shutterstock_1006988770.png?height=200p&trim=2,2,2,2')" }}
    
        <div class="bgimg" style={{ minHeight: '100%' }}>
        <div class="topleft">
          <p>GCAnalayzer</p>
        </div>
        <div class="middle">
          <h1>COMING SOON</h1>
          <hr/>
          
            <CountDown />
        
          
        </div>
        <div class="bottomleft">
          <p> citation: <a href="https://www.w3schools.com/howto/howto_css_coming_soon.asp"> w3Schools </a> </p>
        </div>
      </div>
 
    )
}


let CountDown = () => {
  let date = new Date("Dec 27, 2021 15:37:25")
  
  let difference = myDate.timeBetween(new Date() , date)
    // Time calculations for days, hours, minutes and seconds
    let days = difference.days
  
    // // Display the result in an element with id="demo"
    // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
    // + minutes + "m " + seconds + "s ";
    return( 
      Math.floor(days) + " days"
    )


}