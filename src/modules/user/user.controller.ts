import { FastifyRequest, FastifyReply } from "fastify"
import { createUser } from "./user.service";
import { CreateUserInput } from "./user.schema";

let registerUserHandler = async(
    req : FastifyRequest<{
        Body: CreateUserInput
    }>,
    res : FastifyReply
    )=>{
    const body = req.body;
    // console.log({body});
    
    try{
        const user = await createUser(body);
        return res.status(200).send(user);
    }catch(err){
        console.log(err);
        return res.send(500).send(err);
        
    }   
}

export {registerUserHandler}