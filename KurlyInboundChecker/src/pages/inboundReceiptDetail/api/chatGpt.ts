import axiosInstance from '@modules/axiosConfig';

export interface GptResponse {
  result: string;
  reason: string;
}

export interface GptProductCheckResponse {
  checkType: string;
  result: string;
  reason: string;
}

export function getGptCheck(
  formData: FormData,
  prompt: string,
): Promise<GptResponse> {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post('ai-checker', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {
          prompt: prompt,
        },
      })
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

export function getAllPictureCheck(
  formData: FormData,
  barcodeNumber: string,
  expiredDate: string,
): Promise<Array<GptProductCheckResponse>> {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(
        `product-checker?barcodeNumber=${barcodeNumber}&expiredDate=${expiredDate}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}
