import { useState } from 'react';
import { calculateEstimateRecord } from '../api/others/calculateEstimateRecord';
import useDeepCompareEffect from 'use-deep-compare-effect';

export const useCalcEstimate = (estimateRecord: Estimates.main.SavedData) => {

  const [calcResult, setCalcResult] = useState<Awaited<ReturnType<typeof calculateEstimateRecord>>>(Object.create(null));

  useDeepCompareEffect(() => {
    if ('$id' in estimateRecord) {

      const result = calculateEstimateRecord(estimateRecord);
      setCalcResult(result);
    }

  }, [estimateRecord || {}]);

  return calcResult;
};