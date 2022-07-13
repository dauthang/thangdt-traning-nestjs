import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { AlbumModule } from '../album/album.module';
import { AttachmentFileModule } from '../attachment-file/attachment-file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Photo]),
    AlbumModule,
    AttachmentFileModule,
  ],
  providers: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
