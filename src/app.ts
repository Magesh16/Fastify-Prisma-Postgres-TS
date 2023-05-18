import fastify from "fastify";
import userRoute from './modules/user/user.route';
import {userSchemas} from './modules/user/user.schema'
const server = fastify();

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