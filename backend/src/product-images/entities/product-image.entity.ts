import { Product } from 'src/products/entities/product.entity';
import { Upload } from 'src/uploads/entities/upload.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'product-images' })
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @OneToOne(() => Upload, (upload) => upload.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'image_id' })
  image: Upload;

  @Column({ name: 'is_main', type: 'boolean', default: false })
  isMain?: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
