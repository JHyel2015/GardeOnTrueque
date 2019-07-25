import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { EntityUsers } from '../users/users.entity';
import { EntityPlants } from '../plants/plants.entity';

@Entity('ads')
export class EntityAds {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
            type: 'date',
            name: 'date',
            default: () => 'now()',
        })
    date: string;

    @Column({
        type: 'bool',
        name: 'status',
        default: false,
    })
    status: string;

    @Column({
        type: 'timestamp',
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: string;

    @ManyToOne( type => EntityUsers, user => user.id)
    user: EntityUsers;

    @ManyToOne( type => EntityPlants, plant => plant.id)
    plant: EntityPlants;

}
