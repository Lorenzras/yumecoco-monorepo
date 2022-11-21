import { RecordKeys } from './config';
import { getEstimates } from './getEstimates';

export const getContracts = (
  params?: Parameters<typeof getEstimates>[0],
) => {

  const envelopeStatusField: RecordKeys =  'envStatus';

  const {
    query,
    ...others
  } = params || {};

  const newQuery = [
    `(${envelopeStatusField} != "")`,
    `(${query})`,
  ]
    .filter(Boolean)
    .join(' and ');

    console.log(newQuery)

  return getEstimates({
    query: newQuery,
    ...others,
  });
};