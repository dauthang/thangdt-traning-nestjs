import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Timestamp,
  Table,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class AttachmentFile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @ApiProperty()
  photoId: number;
  @ApiProperty()
  @Column()
  fileName: string;
  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
  @Column()
  isDelete: boolean;
}
