import { FastifyInstance } from "fastify"; 
import {registerUserHandler} from '../user/user.controller';

const userRoute = async(server : FastifyInstance) =>{
    server.post("/", registerUserHandler);
}

export default userRoute;