const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sharp = require('sharp');
const { Storage } = require('@google-cloud/storage');

admin.initializeApp();
const storage = new Storage();

exports.generateThumbnail = functions.storage.object().onFinalize(async (object) => {
  const bucket = storage.bucket(object.bucket);
  const filePath = object.name;
  const fileName = filePath.split('/').pop();
  const thumbFilePath = `thumbnails/${fileName}`;
  const tempFilePath = `/tmp/${fileName}`;

  if (fileName.startsWith('thumb_')) {
    console.log('Already a Thumbnail.');
    return null;
  }

  await bucket.file(filePath).download({ destination: tempFilePath });
  await sharp(tempFilePath)
    .resize(200, 200)
    .toFile(tempFilePath);

  await bucket.upload(tempFilePath, {
    destination: thumbFilePath,
  });

  return null;
});