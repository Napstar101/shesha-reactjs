import qs from "qs";

export interface GetProps<
  _TData = any,
  _TError = any,
  TQueryParams = {
    [key: string]: any;
  },
  /** is used by the react hooks only */
  _TPathParams = any
> {
  queryParams?: TQueryParams;
}

export const get = <
  TData = any,
  TError = any,
  TQueryParams = {
    [key: string]: any;
  },
  /** is used by the react hooks only */
  _TPathParams = any
>(
  path: string,
  props: { queryParams?: TQueryParams },
  signal?: RequestInit["signal"],
): Promise<TData | TError> => {
  let url = path;
  if (props.queryParams && Object.keys(props.queryParams).length) {
    url += `?${qs.stringify(props.queryParams)}`;
  }
  return fetch(url, {
    headers: {
      "content-type": "application/json",
    },
    signal,
  }).then(res => res.json());
};

export interface MutateProps<
  _TData = any,
  _TError = any,
  TQueryParams = {
    [key: string]: any;
  },
  TRequestBody = any,
  /** is used by the react hooks only */
  _TPathParams = any
> {
  body: TRequestBody;
  queryParams?: TQueryParams;
}

export const mutate = <
  TData = any,
  TError = any,
  TQueryParams = {
    [key: string]: any;
  },
  TRequestBody = any,
  /** is used by the react hooks only */
  _TPathParams = any
>(
  method: string,
  path: string,
  props: { body: TRequestBody; queryParams?: TQueryParams },
  signal?: RequestInit["signal"],
): Promise<TData | TError> => {
  let url = path;
  if (method === "DELETE" && typeof props.body === "string") {
    url += `/${props.body}`;
  }
  if (props.queryParams && Object.keys(props.queryParams).length) {
    url += `?${qs.stringify(props.queryParams)}`;
  }
  return fetch(url, {
    method,
    body: JSON.stringify(props.body),
    headers: {
      "content-type": "application/json",
    },
    signal,
  }).then(res => res.json());
};