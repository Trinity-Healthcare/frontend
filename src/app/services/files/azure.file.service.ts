import { AnonymousCredential, newPipeline, BlobServiceClient, ContainerClient, BlobItem } from "@azure/storage-blob";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class FileService
{
  mStorageAccount = 'twpstorage'
  mSasToken = '?sv=2019-02-02&ss=bfqt&srt=sco&sp=rwdlacup&se=2024-01-01T14:00:00Z&st=2019-11-18T20:28:29Z&spr=https,http&sig=G7LF28Fyofi%2FbBFR%2FUsgUE4rHsZbI23Yx2lnsvFlaSY%3D';
  mBlobUri: string = 'https://' + this.mStorageAccount + '.blob.core.windows.net';
  mBlobService: BlobServiceClient = null;
  mUserContainer: ContainerClient;
 
  constructor()
  {
    this.mBlobService = new BlobServiceClient(this.mBlobUri + this.mSasToken, newPipeline(new AnonymousCredential()));
  }

  getUserContainer(username: string)
  {
    username = username.toLowerCase();
    let userContainer = this.mBlobService.getContainerClient(username);

    userContainer.exists().then((containerExists) => {

      if(containerExists)
      {
        this.mUserContainer = userContainer;
        console.log("Container already exists for this user.");
      }
      else
      {
        return this.mBlobService.createContainer(username, { access : 'blob' });
      }

    }).then((containerCreateOp) => {

      if(!containerCreateOp && this.mUserContainer)
      {
        return;
      }

      containerCreateOp.containerClient.exists().then((containerExists) => {

        if(containerExists)
        {
          this.mUserContainer = containerCreateOp.containerClient;
          console.log("Container successfully created for this user.");
        }
        else
        {
          console.log("Failed to create container for user.");
        }

      }).catch((e) => {
        console.log(e);
      });
    });
  }

  uploadFile(newFile : File)
  {

    return new Promise((resolve, reject) => {

      this.mUserContainer.uploadBlockBlob(newFile.name, newFile.slice(0, newFile.size -1), newFile.size)
      .then((uploadOp) => {

        return uploadOp.blockBlobClient.exists();

      }).then((uploadSucceeded) => {

        if(uploadSucceeded)
        {
          resolve(this.mBlobUri + '/' + this.mUserContainer.containerName + '/' + escape(newFile.name));
          console.log("Upload succeeded");
        }

        resolve();

      }).catch((e) => 
      {
        console.log(e);
        reject(e);
      });

    });      
  }

  async getLoggedInUserLinks()
  {
    this.getUserLinks(this.mUserContainer.containerName);
  }
  
  async getUserLinks(username : string)
  {
    username = username.toLowerCase();
    let userPhotoLinks = []; 
    let userContainer = this.mBlobService.getContainerClient(username);

    userContainer.exists().then(async (containerExists) => {

      if(containerExists)
      {
        console.log("Container already exists for this user.");

        for await (const blob of userContainer.listBlobsFlat() as AsyncIterable<BlobItem>) {
          console.log(blob.name)
          userPhotoLinks.push(blob.name);
        }

      }
      else
      {
        console.log("This user doesn't seem to have a container.");
      }

      return userPhotoLinks;
    });
  }

}