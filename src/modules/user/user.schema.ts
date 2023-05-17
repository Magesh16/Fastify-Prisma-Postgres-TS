import {z} from 'zod';

const createUserSchema = z.object({
    email : z.string({
        required_error: 'Email is required',
        invalid_type_error : 'Email must be string'
    }).email(),
    name: z.string(),
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error : 'Password must be valid'
    })
})

export type createUserInput = z.infer<typeof createUserSchema>