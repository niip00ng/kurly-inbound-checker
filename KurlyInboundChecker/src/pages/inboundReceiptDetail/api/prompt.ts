export function getProductCheckPrompt(
  checkId: string,
  gooodsBarcode: string,
  expireDate: string,
) {
  const resultFormat = `결과는 아래 형식 중 하나로 작성해 주세요.  
    
    정확할 경우:   {"result": "pass", "reason": ""}  
    틀렸을 경우 (잘못된 항목과 이유를 포함):   {"result": "fail", "reason": ""}  
    확인할 수 없는 오류가 발생한 경우:   {"result": "unknown", "reason": ""}`;

  if (checkId === 'product_barcode_equal') {
    return `다음 정보를 확인하세요. 
    1. 상품 사진에 보이는 바코드가 ${gooodsBarcode} 값과 동일한가?
    ${resultFormat}
    `;
  } else if (checkId === 'product_expirationDate_equal_or_future') {
    return `다음 정보를 확인하세요. 
    1. 상품에 기재된 소비기한 (유통기한)이 ${expireDate} 와 같거나 그 이후인가?
    ${resultFormat}
    `;
  } else if (checkId === 'product_korean_labeling_exist') {
    return `다음 정보를 확인하세요. 
    1. 상품 라벨지에 한글표시사항이 존재해야 합니다.?
    ${resultFormat}
    `;
  } else if (checkId === 'product_price_exist') {
    return `다음 정보를 확인하세요. 
    1. 상품 라벨지에 상품가격이 보이면 안된다.
    ${resultFormat}
    `;
  } else if (checkId === 'product_expirationDate_equal_box') {
    return `다음 정보를 확인하세요. 
    1. 상품의 소비기한과 박스의 소비기한은 동일해야 합니다..
    ${resultFormat}
    `;
  } else if (checkId === 'box_product_barcode_different') {
    return `다음 정보를 확인하세요.
    1. 사진상에 박스에 부착된 바코드가 존재 한다면 그 바코드 값은 ${gooodsBarcode} 값과 달라야 합니다.
    2. 만약 박스가 있지만, 바코드가 존재하지 않는 경우는 pass야
    ${resultFormat}
    `;
  }
}

export function getNormalParcelCheckPrompt(checkId: string) {
  const resultFormat = `결과는 아래 형식 중 하나로 작성해 주세요.  
    
    정확할 경우:   {"result": "pass", "reason": ""}  
    틀렸을 경우 (잘못된 항목과 이유를 포함):   {"result": "fail", "reason": ""}  
    확인할 수 없는 오류가 발생한 경우:   {"result": "unknown", "reason": ""}`;

  if (checkId === 'parcel_label_exist') {
    return `다음 정보를 확인하세요. 
    1. 입고라벨지에는 유통기한이라는 단어가 있어. 박스에 입고라벨지가 붙어 있는가?
    ${resultFormat}
    `;
  } else if (checkId === '2') {
    return `다음 정보를 확인하세요. 
    1. 입고라벨지에 상품 종류는 최대 3개까지만 기재되어야 합니다.
    ${resultFormat}
    `;
  } else if (checkId === 'invoice_dock_exist') {
    return `다음 정보를 확인하세요. 
    1. 송장에 붙어있는 단어 중에 도크라는 단어가 있는가?
    ${resultFormat}
    `;
  }
}
