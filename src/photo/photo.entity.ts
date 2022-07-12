import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @ApiProperty()
  name: string;
  @ApiProperty()
  @Column()
  userId: string;
  @ApiProperty()
  @Column()
  albumId: number;
  @ApiProperty()
  @Column()
  link: string;
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
