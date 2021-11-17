import express from 'express';
export const monthsRouter = express.Router();
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database(process.env.TEST_DATABASE || './db.sqlite')

monthsRouter.get('/:monthId', (req, res, next) => {
  
    let type = 'calName'
    let monthNum = req.params.monthId
    const sql =`SELECT ${type} , sum(duration) as totalHours, id 
                FROM (SELECT DISTINCT * FROM Records)
                WHERE monthNum = ${monthNum} 
                GROUP BY calName
                ORDER BY totalHours DESC `

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