import {launchImageLibrary} from 'react-native-image-picker';

export const pickSingleImage = async (selectionLimit: number = 1) => {
  const result = await launchImageLibrary({
    mediaType: 'photo',
    selectionLimit,
  });

  if (result.assets && result.assets.length > 0) {
    return result.assets[0].uri;
  } else {
    throw new Error('이미지가 선택되지 않았습니다.');
  }
};

export const pickMultipleImages = async (selectionLimit: number = 10) => {
  const result = await launchImageLibrary({
    mediaType: 'photo',
    selectionLimit,
  });

  if (result.assets && result.assets.length > 0) {
    return result.assets.map(asset => ({
      uri: asset.uri,
      name: `selectedImage_${asset.fileName}`,
      type: 'image/jpeg',
    }));
  } else {
    throw new Error('이미지가 선택되지 않았습니다.');
  }
};

export const createFormDataFromImages = (assets: any[], fileName: string) => {
  const formData = new FormData();
  assets.forEach((asset, index) => {
    formData.append(fileName, {
      uri: asset.uri,
      name: asset.name || `selectedImage_${index}.jpg`,
      type: asset.type || 'image/jpeg',
    });
  });
  return formData;
};
