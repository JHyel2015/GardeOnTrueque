import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, Timestamp } from 'typeorm';
import { EntityUsers } from '../users/users.entity';
import { EntityPlants } from '../plants/plants.entity';

@Entity('changes')
export class EntityChanges {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
            type: 'varchar',
            length: 100,
            name: 'type',
        })
    type: string;

    @Column({
        type: 'varchar',
        length: 100,
        name: 'name',
    })
    name: string;

    @Column({
        type: 'timestamp',
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: string;

    @ManyToOne( type => EntityUsers, user => user.id)
    user: EntityUsers;

    @ManyToOne( type => EntityPlants, plant => plant.id)
    plant: EntityUsers;
}
