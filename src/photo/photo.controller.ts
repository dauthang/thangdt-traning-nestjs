import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { PhotoService } from './photo.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileDto } from '../album/dtos/fileDto.dto';
import JwtAuthenticationGuard from '../auth/guards/jwt-authentication.guard';
import RequestWithUser from '../auth/interfaces/requestWithUser.interface';
import { CreatePhotoDto } from './dtos/photo.dto';
import LocalFilesInterceptor from '../components/interceptors/localFiles.interceptor';
@ApiTags('photo-controller')
@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'file',
      path: '/imgPhoto',
    }),
  )
  create(
    @Req() request: RequestWithUser,
    @UploadedFile() file: FileDto,
    @Body() createPhotoDto: CreatePhotoDto,
  ) {
    return this.photoService.create(request.user, file, createPhotoDto);
  }
}
