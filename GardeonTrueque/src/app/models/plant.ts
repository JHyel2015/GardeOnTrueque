import { UserInterface } from './user';

export interface PlantInterface {
    id?: number;
    type?: string;
    name?: string;
    image?: string;
    description?: string;
    createdAt?: string;
    user?: UserInterface;
}
