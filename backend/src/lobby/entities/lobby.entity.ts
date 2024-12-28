import { Decider } from 'src/decider/entities/decider.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum LobbyStatus {
    Created = 'Создана',
    InProgress = 'В Процессе',
    Completed = 'Завершена',
}


@Entity('lobbies')
export class Lobby {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Decider, decider => decider.lobbies)
    decider: Decider

    @ManyToOne(() => User, user => user.lobbies)
    creator: User

    @Column()
    opponent: number

    @Column({
        type: 'enum',
        enum: LobbyStatus,
        default: LobbyStatus.Created,
    })
    status: LobbyStatus;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
