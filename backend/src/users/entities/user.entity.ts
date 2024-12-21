import { Decider } from "src/decider/entities/decider.entity";
import { Lobby } from "src/lobby/entities/lobby.entity";
import { MapEntity } from "src/maps/entities/map.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @OneToMany(() => Lobby, lobby => lobby.creator)
    lobbies: Lobby[]

    @OneToMany(() => MapEntity, map => map.uploader)
    maps: MapEntity[]

    @OneToMany(() => Decider, decider => decider.creator)
    deciders: MapEntity[]
}
