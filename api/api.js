import express from 'express';
export const apiRouter = express.Router();
import {weeksRouter} from './weeks.js'
import {usersRouter} from './users.js'
import {daysRouter} from './daily.js'
import {monthsRouter} from './month.js'


apiRouter.use('/weekly', weeksRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/daily', daysRouter);
apiRouter.use('/monthly', monthsRouter);

apiRouter.get('/', (req, res, next) => {
    res.status(200).json({message: "Server is Ready and"})
})
// module.exports = apiRouter;