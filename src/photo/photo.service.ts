import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { User } from '../user/user.entity';
import { CreatePhotoDto } from './dtos/photo.dto';
import { AlbumService } from '../album/album.service';
import { AttachmentFileService } from '../attachment-file/attachment-file.service';
import { FileDto } from '../attachment-file/dtos/fileDto.dto';
import { STATUS } from '../const/constants.const';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    private readonly albumService: AlbumService,
    private readonly attachmentFileService: AttachmentFileService,
  ) {}

  async create(user: User, file, createPhotoDto: CreatePhotoDto) {
    createPhotoDto.userId = user.id;
    createPhotoDto.createdAt = new Date();
    await this.albumService.findOne(createPhotoDto.albumId);
    const photo = await this.photoRepository.findOneBy({
      name: createPhotoDto.name,
    });
    if (photo) {
      throw new HttpException(
        'Photo with this name is exist',
        HttpStatus.NOT_FOUND,
      );
    }
    const photoNew = await this.photoRepository.create({
      ...createPhotoDto,
      status: STATUS.ACTIVE,
    });
    await this.photoRepository.save(photoNew);
    const fileDto: FileDto = {
      photoId: photoNew.id,
      fileName: String(file?.filename),
      createdAt: new Date(),
    };
    // save file
    await this.attachmentFileService.create(fileDto);
    return photoNew;
  }
}
