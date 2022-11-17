import { useMutation } from '@tanstack/react-query';
import { saveCustGroup } from 'api-kintone';
import { useCommonOptions } from './useCommonOptions';

export const useSaveCustGroup = () => {
  const commonOptions = useCommonOptions();
  return useMutation(
    saveCustGroup,
    {
      ...commonOptions,
    },
  ); 
};