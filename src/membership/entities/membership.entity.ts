import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from 'src/core/constants/constants';

@Entity({ name: 'membership' })
export class Membership {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type:'integer',  nullable:false })
  duration:number;

  @Column({ type:'float', nullable:false })
  price:number;

  @Column({ type:'text', nullable:false })
  description:string;

  @Column({ type:'text', nullable:false, unique:true })
  name:string;

  @Column({type:"boolean", default:false})
  therapeuticTools:boolean;

  @Column({type:"boolean", default:false})
  music:boolean;

  @Column({type:"boolean", default:false})
  videos:boolean;

  @Column({type:'enum', enum:Status, default:Status.ACTIVE})
  status:Status;
}
