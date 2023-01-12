import { useMutation } from '@tanstack/react-query';
import { uploadDaikokuEst } from 'api-kintone/src/estimates';
import { useCommonOptions } from './useCommonOptions';

export const useUploadDaikokuEst = ({
  onSuccess,
}: {
  onSuccess?: (data: any) => void
}) => {
  const commonOptions = useCommonOptions();



  return useMutation(
    uploadDaikokuEst,
    {
      ...commonOptions,
      onSuccess: (data) => {
        commonOptions.onSuccess();
        onSuccess?.(data);
      },
    },
  );
};