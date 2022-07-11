import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @ApiProperty()
  name: string;
  @ApiProperty()
  @Column()
  userName: string;
  @ApiProperty()
  @Column()
  password: string;
  @ApiProperty()
  @Column()
  email: string;
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
