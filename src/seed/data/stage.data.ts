import { v4 as uuidv4 } from 'uuid';
import { Stage } from './types';

const stageId: string[] = [
  uuidv4(),
  uuidv4(),
  uuidv4(),
  uuidv4(),
  uuidv4(),
  uuidv4(),
  uuidv4(),
  uuidv4(),
];

const stageSeed : Stage[] = [
  {
    id: stageId[0],
    name: 'Stage 1',
    description: '0-3 months',
    minAge: 0,
    maxAge: 3,
  },
    {
    id: stageId[1],
    name: 'Stage 2',
    description: '3-6 months',
    minAge: 3,
    maxAge: 6,
    },
    {
    id: stageId[2],
    name: 'Stage 3',
    description: '6-9 months',
    minAge: 6,
    maxAge: 9,
    },
    {
    id: stageId[3],
    name: 'Stage 4',
    description: '9-12 months',
    minAge: 9,
    maxAge: 12, 
    },
    {
    id: stageId[4],
    name: 'Stage 5',
    description: '12-36 months',
    minAge: 12,
    maxAge: 36,
    },
    {
    id: stageId[5],
    name: 'Stage 6',
    description: '36-48 months',
    minAge: 36,
    maxAge: 48,
    },
    {
    id: stageId[6],
    name: 'Stage 7',
    description: '48-60 months',
    minAge: 48,
    maxAge: 60,
    },
    {
    id: stageId[7],
    name: 'Stage 8',
    description: '60-72 months',
    minAge: 60,
    maxAge: 72,
    },

];


export { stageSeed, stageId };
