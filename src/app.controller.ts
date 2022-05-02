import { Controller,Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AzureBlobService } from './azure-blob/azure-blob.service';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller()
export class AppController {
  containerName = "upload-images";
  constructor(
    private readonly azureBlobService: AzureBlobService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('myfile'))
  async upload(@UploadedFile() file: Express.Multer.File): Promise<string> {
    await this.azureBlobService.upload(file,this.containerName);
    return 'uploaded';
  }
}
