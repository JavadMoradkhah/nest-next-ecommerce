import { Category } from 'src/categories/entities/category.entity';
import { ProductImage } from 'src/product-images/entities/product-image.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  images: ProductImage[];

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 9, scale: 2 })
  price: number;

  @Column({ type: 'smallint', nullable: true })
  discount?: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
