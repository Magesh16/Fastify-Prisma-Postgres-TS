import fastify from "fastify";

const server = fastify();

server.get('/get', (_,res)=>{
    res.send({status: true})
})

async function main(){
    try{
        await server.listen({port:3500});
        console.log(`server running at port 3500`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

main();