import express from 'express';
export const monthsRouter = express.Router();
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database(process.env.TEST_DATABASE || './db.sqlite')

monthsRouter.get('/:type/:specific/:date/:detail', (req, res, next) => {
    let sql
    let type = req.params.type
    let monthNum = req.params.date

    if (req.params.detail == 'none') {
        sql =`SELECT ${type} , sum(duration) as totalHours, id 
        FROM (SELECT DISTINCT * FROM Records)
        WHERE monthNum = ${monthNum} 
        GROUP BY ${type}
        ORDER BY totalHours DESC `
    } else {
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