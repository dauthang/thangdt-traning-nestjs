import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { PhotoService } from './photo.service';
import { CreateAlbumDto } from '../album/dtos/albumDto.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileDto } from '../album/dtos/fileDto.dto';

@ApiTags('photo-controller')
@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file: FileDto,
    @Body() createAlbumDto: CreateAlbumDto,
  ) {
    return this.photoService.create(file, createAlbumDto);
  }
}
