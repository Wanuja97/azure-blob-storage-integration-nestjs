import { Injectable } from '@nestjs/common';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
@Injectable()
export class AzureBlobService {
    azureConnection = process.env.AZURE_STORAGE_CONNECTION_STRING 
    containerName = ""

    getBlobClient(imageName:string):BlockBlobClient{
        const blobClientService = BlobServiceClient.fromConnectionString(this.azureConnection);
        const containerClient = blobClientService.getContainerClient(this.containerName);
        const blobClient = containerClient.getBlockBlobClient(imageName);
        return blobClient;
      }
     
      async upload(file:Express.Multer.File,containerName:string){
        console.log(this.azureConnection)
        this.containerName = containerName
        const blobClient = this.getBlobClient(file.originalname);
        await blobClient.uploadData(file.buffer);
        console.log('Im from upload function');
      }
}

