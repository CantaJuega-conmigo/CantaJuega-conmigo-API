import { PAYMAENT_STATUS } from 'src/core/constants/constants';
import { Membership } from 'src/membership/entities/membership.entity';
import User from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'payment' })
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: PAYMAENT_STATUS,
    default: PAYMAENT_STATUS.pending,
  })
  status: PAYMAENT_STATUS;

  @Column({ type: 'text' })
  recurrenteId: string;

  @Column({ type: 'text' })
  checkout_url: string;

  @Column({ type: 'date' })
  dateOfCreation: Date;

  @Column({ type: 'date', nullable: true })
  dateOfPayment: Date;

  @ManyToOne(() => User, (user) => user.payment)
  user: User;

  @OneToOne(() => Membership , membership => membership.payment)
  @JoinColumn()
  membership: Membership;
  
}
