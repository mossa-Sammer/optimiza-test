import { Entity, Column } from 'typeorm';
import Model from './Model';

@Entity('products')
export class Product extends Model {
  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  imageUrl!: string;

  @Column()
  category!: string;

  @Column({ type: 'double' })
  price!: number;
}
