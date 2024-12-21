import { Lobby } from 'src/lobby/entities/lobby.entity';
import { MapEntity } from 'src/maps/entities/map.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity('deciders')
export class Decider {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToMany(() => MapEntity, map => map.deciders)
    maps: MapEntity[];

    @OneToMany(() => Lobby, lobby => lobby.decider)
    lobbies: Lobby[]

    @ManyToOne(() => User, user => user.deciders)
    creator: User

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
