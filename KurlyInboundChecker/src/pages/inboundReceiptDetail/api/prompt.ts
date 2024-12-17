export function getPrompt(checkId: string) {
  if (checkId === '1') {
    //발주서와 상품의 종류 및 수량이 일치하는가?
    return `다음 정보를 확인하세요. 이 정보는 박스에 있는 **한국어 라벨**에 적힌 내용입니다.  
    1. **상품명**이 강냉이 가 맞는지 확인합니다.   
    2. **중량**이 250g 맞는지 확인합니다.   
    3. **수량**이 15ea 맞는지 확인합니다.   
    결과는 아래 형식 중 하나로 작성해 주세요.  
    
    모든 항목이 정확할 경우:   {"result": "SUCCESS", "reason": ""}  
    어떤 항목이라도 틀렸을 경우 (잘못된 항목과 이유를 포함):   {"result": "FAIL", "reason": ""}  
    확인할 수 없는 오류가 발생한 경우:   {"result": "UNKNOWN", "reason": ""}`;
  } else if (checkId === '2') {
    //발주서의 소비기한이 실상품의 소비기한과 일치하거나 더 미래인가?
    return '1';
  } else if (checkId === '3') {
    //외박스의 소비기한과 실상품의 소비기한이 일치하는가?
    return '1';
  } else if (checkId === '4') {
    //상품에 바코드가 정상 부착되어 있는가?
    return '1';
  } else if (checkId === '5') {
    //상품의 모든 바코드가 동일한가?
    return '1';
  } else if (checkId === '6') {
    //상품 라벨지에 한글표시사항이 부착되어 있는가?
    return '1';
  } else if (checkId === '7') {
    //상품 라벨지에 상품판매가가 노출되어 있지 않은가?
    return '1';
  }
}
