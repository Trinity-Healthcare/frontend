import { AnonymousCredential, newPipeline, BlobServiceClient, ContainerClient, BlobItem } from "@azure/storage-blob";


export class FileService
{
  mStorageAccount = 'twptest'
  mSasToken = '?sv=2019-02-02&ss=b&srt=sco&sp=rwdlac&se=2019-11-05T07:44:19Z&st=2019-11-04T23:44:19Z&spr=https,http&sig=9Kd%2FQW6D%2BuZrEBqWY80ecjX7QmffO7b2LcN4aF43%2F5o%3D';
  mBlobUri: string = 'https://' + this.mStorageAccount + '.blob.core.windows.net';
  mBlobService: BlobServiceClient = null;
  mUserContainer: ContainerClient;
 
  constructor()
  {
    this.mBlobService = new BlobServiceClient(this.mBlobUri + this.mSasToken, newPipeline(new AnonymousCredential()));
  }

  getUserContainer(username: string)
  {
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

        resolve("");

      }).catch((e) => 
      {
        console.log(e);
      }).finally(() => {
        resolve();
      })

    });      
  }

  async getLoggedInUserLinks()
  {
    this.getUserLinks(this.mUserContainer.containerName);
  }
  
  async getUserLinks(username : string)
  {
    let userContainer = this.mBlobService.getContainerClient(username);

    userContainer.exists().then(async (containerExists) => {

      if(containerExists)
      {
        console.log("Container already exists for this user.");

        let userPhotoLinks = []; 

        for await (const blob of userContainer.listBlobsFlat() as AsyncIterable<BlobItem>) {
          userPhotoLinks.push(this.mBlobUri + '/' + userContainer.containerName + '/' + escape(blob.name));
        }

      return userPhotoLinks;

      }
      else
      {
        throw(Error);
      }

    });
  }

}