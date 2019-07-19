import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, Timestamp, OneToMany, PrimaryColumn } from 'typeorm';
import { EntityAds } from '../ads/ads.entity';
import { EntityPlants } from '../plants/plants.entity';
import { EntityChanges } from '../changes/changes.entity';

@Entity('users')
export class EntityUsers {

    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn({
            type: 'varchar',
            length: 50,
            name: 'uid',
            default: 'AAAAAAA',
        })
    uid: string;

    @Column({
        type: 'varchar',
        length: 100,
        name: 'username',
        default: null,
    })
    username: string;

    @Column({
        type: 'varchar',
        length: 100,
        name: 'displayName',
        default: null,
    })
    displayName: string;

    @Column({
        type: 'varchar',
        length: 100,
        name: 'fullname',
        default: null,
    })
    fullname: string;

    @Column({
        type: 'varchar',
        length: 10,
        name: 'cedula',
        default: null,
    })
    cedula: string;

    @Column({
        type: 'varchar',
        length: 100,
        name: 'email',
        default: 'example@example.com',
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 100,
        name: 'address',
        default: null,
    })
    address: string;

    @Column({
        type: 'varchar',
        length: 10,
        name: 'phone',
        default: null,
    })
    phone: string;

    @Column({
        type: 'varchar',
        length: 10,
        name: 'phone2',
        default: null,
    })
    phone2: string;

    @Column({
        type: 'varchar',
        length: 255,
        name: 'facebook',
        default: null,
    })
    facebook: string;

    @Column({
        type: 'varchar',
        length: 255,
        name: 'password',
        default: 'xxxxxxxxx',
    })
    password: string;

    @Column({
        type: 'varchar',
        length: 255,
        name: 'photoUrl',
        default: null,
    })
    photoUrl: string;

    @Column({
        type: 'timestamp',
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: string;

    @OneToMany( type => EntityAds, ad => ad.user)
    ads: EntityAds[];

    @OneToMany( type => EntityPlants, plant => plant.user)
    plants: EntityPlants[];

    @OneToMany( type => EntityChanges, change => change.user)
    changes: EntityChanges[];
}
