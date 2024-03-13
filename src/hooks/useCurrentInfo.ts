import { Info } from '@/types/info';
import { useCallback } from 'react';
import { mutate } from 'swr';

// SWR 보관용 구분키
export const CURRENT_INFO_KEY = '/health-info';

export const useCurrentInfo = () => {
  // 현재 좌표정보 SWR 저장
  const setCurrentInfo = useCallback((info: Info) => {
    // SWR 업데이트
    mutate(CURRENT_INFO_KEY, info);
  }, []);

  // 저장된 좌표정보 SWR 삭제
  const clearCurrentInfo = useCallback(() => {
    // SWR 초기화
    mutate(CURRENT_INFO_KEY, null);
  }, []);
  return { setCurrentInfo, clearCurrentInfo };
};
