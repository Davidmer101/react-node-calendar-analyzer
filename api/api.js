import express from 'express';
export const apiRouter = express.Router();
import {weeksRouter} from './weeks.js'
import {usersRouter} from './users.js'
import {daysRouter} from './daily.js'

apiRouter.use('/weeks', weeksRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/daily', daysRouter);

apiRouter.get('/', (req, res, next) => {
    res.status(200).json({message: "Hello from server"})
})
// module.exports = apiRouter;
