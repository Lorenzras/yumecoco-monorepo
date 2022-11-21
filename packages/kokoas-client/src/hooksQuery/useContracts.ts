import { useQuery } from "@tanstack/react-query";
import { getContracts } from "api-kintone";
import { AppIds } from "config";

export const useContracts = (
  query?: string
) => useQuery(
  [AppIds.projEstimates, {query}],
  () => getContracts({query})
  )