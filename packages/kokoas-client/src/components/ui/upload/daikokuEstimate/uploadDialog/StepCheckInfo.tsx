import {
  Stack,
  Typography,
} from '@mui/material';
import { useCustGroupById, useProjById } from 'kokoas-client/src/hooksQuery';
import { addressBuilder } from 'libs';
import { useMemo } from 'react';
import { ParsedDaikokuEst } from 'types';
import { NextButton } from './NextButton';
import { StepCheckInfoTable } from './StepCheckInfoTable';

export const StepCheckInfo = (
  {
    parsedDaikokuEst,
    handleNext,
    projId,
  }: {
    parsedDaikokuEst: ParsedDaikokuEst,
    handleNext: () => void,
    projId?: string
  },
) => {

  const { data: projData } = useProjById(projId ?? '');
  const {
    custGroupId,
  } = projData || {};

  const { data: custData } = useCustGroupById(custGroupId?.value ?? '');

  const diffRows = useMemo(
    () => {
      if (!projData || !custData || !parsedDaikokuEst) return [];

      const {
        projName,
        postal, address1, address2,
      } = projData || {};

      const {
        members,
      } = custData || {};

      const firstCustName = members?.value[0].value.customerName;

      const {
        custName: dkCustName,
        projName: dkProjName,
        projAddress: dkProjAddress,
      } = parsedDaikokuEst;

      return [
        [firstCustName?.value, dkCustName],
        [projName?.value, dkProjName],
        [
          addressBuilder({
            postal: postal.value,
            address1: address1.value,
            address2: address2.value,
          }),
          dkProjAddress,
        ],
      ];
    },
    [custData, projData, parsedDaikokuEst ]);

  return (
    <Stack spacing={2}>
      <Typography>
        情報を確認してください
      </Typography>
      <StepCheckInfoTable rows={diffRows} />
      <NextButton
        onClick={handleNext}
      >
        内訳確認へ
      </NextButton>
    </Stack>
  );
};