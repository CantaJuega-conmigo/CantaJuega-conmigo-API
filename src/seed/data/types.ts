import CreateChildDto from "src/child/dto/create-child.dto";

export interface Membership {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    therapeuticTools: boolean;
    music: boolean;
    videos: boolean;
}

interface Child extends CreateChildDto {
    id: string;
}



export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    emailVerified: boolean;
    password: string;
    child?: Child;
}