import express from 'express';
export const daysRouter = express.Router();
import sqlite3 from 'sqlite3';
import {calendarRouter} from './calendar.js'
const db = new sqlite3.Database(process.env.TEST_DATABASE || './db.sqlite')

daysRouter.use('/calendar', calendarRouter);

daysRouter.param('weekId', (req, res, next, weekId) => { // check if Id exits (simplifying)
    const sql = 'SELECT * FROM Weeks WHERE Weeks.id = $weekId ';
    const values = {$weekId: weekId};
    db.get(sql, values, (error, week) => {
        if(error) {
            next(error);
        } else if (week) {
            req.week = week;
            next();
        } else {
            res.sendStatus(404);
        }
    })
})

daysRouter.get('/', (req, res, next) => {
    const sql = 'SELECT * FROM Records WHERE Records.id = "Mon Sep 27 2021"';
    db.all(sql, (error, data) => {
        if(error) {
            next(error);
        } else if (data) {
            res.status(200).json({records: data})
            next();
        } else {
            res.sendStatus(404);
        }
    })
    // db.all(`SELECT * FROM Weeks WHERE username = efc`,
    //     (err, weeks) => {
    //         if(err) {
    //             next(err);
    //         } else {
    //             if(req.session != undefined) {
    //                 res.status(200).json({weeks: weeks, user: req.session.user})
    //             } else {
    //                 res.status(200).json({weeks: weeks})
    //             }
    //         }
    //     });
}) 

daysRouter.get('/:type/:specific/:date/:detail/:year', (req, res, next) => {
    let sql
    let type = req.params.type  //calName or eventName maybe description
    let day = req.params.date
  
    if (req.params.detail == 'none') {
        sql = `SELECT ${type} , sum(duration) as totalHours, id 
        FROM (SELECT DISTINCT id, eventName, calName, startTime, duration FROM Records)
        WHERE id = "${day}"
        GROUP BY ${type}
        ORDER BY totalHours DESC `
    } else {
        sql = `SELECT ${type} , sum(duration) as totalHours, id 
        FROM (SELECT DISTINCT id, eventName, calName, startTime, duration FROM Records)
        WHERE id = "${day}" and calName = "${req.params.detail}"
        GROUP BY ${type}
        ORDER BY totalHours DESC `
    }
     
    db.all(sql, (error, data) => {
        if(error) {
            next(error)
        } else if (data) {
            res.status(200).json({records: data})
            // res.status(200).json({params: req.params})
            next();
        } else {
            res.sendStatus(404);
        }
    })
    
    // res.status(200).json({record: "ALL SUCCESSFUL", dayId: req.params.dayId});
})

let count = 0

daysRouter.post('/', (req, res, next) => {
    const id = req.body.id;
    const eventName = req.body.eventName;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const calName = req.body.calName;
    const description = req.body.description;
    const duration = req.body.duration;
    const weekNum = req.body.weekNum;
    const monthNum = req.body.monthNum;
    const yearNum = req.body.yearNum;
    // const username = req.session.user;
    // if(!id || !username) {
    //     return res.status(200).json({username: username});
    // } //I will accpet zeroes ofr cal1-5 so no checking for undefined or 0
   const sql = 'INSERT INTO Records (id, eventName, startTime, endTime, calName, description, duration, weekNum, monthNum, yearNum) ' + 
                ` VALUES ($id,$eventName, $startTime, $endTime, $calName, $description, $duration, $weekNum, $monthNum, $yearNum)`;
   const values = {
       $id: id,
       $eventName: eventName,
       $startTime: startTime,
       $endTime: endTime,
       $calName: calName,
       $description: description,
       $duration: duration,
       $weekNum: weekNum,
       $monthNum: monthNum,
       $yearNum: yearNum
    //    $username: username
   }
   
   db.run(sql, values, function(error) {
       if(error) {
        //    next(error);
        // res.redirect('/:weekId');
        console.log('from days error: ' + error.message);
       } else {
            console.log('posting successful: ' + count );
            count++;
            res.status(201).json({record: "ALL SUCCESSFUL"}).end()
       }
   })

})

daysRouter.put('/:weekId', (req, res, next) => {
    const id = req.body.week.id;
    const cal1 = req.body.week.cal1;
    const cal2 = req.body.week.cal2;
    const cal3 = req.body.week.cal3;
    const cal4 = req.body.week.cal4;
    const cal5 = req.body.week.cal5;
    // const username = req.session.user;
    // if(!id || !cal1 || !cal2 || !cal3 || !cal4 || !cal5) {
    //     return res.sendStatus(400);
    // } //I will accept zeroes

  
    const sql = 'UPDATE Weeks SET cal1 = $cal1, cal2 = $cal2, ' +
    'cal3 = $cal3, cal4 = $cal4, cal5 = $cal5 ' +
    'WHERE Weeks.id = $weekId';

    const values = {
        $cal1: cal1,
        $cal2: cal2,
        $cal3: cal3,
        $cal4: cal4,
        $cal5: cal5,
        // $username: username,
        $weekId: req.params.weekId
    };

    db.run(sql, values, (error) => {
        if(error) {
            next(error);
        } else {
            db.get(`SELECT * FROM Weeks WHERE Weeks.id = ${req.params.weekId}`, (error, week) => {
               res.status(200).json({ week: week})
            })
        }
    })
})

daysRouter.delete('/', (req, res, next) => {
    const sql = `DELETE FROM Records`;
    db.run(sql, (error) => {
        if(error) {
            next(error);
        } else {
            res.json({deleted: 'yes'})
        }
    })
})


// direct /weeks
// module.exports = weeksRouter;
// function getNextId() {
//     db.get('SELECT COUNT(*) AS id FROM Weeks', (error, count) => {
//         console.log(count.id)
//         return count.id
//     })
// }