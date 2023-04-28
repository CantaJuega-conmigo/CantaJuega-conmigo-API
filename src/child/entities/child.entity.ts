import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Gender } from "src/core/constants";
import { Stage } from "src/stage/entities/stage.entity";
import { stageSeed } from "src/seed/data/stage.data";

@Entity({ name: 'child'})
export class Child {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    firstName: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    lastName: string;

    @Column({ type: 'enum',enum:Gender ,default: Gender.other})
    gender: Gender;

    @Column({ type: 'date', nullable: true })
    birthDate: Date;

    @Column({ type: 'int', nullable: true })
    age: number;

    @BeforeInsert()
    @BeforeUpdate()
    calculateAgeInMonths() {
      const today = new Date();
      const yearsDiff = today.getFullYear() - this.birthDate.getFullYear();
      const monthsDiff = (today.getMonth() + 1) - (this.birthDate.getMonth() + 1);
      const totalMonths = yearsDiff * 12 + monthsDiff;
      this.age = totalMonths;
    }

    @OneToOne(() => User, user => user.child)
    user: User;

    @ManyToOne(() => Stage, stage => stage.child)
    stage: Stage;

    // async assignStageByAge(): Promise<void> {
    //   let stage: Stage | undefined;
    //   const allStages = await Stage.find();
    //   for (const s of stageSeed) {
    //     if (this.age >= s.minAge && this.age < s.maxAge) {
    //       stage = await Stage.findOne({ where: { id: s.id } });
    //       break;
    //     }
    //   }
    //   if (stage) {
    //     this.stage = stage;
    //   }
    // }

    
  
}
