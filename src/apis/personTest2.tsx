/* Generated by restful-react */

import React from 'react';
import { Mutate, MutateProps, useMutate, UseMutateProps } from 'restful-react';

import * as RestfulShesha from '../utils/fetchers';
export const SPEC_VERSION = 'v1';
export interface GuidEntityDto {
  id?: string;
}

export interface PersonDto {
  id?: string;
  firstName?: string | null;
  lastName?: string | null;
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

export interface PersonDtoAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: PersonDto;
}

export interface AjaxResponseBase {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
}

export interface PersonDynamicDto {
  id?: string;
  firstName?: string | null;
  lastName?: string | null;
  shaFormFields?: string[] | null;
}

export type PersonTest2UpdateAtRuntimeProps = Omit<
  MutateProps<PersonDtoAjaxResponse, AjaxResponseBase, void, GuidEntityDto, void>,
  'path' | 'verb'
>;

export const PersonTest2UpdateAtRuntime = (props: PersonTest2UpdateAtRuntimeProps) => (
  <Mutate<PersonDtoAjaxResponse, AjaxResponseBase, void, GuidEntityDto, void>
    verb="POST"
    path={`/api/PersonTest2/UpdateAtRuntime`}
    {...props}
  />
);

export type UsePersonTest2UpdateAtRuntimeProps = Omit<
  UseMutateProps<PersonDtoAjaxResponse, AjaxResponseBase, void, GuidEntityDto, void>,
  'path' | 'verb'
>;

export const usePersonTest2UpdateAtRuntime = (props: UsePersonTest2UpdateAtRuntimeProps) =>
  useMutate<PersonDtoAjaxResponse, AjaxResponseBase, void, GuidEntityDto, void>(
    'POST',
    `/api/PersonTest2/UpdateAtRuntime`,
    props
  );

export type personTest2UpdateAtRuntimeProps = Omit<
  RestfulShesha.MutateProps<PersonDtoAjaxResponse, AjaxResponseBase, void, GuidEntityDto, void>,
  'data'
>;
export const personTest2UpdateAtRuntime = (data: GuidEntityDto, props: personTest2UpdateAtRuntimeProps) =>
  RestfulShesha.mutate<PersonDtoAjaxResponse, AjaxResponseBase, void, GuidEntityDto, void>(
    'POST',
    `/api/PersonTest2/UpdateAtRuntime`,
    data,
    props
  );

export type PersonTest2UpdateDtoAtRuntimeProps = Omit<
  MutateProps<PersonDtoAjaxResponse, AjaxResponseBase, void, PersonDynamicDto, void>,
  'path' | 'verb'
>;

export const PersonTest2UpdateDtoAtRuntime = (props: PersonTest2UpdateDtoAtRuntimeProps) => (
  <Mutate<PersonDtoAjaxResponse, AjaxResponseBase, void, PersonDynamicDto, void>
    verb="POST"
    path={`/api/PersonTest2/UpdateDtoAtRuntime`}
    {...props}
  />
);

export type UsePersonTest2UpdateDtoAtRuntimeProps = Omit<
  UseMutateProps<PersonDtoAjaxResponse, AjaxResponseBase, void, PersonDynamicDto, void>,
  'path' | 'verb'
>;

export const usePersonTest2UpdateDtoAtRuntime = (props: UsePersonTest2UpdateDtoAtRuntimeProps) =>
  useMutate<PersonDtoAjaxResponse, AjaxResponseBase, void, PersonDynamicDto, void>(
    'POST',
    `/api/PersonTest2/UpdateDtoAtRuntime`,
    props
  );

export type personTest2UpdateDtoAtRuntimeProps = Omit<
  RestfulShesha.MutateProps<PersonDtoAjaxResponse, AjaxResponseBase, void, PersonDynamicDto, void>,
  'data'
>;
export const personTest2UpdateDtoAtRuntime = (data: PersonDynamicDto, props: personTest2UpdateDtoAtRuntimeProps) =>
  RestfulShesha.mutate<PersonDtoAjaxResponse, AjaxResponseBase, void, PersonDynamicDto, void>(
    'POST',
    `/api/PersonTest2/UpdateDtoAtRuntime`,
    data,
    props
  );
