import { MapEntity } from 'src/maps/entities/map.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('deciders')
export class Decider {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    creator: number

    @ManyToMany(() => MapEntity, map => map.deciders)
    maps: MapEntity[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
