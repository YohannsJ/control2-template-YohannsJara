import Router from 'koa-router'
import getHealth from './health/health'
const Funciones = require('./Funciones/Funciones')
//import getToken from './token/token'
const router = new Router()

router.get('/health', getHealth)
//Endpoints
router.post('/token', Funciones.getTokens)

router.post('/user', Funciones.getUser)
export default router
