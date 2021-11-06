

let data = {"records":[{"calName":"Education","weekNum":"39","totalHours":7.25},{"calName":"Entertainment","weekNum":"39","totalHours":21.99944444444444},{"calName":"Life","weekNum":"39","totalHours":54.24916666666666},{"calName":"MED","weekNum":"39","totalHours":1.25},{"calName":"Work","weekNum":"39","totalHours":3.25},{"calName":"Education","weekNum":"40","totalHours":3.75},{"calName":"Entertainment","weekNum":"40","totalHours":53.25},{"calName":"Life","weekNum":"40","totalHours":89.49861111111112},{"calName":"Work","weekNum":"40","totalHours":6},{"calName":"Education","weekNum":"41","totalHours":8},{"calName":"Entertainment","weekNum":"41","totalHours":28},{"calName":"Life","weekNum":"41","totalHours":96.99805555555552},{"calName":"Work","weekNum":"41","totalHours":10},{"calName":"Education","weekNum":"42","totalHours":20.5},{"calName":"Entertainment","weekNum":"42","totalHours":21},{"calName":"Life","weekNum":"42","totalHours":104.49805555555552},{"calName":"MED","weekNum":"42","totalHours":3.5},{"calName":"Work","weekNum":"42","totalHours":11.5},{"calName":"Education","weekNum":"43","totalHours":11.5},{"calName":"Entertainment","weekNum":"43","totalHours":13.25},{"calName":"Life","weekNum":"43","totalHours":92.99805555555552},{"calName":"MED","weekNum":"43","totalHours":8},{"calName":"Work","weekNum":"43","totalHours":4.25},{"calName":"Entertainment","weekNum":"44","totalHours":1},{"calName":"Life","weekNum":"44","totalHours":55.99888888888887}]}
let answer = `39   \t\t\t\t  40\n
Education 7.25 \t\t\t Education 15 \n
Entetainment 23 \t\t Entertainment 23 \n
Life 55 \t\t\t Life 80
`
console.log(answer)
let calName = ["Education", "Entertainment", "Life", "MED", "Work"]
let weekNum = [39, 40, 41, 42, 43] 
let i = 0
data.records.forEach((item) => {

    if(weekNum[i] == item.weekNum) {
        console.log(weekNum[i] + ' and ' + item.weekNum)
    } else if (i > (weekNum.length)) {
        console.log('Done')
    } else {
        i++
        console.log('NEW WEEK')
        console.log(weekNum[i] + ' and ' + item.weekNum)
    }
    
    // console.log(JSON.stringify(item))
    
})

console.log('27' == 27)