import { Module } from '@nestjs/common';
import { AttachmentFileController } from './attachment-file.controller';
import { AttachmentFileService } from './attachment-file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachmentFile } from './attachment-file.entity';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([AttachmentFile])],
  exports: [AttachmentFileService],
  controllers: [AttachmentFileController],
  providers: [AttachmentFileService],
})
export class AttachmentFileModule {}
