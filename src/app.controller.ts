import { Controller,Get,Header,Post, Query, Res,Delete, UploadedFile, UseInterceptors, Param } from '@nestjs/common';
import { AzureBlobService } from './azure-blob/azure-blob.service';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller()
export class AppController {
  containerName = "upload-images";
  constructor(
    private readonly azureBlobService: AzureBlobService,
  ) {}
// upload file
  @Post('upload')
  @UseInterceptors(FileInterceptor('myfile'))
  async upload(@UploadedFile() file: Express.Multer.File): Promise<string> {
    await this.azureBlobService.upload(file,this.containerName);
    return 'file uploaded';
  }

// read file
  @Get('read-image')
  @Header('Content-Type','image/jpeg')
  async readImage(@Res() res,@Query('filename') filename){
    const file = await this.azureBlobService.getfile(filename,this.containerName);
    return file.pipe(res);
  }

// delete file
  @Delete('/:filename')
  async delete(@Param('filename') filename){
   await this.azureBlobService.deletefile(filename,this.containerName);
   return "deleted";
  }
// download file
  @Get('download-image')
  @Header('Content-Type','image/jpeg')
  @Header('Content-Disposition', 'attachment; filename=download.jpeg')
  async downloadImage(@Res() res,@Query('filename') filename){
      const file = await this.azureBlobService.getfile(filename,this.containerName);
      return file.pipe(res);
  }
  
}
