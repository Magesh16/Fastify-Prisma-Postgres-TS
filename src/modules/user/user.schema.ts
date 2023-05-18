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

export type CreateUserInput = z.infer<typeof createUserSchema>


export const {schemas: userSchemas, $ref} = buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema
})