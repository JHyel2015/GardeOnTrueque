import { EntityUsers } from '../../users/users.entity';
import { EntityPlants } from '../../plants/plants.entity';

export class CreateAdDTO {
    id?: number;
    date?: string;
    status?: string;
    createdAt?: string;
    user?: EntityUsers;
    plant?: EntityPlants;
}
