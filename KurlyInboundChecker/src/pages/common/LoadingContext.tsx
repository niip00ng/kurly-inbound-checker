import React, {createContext, useState, useContext, ReactNode} from 'react';

// Loading 상태 인터페이스
interface LoadingContextType {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

// Context 생성
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// LoadingProvider 컴포넌트
export const LoadingProvider = ({children}: {children: ReactNode}) => {
  const [isLoading, setIsLoading] = useState(false);

  // 로딩 보여주기
  const showLoading = () => {
    setIsLoading(true);
  };

  // 로딩 숨기기
  const hideLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{isLoading, showLoading, hideLoading}}>
      {children}
    </LoadingContext.Provider>
  );
};

// Custom Hook
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
