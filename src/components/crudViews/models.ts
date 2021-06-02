import { GetDataError, UseGetProps, UseMutateReturn } from 'restful-react';

export type UseGenericGetProps = Omit<UseGetProps<any, any>, 'path'>;

export interface IDataFetcher<TData = any, TError = any> {
  loading: boolean;
  refetch: (options?: any) => Promise<void>;
  error: GetDataError<TError> | null;
  data: TData | null;
}

export interface IDataMutator<TData = any, TRequestBody = any, TQueryParams = any, TError = any>
  extends Pick<UseMutateReturn<TData, TError, TRequestBody, TQueryParams>, 'mutate' | 'loading' | 'error'> {}
