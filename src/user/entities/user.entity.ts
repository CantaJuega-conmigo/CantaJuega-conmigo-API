import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  firstname: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lastname: string;

  @Column({ type: 'varchar', length: 60, unique: true, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 25, unique: true, nullable: true })
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;
 
}

export default User;
