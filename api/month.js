import express from 'express';
export const monthsRouter = express.Router();
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database(process.env.TEST_DATABASE || './db.sqlite')

monthsRouter.get('/:type/:specific/:date/:detail/:year', (req, res, next) => {
    let sql
    let type = req.params.type
    let monthNum = req.params.date
    console.log('year is: ' + req.params.year)
    if (req.params.detail == 'none') {
        sql =`SELECT ${type} , sum(duration) as totalHours, id 
        FROM (SELECT DISTINCT * FROM Records)
        WHERE monthNum = ${monthNum} and yearNum = ${req.params.year}
        GROUP BY ${type}
        ORDER BY totalHours DESC `
    } else {
        console.log('running here with specific request in monthly')
        sql =`SELECT ${type} , sum(duration) as totalHours, id 
        FROM (SELECT DISTINCT * FROM Records)
        WHERE monthNum = ${monthNum} and calName = "${req.params.detail}"
        GROUP BY ${type}
        ORDER BY totalHours DESC `
    }
    

    db.all(sql, (error, data) => {
        if(error) {
            next(error)
        } else if (data) {
            res.status(200).json({records: data})
            next();
        } else {
            res.sendStatus(404);
        }
    })
})
// quick fix
monthsRouter.delete('/', (req, res, next) => {
    let currentMonthNum = (new Date()).getMonth();
    let nextMonthNum = currentMonthNum - 1;
    const sql = `DELETE FROM Records WHERE monthNum = ${currentMonthNum} OR monthNum = ${nextMonthNum}` ;
    db.run(sql, (error) => {
        if(error) {
            next(error);
        } else {
            res.json({deleted: 'yes'})
        }
    })
})