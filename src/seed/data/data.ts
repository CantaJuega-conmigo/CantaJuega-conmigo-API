import { Membership } from "./types";
import * as bcrypt from 'bcrypt';
import { SALT } from 'src/Core/Constants';
import { v4 as uuidv4 } from 'uuid';

const membershipSeed : Membership[] = [
    {
        id: uuidv4(),
        name: 'Mensual',
        description: '⦁	Todas las herramientas terapéuticas para niñas y niños de 0 a 6 años',
        price: 49.99,
        duration: 1,
    },
    {
        id: uuidv4(),
        name: 'Semestral',
        description: '⦁	Todas las herramientas terapéuticas para niñas y niños de 0 a 6 años',
        price: 199.99,
        duration: 6,
    },
    {
        id: uuidv4(),
        name: 'anual',
        description: '⦁	Todas las herramientas terapéuticas para niñas y niños de 0 a 6 años',
        price: 299.99,
        duration: 12,
    },
    {
        id: uuidv4(),
        name: 'Canta conmigo',
        description: '⦁	Todas las herramientas terapéuticas para niñas y niños de 0 a 6 años',
        price: 99.99,
        duration: 6,
    }
]



export {
    membershipSeed
};