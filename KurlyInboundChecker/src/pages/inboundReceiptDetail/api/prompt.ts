export function getProductCheckPrompt(
  checkId: string,
  gooodsBarcode: string,
  expireDate: string,
) {
  const startFormat = `
    너는 마켓컬리라는 이커머스 회사의 물류입고센터 담당 전문가야.
    너의 역할은 물건의 이미지를 확인해서 아래의 가이드라인대로 충족하고 입고되었는지 명확하게 확인해야해.
    이미지들이 아래 가이드라인을 충족하는지 확인해주고 각각의 질문에 각각 응답해줘.`;

  const resultFormat = `
    질문에 대한 응답은 다음과 같아. 
    result에는 pass, fail, unknown 중 하나를 넣어주고, 
    unknown일때 reason에는 한글로 이유를 넣어주면 돼. 
    응답 메시지 포맷은 {"result": "", "reason": ""} Json포멧을 반드시 지켜줘.
    JSON이란 글자는 넣지마`;

  if (checkId === 'product_barcode_equal') {
    return `${startFormat}
    상품 사진의 바코드 아래  숫자를 먼저 직접 인식을 해봐. 그 숫자가 ${gooodsBarcode}와 일치하는가?
    ${resultFormat}
    `;
  } else if (checkId === 'product_expirationDate_equal_or_future') {
    return `${startFormat}
    1. 상품에 기재된 소비기한 (유통기한)이 ${expireDate} 와 같거나 그 이후인가?
    ${resultFormat}
    `;
  } else if (checkId === 'product_korean_labeling_exist') {
    return `${startFormat}
    1. 상품 라벨지에 한글표시사항이 존재해야 합니다.?
    ${resultFormat}
    `;
  } else if (checkId === 'product_price_exist') {
    return `${startFormat}
    1. 상품 라벨지에 상품가격이 보이면 안된다.
    ${resultFormat}
    `;
  } else if (checkId === 'product_expirationDate_equal_box') {
    return `${startFormat}
    1. 상품의 소비기한과 박스의 소비기한은 동일해야 합니다..
    ${resultFormat}
    `;
  } else if (checkId === 'box_product_barcode_different') {
    return `${startFormat}
    1. 사진상에 박스에 부착된 바코드가 존재 한다면 그 바코드 값은 ${gooodsBarcode} 값과 달라야 합니다.
    2. 만약 박스가 있지만, 바코드가 존재하지 않는 경우는 pass야
    ${resultFormat}
    `;
  } else if (checkId === 'product_barcode_equal_all') {
    return `${startFormat}
    1. 여러 개의 바코드가 존재하는 사진이 있을 경우: 모든 바코드가 일치하는가?
    ${resultFormat}
    `;
  }
}

export function getNormalTypeCheckPrompt(checkId: string) {
  const resultFormat = `결과는 아래 형식 중 하나로 작성해 주세요.  
    
    정확할 경우:   {"result": "pass", "reason": ""}  
    틀렸을 경우 (잘못된 항목과 이유를 포함):   {"result": "fail", "reason": ""}  
    확인할 수 없는 오류가 발생한 경우:   {"result": "unknown", "reason": ""}`;

  if (checkId === 'pallet_type') {
    return `다음 정보를 확인하세요. 
    1. 파레트 색깔이 파란색, 빨간색, 연두색 이거나 또는 파렛트에 "AJ" , "KPP", "한국파렛트풀", "아주렌트" 라고 적혀있어야해.
    ${resultFormat}
    `;
  } else if (checkId === 'pallet_arrangement') {
    return `다음 정보를 확인하세요. 
    1. 파레트 위에 있는 상품들이 가지런하게 정렬되어 있어야해.
    ${resultFormat}
    `;
  } else if (checkId === '1') {
    return `다음 정보를 확인하세요. 
    1. 송장에 붙어있는 단어 중에 도크라는 단어가 있는가?
    ${resultFormat}
    `;
  }
}

export function getParcelTypeCheckPrompt(checkId: string) {
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
