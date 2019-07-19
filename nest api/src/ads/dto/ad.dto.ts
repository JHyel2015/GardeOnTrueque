import { EntityUsers } from '../../users/users.entity';

export class CreateAdDTO {
    id?: number;
    date?: string;
    status?: string;
    createdAt?: string;
    user?: EntityUsers;
}
