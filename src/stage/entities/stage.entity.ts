import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Child } from 'src/child/entities/child.entity';

@Entity({ name: 'stage' })
export class Stage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true})
  minAge: number;

  @Column({ nullable: true})
  maxAge: number;

  @OneToMany(() => Child, (child) => child.stage)
  child: Child[];
}
