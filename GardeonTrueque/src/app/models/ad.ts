import { PlantInterface } from './plant';
import { UserInterface } from './user';

export interface AdInterface {
    id?: string;
    date?: string;
    status?: boolean;
    createdAt?: string;
    user?: UserInterface;
    plant?: PlantInterface;
}
