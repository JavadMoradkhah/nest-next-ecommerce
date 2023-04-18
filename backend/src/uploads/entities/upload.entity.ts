import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export const enum UploadType {
  IMAGE = 'image',
}

@Entity({ name: 'uploads' })
export class Upload {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: [UploadType.IMAGE] })
  type: UploadType;

  @Column({ name: 'file_name', type: 'varchar', length: 255 })
  fileName: string;

  @Column({ type: 'varchar', length: 255 })
  location: string;

  @Column({
    name: 'file_url',
    generatedType: 'STORED',
    asExpression: `location || file_name`,
  })
  fileUrl: string;

  @Column({ type: 'varchar', length: 255 })
  alt: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
