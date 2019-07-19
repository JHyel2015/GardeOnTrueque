import { EntityUsers } from '../../users/users.entity';
import { EntityPlants } from '../../plants/plants.entity';

export class CreateChangeDTO {
    id?: number;
    type?: string;
    name?: string;
    createdAt?: string;
    user?: EntityUsers;
    plant?: EntityPlants;
}
