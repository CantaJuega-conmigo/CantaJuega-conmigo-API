import { v4 as uuidv4 } from 'uuid';
import { Child } from './types';
import { Gender } from 'src/core/constants';


const childId : string[] = [
    uuidv4(),
    uuidv4(),
]

const childSeed : Child[] = [
    {
        id: childId[0],
        firstName: 'Juan',
        lastName: 'Perez',
        birthDate: new Date('2020-01-01'),
        gender: Gender.male
    },
    {
        id: childId[1],
        firstName: 'Maria',
        lastName: 'Perez',
        birthDate: new Date('2023-01-01'),
        gender:Gender.female
    },
]

export {
    childSeed,
    childId
};