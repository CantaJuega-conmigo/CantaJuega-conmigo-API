import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from 'src/core/constants/constants';

@Entity({ name: 'membership' })
export class Membership {
  
  @PrimaryGeneratedColumn()
  id:number

  @Column({ type:'integer', unique:true, nullable:false })
  duration:number;

  @Column({ type:'float', nullable:false })
  price:number;

  @Column({type:'enum', enum:Status, default:Status.ACTIVE})
  status:Status;
}
