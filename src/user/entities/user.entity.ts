import { Child } from 'src/child/entities/child.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 60, unique: true, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 25, unique: true, nullable: true })
  phone: string;

  @Column({type:'boolean', default: false})
  emailVerified: boolean;

  @Column({ type: 'varchar', nullable: true })
  password: string;
 
  @Column({ type: 'varchar', nullable: true })
  recurrenteId: string;

  @OneToOne(()=> Child , child => child.user, {cascade: true})
  @JoinColumn()
  child: Child;

  @OneToMany(() => Payment, (payment) => payment.user)
  payment: Payment[];
  
}

export default User;
