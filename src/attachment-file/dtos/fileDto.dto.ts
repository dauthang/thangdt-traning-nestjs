export class FileDto {
  photoId: string;
  fileName: string;
  createdAt: Date;
  updatedAt?: Date;
  isDelete?: boolean;
  path: string;
}
