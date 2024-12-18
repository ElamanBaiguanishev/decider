import { Decider } from 'src/decider/entities/decider.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('maps')
export class MapEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    map_mode: string

    @Column()
    icon_path: string

    @Column()
    description: string

    @Column()
    author: string

    @Column()
    order: string

    @ManyToMany(() => Decider, decider => decider.maps)
    @JoinTable()
    deciders: Decider[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
