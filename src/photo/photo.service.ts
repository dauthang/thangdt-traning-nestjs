import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { CreateAlbumDto } from '../album/dtos/albumDto.dto';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly albumRepository: Repository<Photo>,
  ) {}

  async create(file, createAlbumDto: CreateAlbumDto) {
    return;
  }
}
