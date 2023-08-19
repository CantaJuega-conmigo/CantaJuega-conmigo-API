import { Membership } from "./types";
import { v4 as uuidv4 } from 'uuid';

const membreshipId : string[] = [
    uuidv4(),
    uuidv4(),
    uuidv4(),
    uuidv4(),
]

const membershipSeed : Membership[] = [
    {
        id: membreshipId[0],
        name: 'Mensual',
        description: '⦁	Todas las herramientas terapéuticas para niñas y niños de 0 a 6 años',
        price: 49.99,
        duration: 1,
        videos: true,
        music: true,
        therapeuticTools: true,
        recurrenteId:'prod_6sl3mnqq'
        // recurrenteId:'prod_wmqaobmf'
    },
    {
        id: membreshipId[1],
        name: 'Semestral',
        description: '⦁	Todas las herramientas terapéuticas para niñas y niños de 0 a 6 años',
        price: 199.99,
        duration: 6,
        videos: true,
        music: true,
        therapeuticTools: true,
        recurrenteId:'prod_6sl3mnqq'
        // recurrenteId:'prod_wmqaobmf'
    },
    {
        id: membreshipId[2],
        name: 'anual',
        description: '⦁	Todas las herramientas terapéuticas para niñas y niños de 0 a 6 años',
        price: 299.99,
        duration: 12,
        videos: true,
        music: true,
        therapeuticTools: true,
        recurrenteId:'prod_6sl3mnqq'
        // recurrenteId:'prod_wmqaobmf'

    },
    {
        id: membreshipId[3],
        name: 'Canta conmigo',
        description: '⦁	Todas las herramientas terapéuticas para niñas y niños de 0 a 6 años',
        price: 99.99,
        duration: 6,
        videos: false,
        therapeuticTools: false,
        music: true,
        recurrenteId:'prod_6sl3mnqq'
        // recurrenteId:'prod_wmqaobmf'
    }
]



export {
    membershipSeed,
    membreshipId
};