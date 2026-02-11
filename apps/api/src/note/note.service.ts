import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entity/note.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateNoteDto } from './note.dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>,
  ) {}

  async findNotes(options?: FindManyOptions<Note>) {
    return await this.noteRepository.find(options);
  }

  async findNote(options: FindOneOptions<Note>) {
    return await this.noteRepository.findOne(options);
  }

  async createNote(dto: CreateNoteDto) {
    try {
      const note = await this.noteRepository.create(dto);
      return await this.noteRepository.save(note);
    } catch (error) {
      throw new BadRequestException('Failed to create note');
    }
  }

  async updateNote(id: string, dto: Partial<CreateNoteDto>) {
    const currentNote = await this.noteRepository.findOne({ where: { id } });
    if (!currentNote) {
      throw new BadRequestException('Note not found');
    }

    const updatedNote = Object.assign(currentNote, dto);
    return await this.noteRepository.save(updatedNote);
  }

  async deleteNote(id: string) {
    const result = await this.noteRepository.delete(id);
    if (result.affected === undefined || result.affected === null) {
      throw new BadRequestException('Failed to delete note');
    }
    return result.affected > 0;
  }
}
