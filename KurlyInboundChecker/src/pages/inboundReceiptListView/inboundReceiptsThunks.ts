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
          inboundTypeCheckList: [],
          inboundStatus: 'READY',
          products: [
            {
              goodsCode: 'MK1000068929',
              goodsName: '[채선당] 샤브샤브',
              barcode: '8809695552076',
              expiredDate: '2024-12-19',
              boxCount: 30,
              unitPerBoxCount: 150,
              weight: '150g',
              description: '',
              imageUrl:
                'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/832d4251-ecd4-40d6-9d8c-e2784b94726a.jpg',
              checkList: [],
            },
            {
              goodsCode: 'MK1000068921',
              goodsName: '[근대골목단팥빵] 옛날소시지빵',
              barcode: '8809693332076',
              expiredDate: '2025-02-24',
              boxCount: 30,
              unitPerBoxCount: 150,
              weight: '150g',
              description: '',
              imageUrl:
                'https://img-cf.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/shop/data/goods/1593145771621l0.jpg',
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
          inboundTypeCheckList: [],
          inboundStatus: 'READY',
          products: [
            {
              goodsCode: 'MK1000068922',
              goodsName: '[오뗄블랙라벨] 제주돼지로 만든 비엔나 소시지 250g',
              barcode: '8802266186502',
              expiredDate: '2025-01-09',
              boxCount: 30,
              unitPerBoxCount: 150,
              weight: '150g',
              description: '',
              imageUrl:
                'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/ab0d09e0-001a-4962-8109-c139101c2bb7.jpeg',
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
          inboundTypeCheckList: [],
          inboundStatus: 'READY',
          products: [
            {
              goodsCode: 'MK1000068333',
              goodsName: '필라델피아 오븐 장갑(IVORY)',
              barcode: '8801037138177',
              expiredDate: '2025-02-24',
              boxCount: 30,
              unitPerBoxCount: 150,
              weight: '150g',
              description: '',
              imageUrl:
                'https://cdn.011st.com/11dims/resize/1000x1000/quality/75/11src/asin/B07RD829TM/B.jpg?1734389465292',
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
          inboundType: 'NORMAL',
          inboundTypeCheckList: [],
          inboundStatus: 'READY',
          products: [
            {
              goodsCode: 'MK1000068777',
              goodsName: '[오뗄블랙라벨] 제주돼지로 만든 비엔나 소시지 250g',
              barcode: '8802266186502',
              expiredDate: '2025-01-09',
              boxCount: 30,
              unitPerBoxCount: 150,
              weight: '150g',
              description: '',
              imageUrl:
                'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/ab0d09e0-001a-4962-8109-c139101c2bb7.jpeg',
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
          inboundTypeCheckList: [],
          inboundStatus: 'READY',
          products: [
            {
              goodsCode: 'MK1000099999',
              goodsName: '[롯데] 의성마늘 소세지',
              barcode: '8801123308910',
              expiredDate: '2025-01-24',
              boxCount: 30,
              unitPerBoxCount: 150,
              weight: '150g',
              description: '',
              imageUrl:
                'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/c0a24f3d-ed21-40c8-9c44-3d8d3a95752a.jpg',
              checkList: [],
            },
          ],
        },
      ];

      const updatedResponse = await Promise.all(
        response.map(async receipt => ({
          ...receipt,
          inboundTypeCheckList: await getAllParcelTypeCheckItems(
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
