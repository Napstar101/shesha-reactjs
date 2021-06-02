/* Generated by restful-react */

import React from 'react';
import { Get, GetProps, useGet, UseGetProps, Mutate, MutateProps, useMutate, UseMutateProps } from 'restful-react';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Represents event log item logged by Shesha.Scheduler.SignalR.SignalrAppender
 */
export interface EventLogItem {
  /**
   * Logged message
   */
  message?: string | null;
  /**
   * Event timestamp
   */
  timeStamp?: string;
  /**
   * Level (info/warn/error)
   */
  level?: string | null;
}

export interface ValidationErrorInfo {
  message?: string | null;
  members?: string[] | null;
}

export interface ErrorInfo {
  code?: number;
  message?: string | null;
  details?: string | null;
  validationErrors?: ValidationErrorInfo[] | null;
}

export interface EventLogItemListAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: EventLogItem[] | null;
}

export interface AjaxResponseBase {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
}

export interface FileStreamResultAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: string | null;
}

/**
 * Generic entity Dto with display text
 */
export interface Int64NullableEntityWithDisplayNameDto {
  id?: number | null;
  /**
   * Entity display name
   */
  displayText?: string | null;
}

/**
 * Generic entity Dto with display text
 */
export interface GuidNullableEntityWithDisplayNameDto {
  id?: string | null;
  /**
   * Entity display name
   */
  displayText?: string | null;
}

export interface ReferenceListItemValueDto {
  item?: string | null;
  itemValue?: number | null;
}

export interface ScheduledJobExecutionDto {
  id?: string;
  /**
   * Datetime of the execution start
   */
  startedOn?: string | null;
  /**
   * Datetime of the execution finish
   */
  finishedOn?: string | null;
  startedBy?: Int64NullableEntityWithDisplayNameDto;
  job?: GuidNullableEntityWithDisplayNameDto;
  trigger?: GuidNullableEntityWithDisplayNameDto;
  /**
   * Error message
   */
  errorMessage?: string | null;
  status?: ReferenceListItemValueDto;
}

export interface ScheduledJobExecutionDtoAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: ScheduledJobExecutionDto;
}

export interface ScheduledJobExecutionDtoPagedResultDto {
  items?: ScheduledJobExecutionDto[] | null;
  totalCount?: number;
}

export interface ScheduledJobExecutionDtoPagedResultDtoAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: ScheduledJobExecutionDtoPagedResultDto;
}

