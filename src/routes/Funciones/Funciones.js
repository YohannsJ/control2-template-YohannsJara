const users = require('../../data/users')
import { KEY } from '../../utils/constants'
import { SECRET} from '../../utils/constants' 
const Token = require('../../utils/uuid')

let user = users.getUsers()
//Al inicio de la Api se crearan los 10000 usuarios
//los cuales no cambiaran durante la ejecucion del programa
//si se reinicia la api los usuarios cambiaran de forma aleatoria
exports.getTokens = (ctx) => {
    console.log("Gettoken")
    let datos = ctx.request.body
    let encontrado = false //Para conirmar que encuntre el usuario
    user.forEach(element => {//Busco la id del usuario 
        if(element.id == datos.id){
            encontrado = true
            if (datos.key == KEY && datos.secret == SECRET){ //Compruebo que key y secret sean correctos
                //console.log("usuario coincide")
                element.token= Token.getUUIDV4()
                //console.log(element)
                
                ctx.body = {
                    status : 200,
                    token : element.token
                }
                
            }
            else {
                ctx.body = {
                    status : 500,
                    messeage : "KEY o SECRET no coincide, intente de nuevo",

                }
                
            }
        }  
          
    });
    if(!encontrado){   
        ctx.body = {
            status : 500,
            messeage : "Error, El id no coincide con la base de datos",
        }
        return ctx
    }

    
    return ctx
}

exports.getUser = (ctx) => {
    console.log("getUsers")
    let encontrado = false //En caso de que se mantenga false mandara un mensaje de no encontrado
    let token = ctx.request.body.token;
    //console.log(token)
    user.forEach(element =>{ //Busco al usuario segun el token
        if(token == element.token){
            //console.log("encontrado: \n",element)
            ctx.body = {
                status : 200,
                id: element.id,
                name : element.name,
                email : element.email,
                bitcoinAddress: element.bitcoinAddress,
                token : element.token
            }
            encontrado = true
            return ctx
        }
    })
    if(!encontrado){   
        ctx.body = {
            status : 500,
            messeage : "Token no coincide, o aún no a sido asignado a un usuario",
        }
        return ctx
    }
    
}