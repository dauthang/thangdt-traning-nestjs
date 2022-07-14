import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  @ApiProperty()
  name: string;
  @ApiProperty()
  @Column()
  description: string;
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
  status: string;
}
