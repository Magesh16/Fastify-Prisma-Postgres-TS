import { FastifyInstance } from "fastify"; 
import {registerUserHandler} from '../user/user.controller';
import { $ref } from "./user.schema";

const userRoute = async(server : FastifyInstance) =>{
    server.post(
        "/",
        {
          schema: {
            body: $ref("createUserSchema"),
            response: {
              200: $ref("createUserResponseSchema"),
            },
          },
        },
        registerUserHandler
      );
}

export default userRoute;