import { Entity, Column } from 'typeorm';
import Model from './Model';

@Entity('users')
export class User extends Model {
  @Column({
    nullable: true,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 150,
    unique: true,
  })
  email!: string;

  @Column()
  password!: string;

  @Column()
  phone!: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;
}
