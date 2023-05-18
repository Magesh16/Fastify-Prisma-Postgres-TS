import prisma from '../../utils/prisma';
import { CreateUserInput, loginInput } from './user.schema';
import { hashPassword } from '../../utils/hash';
import { string } from 'zod';


export async function createUser(input: CreateUserInput) {
    const { password, ...rest } = input;
  
    const { hash, salt } = hashPassword(password);
  
    const user = await prisma.user.create({
      data: { ...rest, salt, password: hash },
    });
  
    return user;
  }

export async function findByEmail(email: string) {
    return prisma.user.findUnique({
        where:{
            email
        }
    })
}

export async function findUsers(){
    return prisma.user.findMany({
        select:{
            email: true,
            name :true,
            id:true
        }
    });
}