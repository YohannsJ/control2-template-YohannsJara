import Router from 'koa-router'
import getHealth from './health/health'
const Funciones = require('./Funciones/Funciones')
//import getToken from './token/token'
const router = new Router()

router.get('/health', getHealth)
//Endpoints
router.post('/token', Funciones.getTokens) //Asigna un token a un usuario

router.post('/user', Funciones.getUser) //Busca al usuario con el token
export default router
