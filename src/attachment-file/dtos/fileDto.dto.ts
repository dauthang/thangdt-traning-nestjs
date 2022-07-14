export class FileDto {
  photoId: number;
  fileName: string;
  createdAt: Date;
  updatedAt?: Date;
  isDelete?: boolean;
  path: string;
}
