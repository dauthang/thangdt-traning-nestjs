import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './album.entity';
import { CreateAlbumDto } from './dtos/albumDto.dto';
import { STATUS } from '../const/constants.const';
import { UpdateAlbumDto } from './dtos/updateAlbumDto.dto';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  public async create(createUserDto: CreateAlbumDto) {
    const album = await this.albumRepository.findBy({
      name: createUserDto.name,
    });
    if (album && album.length > 0) {
      throw new HttpException('Album exits', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return await this.albumRepository.save({
      ...createUserDto,
      status: STATUS.ACTIVE,
      createdAt: new Date(),
    });
  }

  async findAll() {
    return this.albumRepository.find();
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOneBy({ id });
    if (album) {
      return album;
    }
    throw new HttpException(
      'Album with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.findOne(id);
    return this.albumRepository.save({
      ...album,
      ...updateAlbumDto,
      updatedAt: new Date(),
    });
  }

  async remove(id: number) {
    return this.albumRepository.delete(id);
  }
}
