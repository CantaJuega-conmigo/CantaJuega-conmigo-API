import { User } from "./types";
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { SALT } from 'src/Core/Constants';

const userId = [
    uuidv4(),
    uuidv4(),
    uuidv4(),
]

const password = bcrypt.hashSync('Test1234', SALT);


const userSeed: User[] = [
    {
        id: userId[0],
        firstName: 'Juan',
        lastName: 'Perez',
        email: 'Test@gmail.com',
        phone: '1234567890',
        emailVerified: false,
        password: password,
    },
    {
        id: userId[1],
        firstName: 'Maria',
        lastName: 'Perez',
        email: 'Test1@gmail.com',
        phone: '1234567890',
        emailVerified: false,
        password: password,
    },
    {
        id: userId[2],
        firstName: 'Pedro',
        lastName: 'Perez',
        email: 'Test2@gmail.com',
        phone: '1234567890',
        emailVerified: false,
        password: password,
    },
]

export {
    userSeed,
    userId
};

