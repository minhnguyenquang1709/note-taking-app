import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ENoteStatus, TableName } from '@repo/shared-types';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity(TableName.NOTE)
export class Note {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  content: string;

  @Column('uuid')
  @ApiProperty()
  userId: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  @ApiPropertyOptional()
  updatedAt?: Date;

  @Column({
    default: ENoteStatus.ACTIVE,
  })
  @ApiProperty()
  status: ENoteStatus;
}
