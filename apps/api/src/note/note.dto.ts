import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Length(0, 1000)
  content?: string;

  @ApiProperty()
  @IsUUID()
  userId: string;
}

export class UpdateNoteDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiPropertyOptional()
  title?: string;

  @ApiPropertyOptional()
  content?: string;

  @ApiPropertyOptional()
  status?: string;
}
