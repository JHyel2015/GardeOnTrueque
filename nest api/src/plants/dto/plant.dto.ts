import { EntityUsers } from '../../users/users.entity';

export class CreatePlantDTO {
    id?: number;
    type?: string;
    name?: string;
    image?: string;
    description?: string;
    createdAt?: string;
    user?: EntityUsers;
}
