import { Body, Controller, Get, Patch, Post } from "@nestjs/common";
import { NoteService } from "./note.service";
import { ApiOperation } from "@nestjs/swagger";
import { CreateNoteDto, UpdateNoteDto } from "./note.dto";

@Controller({path: 'note'})
export class NoteController {
  constructor(private readonly noteService: NoteService) {
    
  }

  @Get("")
  @ApiOperation({
    description: 'Retrieve all note files',
  })
  async getNotes() {
    return await this.noteService.findNotes();
  }

  @Post("")
  @ApiOperation({
    description: 'Create a new note',
  })
  async createNote(@Body() dto: CreateNoteDto) {
    return await this.noteService.createNote(dto);    
  }

  @Patch("")
  @ApiOperation({
    description: 'Update an existing note',
  })
  async updateNote(@Body() dto: UpdateNoteDto) {
    return await this.noteService.updateNote(dto.id, dto);    
  }
}
