import Router from 'koa-router'
import getHealth from './health/health'
const token = require('./token/token')
//import getToken from './token/token'
const router = new Router()

router.get('/health', getHealth)
//Endpoints
router.post('/token', token.getTokens)

router.post('/user', token.getUser)
export default router
