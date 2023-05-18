import fastify, { FastifyReply, FastifyRequest } from "fastify";
// @ts-ignore
import fjwt from 'fastify-jwt'
// @ts-ignore
import userRoute from './modules/user/user.route';
import {userSchemas} from './modules/user/user.schema'

export const server = fastify();

declare module "fastify"{
    export interface FastifyInstance{
        authenticate :any
    }
}

server.register(fjwt, {
    secret:'dljanjfndaijbfiabodfn2314njnj'
});

// @ts-ignore
server.decorate("authenticate",async(req: FastifyRequest,res: FastifyReply)=>{
    try{
        await req.jwtVerify();

    }catch(err){
        return res.send(err);
    }
})


server.get('/get', (_,res)=>{
    res.send({status: true})
})

async function main(){

    for(const schema of userSchemas){
        server.addSchema(schema);
    }

    server.register(userRoute, {prefix: '/api/users'})
    try{
        await server.listen({port:3500});
        console.log(`server running at port 3500`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

main();