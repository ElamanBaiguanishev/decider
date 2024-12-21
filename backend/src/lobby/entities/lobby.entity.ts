import { Decider } from 'src/decider/entities/decider.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('lobbies')
export class Lobby {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string

    @ManyToOne(() => Decider, decider => decider.lobbies)
    decider: Decider

    @ManyToOne(() => User, user => user.lobbies)
    creator: User

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
