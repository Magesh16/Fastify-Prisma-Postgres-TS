import { FastifyRequest, FastifyReply } from "fastify"
import { createUser, findByEmail, findUsers } from "./user.service";
import { CreateUserInput, loginInput } from "./user.schema";
import { verifyPassword } from "../../utils/hash";
import { server } from "../../app";

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

const loginHandler = async(
    req : FastifyRequest<{
        Body:loginInput
    }>,
    res:FastifyReply
)=>{
    const body = req.body;

    const user = await findByEmail(body.email);
    if(!user){
        return res.code(401).send("Invalid email or password");
    }

    const correctPassword = verifyPassword({
        candidatePassword: body.password,
        salt : user.salt,
        hash: user.password
    })

    if(correctPassword){
        const {password, salt, ...rest} = user;
        return {accessToken: server.jwt.sign(rest)}
    }
}

const getUserHandler = async()=>{
    const users = await findUsers();
    return users;
}
export {registerUserHandler, loginHandler, getUserHandler}