import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AttachmentFile } from './attachment-file.entity';
import { FileDto } from './dtos/fileDto.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AttachmentFileService {
  constructor(
    @InjectRepository(AttachmentFile)
    private readonly repo: Repository<AttachmentFile>,
  ) {}
  async create(fileDto: FileDto) {
    return await this.repo.save(fileDto);
  }
}
