import { uuid } from 'uuidv4';
import { Injectable } from '@nestjs/common';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
@Injectable()
export class AzureBlobService {
    readonly azureConnection = process.env.AZURE_STORAGE_CONNECTION_STRING ;
    containerName :string;
    
    // Upload file
    getBlobClient(imageName:string):BlockBlobClient{
        const blobClientService = BlobServiceClient.fromConnectionString(this.azureConnection);
        const containerClient = blobClientService.getContainerClient(this.containerName);
        const blobClient = containerClient.getBlockBlobClient(imageName);
        return blobClient;
      }
     
      async upload(file:Express.Multer.File,containerName:string){
        this.containerName = containerName
        const blobClient = this.getBlobClient(uuid()+file.originalname);
        await blobClient.uploadData(file.buffer);
    
      }
    //   read file from azureblob
      async getfile(fileName: string,containerName:string){
        this.containerName= containerName;
        const blobClient = this.getBlobClient(fileName);
        const blobDownloaded = await blobClient.download();
        return blobDownloaded.readableStreamBody;
      }
    
       
}

