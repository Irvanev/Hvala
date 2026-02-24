import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, message } from 'antd';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function PhotoUpload({ data, onPhotoUrlsChange, adId }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (data.photoUrls) {
      const initialFileList = data.photoUrls.map((url, index) => ({
        uid: `-${index}`,
        name: `image${index}.png`,
        status: 'done',
        url,
      }));
      setFileList(initialFileList);
    }
  }, [data.photoUrls]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    const newPhotoUrls = newFileList.map(file => file.url || file.response?.url).filter(url => url !== undefined);
    onPhotoUrlsChange(newPhotoUrls);
  };

  const handleUpload = async ({ file, onSuccess, onError }) => {
    const uniqueName = adId
      ? `advertisment/${adId}/${Date.now()}_${file.name}`
      : `images/${Date.now()}_${Math.random().toString(36).slice(2)}_${file.name}`;
    const storageRef = ref(storage, uniqueName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Handle progress
      },
      (error) => {
        onError(error);
        message.error('Upload failed.');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          onSuccess(null, file);
          setFileList((prevList) => {
            // Проверка на дублирование
            if (prevList.some((item) => item.url === downloadURL)) {
              return prevList;
            }
            const updatedList = [
              ...prevList,
              {
                uid: file.uid,
                name: file.name,
                status: 'done',
                url: downloadURL,
              },
            ];
            const newPhotoUrls = updatedList.map(file => file.url).filter(url => url !== undefined);
            onPhotoUrlsChange(newPhotoUrls);
            return updatedList;
          });
          message.success('Upload successful.');
        });
      }
    );
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        customRequest={handleUpload}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
}