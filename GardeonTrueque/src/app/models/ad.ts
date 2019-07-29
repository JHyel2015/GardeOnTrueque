import { PlantInterface } from './plant';

export interface AdInterface {
    id?: string;
    date?: string;
    status?: string;
    createdAt?: boolean;
    plant?: PlantInterface;
}
