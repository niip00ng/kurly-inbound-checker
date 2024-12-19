import {Dispatch} from 'redux';
import {InboundReceiptItem} from './inboundReceiptsSlice';
import {setInboundReceipts, setLoadingSlice} from './inboundReceiptsSlice';
import {getAllCheckItems} from './inboundProductCheckItemStorage';
import {getAllParcelTypeCheckItems} from './inboundParcelTypeCheckItemStorage';

export const fetchInboundReceipts = () => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(setLoadingSlice(true));

    try {
      // Mock API 호출 (실제 API로 교체 가능)
      const response: Array<InboundReceiptItem> = [
        {
          code: 'T20241115_NLPH9',
          inboundDate: '2024-12-25(수)',
          inboundOrderDate: '2024-12-16(토)',
          inboundSimplePlace: '김포냉동(켄달 2층)',
          inboundPlace:
            '경기도 김포시 아라육로 75 켄달스퀘어 김포LP 2층 B202~206',
          inboundType: 'NORMAL',
          inboundTypeCkeckList: [],
          inboundStatus: 'READY',
          products: [
            {
              goodsCode: 'MK0000068920',
              goodsName: '[신선설농탕] 고기 설렁탕',
              barcode: '8802266186502',
              expiredDate: '2025-02-24',
              boxCount: 30,
              unitPerBoxCount: 150,
              weight: '150g',
              description: '',
              imageUrl:
                'https://product-image.kurly.com/hdims/resize/%5E%3E720x%3E936/cropcenter/720x936/quality/85/src/product/image/11f8dda6-b802-4ad8-a675-d55d8ea18c38.jpeg',
              checkList: [],
            },
            {
              goodsCode: 'MK0000068921',
              goodsName: '[신선설농탕] 감자 설렁탕',
              barcode: '8802266186502',
              expiredDate: '2025-02-24',
              boxCount: 30,
              unitPerBoxCount: 150,
              weight: '150g',
              description: '',
              imageUrl:
                'https://product-image.kurly.com/hdims/resize/%5E%3E720x%3E936/cropcenter/720x936/quality/85/src/product/image/11f8dda6-b802-4ad8-a675-d55d8ea18c38.jpeg',
              checkList: [],
            },
          ],
        },
        {
          code: 'T20241115_NLQ24',
          inboundDate: '2024-10-26(화)',
          inboundOrderDate: '2024-10-30(금)',
          inboundSimplePlace: '김포냉동(켄달 2층)',
          inboundPlace:
            '경기도 김포시 아라육로 75 켄달스퀘어 김포LP 2층 B202~206',
          inboundType: 'PARCEL',
          inboundTypeCkeckList: [],
          inboundStatus: 'END',
          products: [
            {
              goodsCode: 'MK0000068922',
              goodsName: '[신선설농탕] 고기 설렁탕',
              barcode: '8802266186502',
              expiredDate: '2025-02-24',
              boxCount: 30,
              unitPerBoxCount: 150,
              weight: '150g',
              description: '',
              imageUrl:
                'https://product-image.kurly.com/hdims/resize/%5E%3E720x%3E936/cropcenter/720x936/quality/85/src/product/image/11f8dda6-b802-4ad8-a675-d55d8ea18c38.jpeg',
              checkList: [],
            },
          ],
        },
        {
          code: 'T20241115_NLQ27',
          inboundDate: '2024-10-26(화)',
          inboundOrderDate: '2024-10-30(금)',
          inboundSimplePlace: '김포냉동(켄달 2층)',
          inboundPlace:
            '경기도 김포시 아라육로 75 켄달스퀘어 김포LP 2층 B202~206',
          inboundType: 'PARCEL',
          inboundTypeCkeckList: [],
          inboundStatus: 'END',
          products: [
            {
              goodsCode: 'MK0000068922',
              goodsName: '[신선설농탕] 고기 설렁탕',
              barcode: '8802266186502',
              expiredDate: '2025-02-24',
              boxCount: 30,
              unitPerBoxCount: 150,
              weight: '150g',
              description: '',
              imageUrl:
                'https://product-image.kurly.com/hdims/resize/%5E%3E720x%3E936/cropcenter/720x936/quality/85/src/product/image/11f8dda6-b802-4ad8-a675-d55d8ea18c38.jpeg',
              checkList: [],
            },
          ],
        },
        {
          code: 'T20241115_NLQ28',
          inboundDate: '2024-10-26(화)',
          inboundOrderDate: '2024-10-30(금)',
          inboundSimplePlace: '김포냉동(켄달 2층)',
          inboundPlace:
            '경기도 김포시 아라육로 75 켄달스퀘어 김포LP 2층 B202~206',
          inboundType: 'PARCEL',
          inboundTypeCkeckList: [],
          inboundStatus: 'END',
          products: [
            {
              goodsCode: 'MK0000068922',
              goodsName: '[신선설농탕] 고기 설렁탕',
              barcode: '8802266186502',
              expiredDate: '2025-02-24',
              boxCount: 30,
              unitPerBoxCount: 150,
              weight: '150g',
              description: '',
              imageUrl:
                'https://product-image.kurly.com/hdims/resize/%5E%3E720x%3E936/cropcenter/720x936/quality/85/src/product/image/11f8dda6-b802-4ad8-a675-d55d8ea18c38.jpeg',
              checkList: [],
            },
          ],
        },
        {
          code: 'T20241115_NLQ22',
          inboundDate: '2024-10-26(화)',
          inboundOrderDate: '2024-10-30(금)',
          inboundSimplePlace: '김포냉동(켄달 2층)',
          inboundPlace:
            '경기도 김포시 아라육로 75 켄달스퀘어 김포LP 2층 B202~206',
          inboundType: 'PARCEL',
          inboundTypeCkeckList: [],
          inboundStatus: 'END',
          products: [
            {
              goodsCode: 'MK0000068922',
              goodsName: '[신선설농탕] 고기 설렁탕',
              barcode: '8802266186502',
              expiredDate: '2025-02-24',
              boxCount: 30,
              unitPerBoxCount: 150,
              weight: '150g',
              description: '',
              imageUrl:
                'https://product-image.kurly.com/hdims/resize/%5E%3E720x%3E936/cropcenter/720x936/quality/85/src/product/image/11f8dda6-b802-4ad8-a675-d55d8ea18c38.jpeg',
              checkList: [],
            },
          ],
        },
      ];

      const updatedResponse = await Promise.all(
        response.map(async receipt => ({
          ...receipt,
          inboundTypeCkeckList: await getAllParcelTypeCheckItems(
            receipt.code,
            receipt.inboundType,
          ),
          products: await Promise.all(
            receipt.products.map(async product => ({
              ...product,
              checkList: await getAllCheckItems(
                receipt.code,
                product.goodsCode,
              ), // 비동기 호출
            })),
          ),
        })),
      );

      dispatch(setInboundReceipts(updatedResponse));
    } catch (error) {
      console.error('Failed to fetch inbound receipts:', error);
    } finally {
      // 로딩 종료
      dispatch(setLoadingSlice(false));
    }
  };
};
