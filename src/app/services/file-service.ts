
export class FileService
{
  mStorageAccount = 'twptest'
  mSasToken = '?sv=2019-02-02&ss=b&srt=sco&sp=rwdlac&se=2019-11-05T07:44:19Z&st=2019-11-04T23:44:19Z&spr=https,http&sig=9Kd%2FQW6D%2BuZrEBqWY80ecjX7QmffO7b2LcN4aF43%2F5o%3D';
  mBlobUri: string = 'https://' + this.mStorageAccount + '.blob.core.windows.net';
  // mBlobService: azure.BlobService = null;
 
  constructor()
  {
    // this.mBlobService = azure.createBlobServiceWithSas(this.mBlobUri, this.mSasToken);
  }

}