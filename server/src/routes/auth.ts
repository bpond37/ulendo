import * as express from 'express'

const authCtrl = require('./auth.ctrl')

const auth = express.Router();

auth.post('/register', authCtrl.register)
auth.post('/login', authCtrl.login)
auth.get('/check', authCtrl.check)
auth.post('/logout', authCtrl.logout)

export default auth;