export interface ScheduledJobExecutionGetEventLogItemsQueryParams {
  id?: string;
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ScheduledJobExecutionGetEventLogItemsProps = Omit<
  GetProps<EventLogItemListAjaxResponse, AjaxResponseBase, ScheduledJobExecutionGetEventLogItemsQueryParams>,
  'path'
>;

/**
 * Get event log items for the specified job execution
 */
export const ScheduledJobExecutionGetEventLogItems = (props: ScheduledJobExecutionGetEventLogItemsProps) => (
  <Get<EventLogItemListAjaxResponse, AjaxResponseBase, ScheduledJobExecutionGetEventLogItemsQueryParams>
    path={`/api/services/Scheduler/ScheduledJobExecution/GetEventLogItems`}
    {...props}
  />
);

export type UseScheduledJobExecutionGetEventLogItemsProps = Omit<
  UseGetProps<EventLogItemListAjaxResponse, ScheduledJobExecutionGetEventLogItemsQueryParams>,
  'path'
>;

/**
 * Get event log items for the specified job execution
 */
export const useScheduledJobExecutionGetEventLogItems = (props: UseScheduledJobExecutionGetEventLogItemsProps) =>
  useGet<EventLogItemListAjaxResponse, AjaxResponseBase, ScheduledJobExecutionGetEventLogItemsQueryParams>(
    `/api/services/Scheduler/ScheduledJobExecution/GetEventLogItems`,
    props
  );

export interface ScheduledJobExecutionDownloadLogFileQueryParams {
  /**
   * Id of the scheduled job execution
   */
  id?: string;
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ScheduledJobExecutionDownloadLogFileProps = Omit<
  GetProps<FileStreamResultAjaxResponse, AjaxResponseBase, ScheduledJobExecutionDownloadLogFileQueryParams>,
  'path'
>;

/**
 * Download log file of the job execution
 */
export const ScheduledJobExecutionDownloadLogFile = (props: ScheduledJobExecutionDownloadLogFileProps) => (
  <Get<FileStreamResultAjaxResponse, AjaxResponseBase, ScheduledJobExecutionDownloadLogFileQueryParams>
    path={`/api/services/Scheduler/ScheduledJobExecution/DownloadLogFile`}
    {...props}
  />
);

export type UseScheduledJobExecutionDownloadLogFileProps = Omit<
  UseGetProps<FileStreamResultAjaxResponse, ScheduledJobExecutionDownloadLogFileQueryParams>,
  'path'
>;

/**
 * Download log file of the job execution
 */
export const useScheduledJobExecutionDownloadLogFile = (props: UseScheduledJobExecutionDownloadLogFileProps) =>
  useGet<FileStreamResultAjaxResponse, AjaxResponseBase, ScheduledJobExecutionDownloadLogFileQueryParams>(
    `/api/services/Scheduler/ScheduledJobExecution/DownloadLogFile`,
    props
  );

export interface ScheduledJobExecutionGetQueryParams {
  id?: string;
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ScheduledJobExecutionGetProps = Omit<
  GetProps<ScheduledJobExecutionDtoAjaxResponse, AjaxResponseBase, ScheduledJobExecutionGetQueryParams>,
  'path'
>;

export const ScheduledJobExecutionGet = (props: ScheduledJobExecutionGetProps) => (
  <Get<ScheduledJobExecutionDtoAjaxResponse, AjaxResponseBase, ScheduledJobExecutionGetQueryParams>
    path={`/api/services/Scheduler/ScheduledJobExecution/Get`}
    {...props}
  />
);

export type UseScheduledJobExecutionGetProps = Omit<
  UseGetProps<ScheduledJobExecutionDtoAjaxResponse, ScheduledJobExecutionGetQueryParams>,
  'path'
>;

export const useScheduledJobExecutionGet = (props: UseScheduledJobExecutionGetProps) =>
  useGet<ScheduledJobExecutionDtoAjaxResponse, AjaxResponseBase, ScheduledJobExecutionGetQueryParams>(
    `/api/services/Scheduler/ScheduledJobExecution/Get`,
    props
  );

export interface ScheduledJobExecutionGetAllQueryParams {
  sorting?: string | null;
  skipCount?: number;
  maxResultCount?: number;
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ScheduledJobExecutionGetAllProps = Omit<
  GetProps<
    ScheduledJobExecutionDtoPagedResultDtoAjaxResponse,
    AjaxResponseBase,
    ScheduledJobExecutionGetAllQueryParams
  >,
  'path'
>;

export const ScheduledJobExecutionGetAll = (props: ScheduledJobExecutionGetAllProps) => (
  <Get<ScheduledJobExecutionDtoPagedResultDtoAjaxResponse, AjaxResponseBase, ScheduledJobExecutionGetAllQueryParams>
    path={`/api/services/Scheduler/ScheduledJobExecution/GetAll`}
    {...props}
  />
);

export type UseScheduledJobExecutionGetAllProps = Omit<
  UseGetProps<ScheduledJobExecutionDtoPagedResultDtoAjaxResponse, ScheduledJobExecutionGetAllQueryParams>,
  'path'
>;

export const useScheduledJobExecutionGetAll = (props: UseScheduledJobExecutionGetAllProps) =>
  useGet<ScheduledJobExecutionDtoPagedResultDtoAjaxResponse, AjaxResponseBase, ScheduledJobExecutionGetAllQueryParams>(
    `/api/services/Scheduler/ScheduledJobExecution/GetAll`,
    props
  );

export interface ScheduledJobExecutionCreateQueryParams {
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ScheduledJobExecutionCreateProps = Omit<
  MutateProps<
    ScheduledJobExecutionDtoAjaxResponse,
    AjaxResponseBase,
    ScheduledJobExecutionCreateQueryParams,
    ScheduledJobExecutionDto
  >,
  'path' | 'verb'
>;

export const ScheduledJobExecutionCreate = (props: ScheduledJobExecutionCreateProps) => (
  <Mutate<
    ScheduledJobExecutionDtoAjaxResponse,
    AjaxResponseBase,
    ScheduledJobExecutionCreateQueryParams,
    ScheduledJobExecutionDto
  >
    verb="POST"
    path={`/api/services/Scheduler/ScheduledJobExecution/Create`}
    {...props}
  />
);

export type UseScheduledJobExecutionCreateProps = Omit<
  UseMutateProps<
    ScheduledJobExecutionDtoAjaxResponse,
    ScheduledJobExecutionCreateQueryParams,
    ScheduledJobExecutionDto
  >,
  'path' | 'verb'
>;

export const useScheduledJobExecutionCreate = (props: UseScheduledJobExecutionCreateProps) =>
  useMutate<
    ScheduledJobExecutionDtoAjaxResponse,
    AjaxResponseBase,
    ScheduledJobExecutionCreateQueryParams,
    ScheduledJobExecutionDto
  >('POST', `/api/services/Scheduler/ScheduledJobExecution/Create`, props);

export interface ScheduledJobExecutionUpdateQueryParams {
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ScheduledJobExecutionUpdateProps = Omit<
  MutateProps<
    ScheduledJobExecutionDtoAjaxResponse,
    AjaxResponseBase,
    ScheduledJobExecutionUpdateQueryParams,
    ScheduledJobExecutionDto
  >,
  'path' | 'verb'
>;

export const ScheduledJobExecutionUpdate = (props: ScheduledJobExecutionUpdateProps) => (
  <Mutate<
    ScheduledJobExecutionDtoAjaxResponse,
    AjaxResponseBase,
    ScheduledJobExecutionUpdateQueryParams,
    ScheduledJobExecutionDto
  >
    verb="PUT"
    path={`/api/services/Scheduler/ScheduledJobExecution/Update`}
    {...props}
  />
);

export type UseScheduledJobExecutionUpdateProps = Omit<
  UseMutateProps<
    ScheduledJobExecutionDtoAjaxResponse,
    ScheduledJobExecutionUpdateQueryParams,
    ScheduledJobExecutionDto
  >,
  'path' | 'verb'
>;

export const useScheduledJobExecutionUpdate = (props: UseScheduledJobExecutionUpdateProps) =>
  useMutate<
    ScheduledJobExecutionDtoAjaxResponse,
    AjaxResponseBase,
    ScheduledJobExecutionUpdateQueryParams,
    ScheduledJobExecutionDto
  >('PUT', `/api/services/Scheduler/ScheduledJobExecution/Update`, props);

export interface ScheduledJobExecutionDeleteQueryParams {
  id?: string;
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ScheduledJobExecutionDeleteProps = Omit<
  MutateProps<void, unknown, ScheduledJobExecutionDeleteQueryParams, void>,
  'path' | 'verb'
>;

export const ScheduledJobExecutionDelete = (props: ScheduledJobExecutionDeleteProps) => (
  <Mutate<void, unknown, ScheduledJobExecutionDeleteQueryParams, void>
    verb="DELETE"
    path={`/api/services/Scheduler/ScheduledJobExecution/Delete`}
    {...props}
  />
);

export type UseScheduledJobExecutionDeleteProps = Omit<
  UseMutateProps<void, ScheduledJobExecutionDeleteQueryParams, void>,
  'path' | 'verb'
>;

export const useScheduledJobExecutionDelete = (props: UseScheduledJobExecutionDeleteProps) =>
  useMutate<void, unknown, ScheduledJobExecutionDeleteQueryParams, void>(
    'DELETE',
    `/api/services/Scheduler/ScheduledJobExecution/Delete`,
    props
  );
