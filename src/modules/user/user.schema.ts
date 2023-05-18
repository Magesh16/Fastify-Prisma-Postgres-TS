import {z} from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const repeatedField = {
                    email : z.string({
                        required_error: 'Email is required',
                        invalid_type_error : 'Email must be string'
                    }).email(),
                    name: z.string()
                }
const createUserSchema = z.object({
        ...repeatedField,
        password: z.string({
        required_error: 'Password is required',
        invalid_type_error : 'Password must be valid'
    })
})

const createUserResponseSchema = z.object({
    id : z.number(),
    ...repeatedField,    

})

const loginSchema = z.object({
    email : z.string({
        required_error: 'Email is required',
        invalid_type_error : 'Email must be string'
    }).email(),
    password: z.string()
})

const loginResponse = z.object({
    accessToken : z.string()
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type loginInput = z.infer<typeof loginSchema>



export const {schemas: userSchemas, $ref} = buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginResponse
})