/* Generated by restful-react */

import React from 'react';
import { Get, GetProps, useGet, UseGetProps } from 'restful-react';

import * as RestfulShesha from '../utils/fetchers';
export const SPEC_VERSION = 'v1';
/**
 * Generic DTO of the simple autocomplete item
 */
export interface AutocompleteItemDto {
  value?: string | null;
  displayText?: string | null;
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

export interface AutocompleteItemDtoListAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: AutocompleteItemDto[] | null;
}

export interface AjaxResponseBase {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
}

export interface PropertyMetadataDto {
  isVisible?: boolean;
  required?: boolean;
  readonly?: boolean;
  minLength?: number | null;
  maxLength?: number | null;
  min?: number | null;
  max?: number | null;
  path?: string | null;
  label?: string | null;
  description?: string | null;
  isEmail?: boolean;
  dataType?: string | null;
  entityType?: string | null;
  referenceListName?: string | null;
  referenceListNamespace?: string | null;
  orderIndex?: number;
  groupName?: string | null;
}

export interface PropertyMetadataDtoListAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: PropertyMetadataDto[] | null;
}

export interface MetadataEntityTypeAutocompleteQueryParams {
  term?: string | null;
  selectedValue?: string | null;
}

export type MetadataEntityTypeAutocompleteProps = Omit<
  GetProps<AutocompleteItemDtoListAjaxResponse, AjaxResponseBase, MetadataEntityTypeAutocompleteQueryParams, void>,
  'path'
>;

export const MetadataEntityTypeAutocomplete = (props: MetadataEntityTypeAutocompleteProps) => (
  <Get<AutocompleteItemDtoListAjaxResponse, AjaxResponseBase, MetadataEntityTypeAutocompleteQueryParams, void>
    path={`/api/services/app/Metadata/EntityTypeAutocomplete`}
    {...props}
  />
);

export type UseMetadataEntityTypeAutocompleteProps = Omit<
  UseGetProps<AutocompleteItemDtoListAjaxResponse, AjaxResponseBase, MetadataEntityTypeAutocompleteQueryParams, void>,
  'path'
>;

export const useMetadataEntityTypeAutocomplete = (props: UseMetadataEntityTypeAutocompleteProps) =>
  useGet<AutocompleteItemDtoListAjaxResponse, AjaxResponseBase, MetadataEntityTypeAutocompleteQueryParams, void>(
    `/api/services/app/Metadata/EntityTypeAutocomplete`,
    props
  );

export type metadataEntityTypeAutocompleteProps = Omit<
  RestfulShesha.GetProps<
    AutocompleteItemDtoListAjaxResponse,
    AjaxResponseBase,
    MetadataEntityTypeAutocompleteQueryParams,
    void
  >,
  'queryParams'
>;
export const metadataEntityTypeAutocomplete = (
  queryParams: MetadataEntityTypeAutocompleteQueryParams,
  props: metadataEntityTypeAutocompleteProps
) =>
  RestfulShesha.get<
    AutocompleteItemDtoListAjaxResponse,
    AjaxResponseBase,
    MetadataEntityTypeAutocompleteQueryParams,
    void
  >(`/api/services/app/Metadata/EntityTypeAutocomplete`, queryParams, props);

export interface MetadataPropertyAutocompleteQueryParams {
  term?: string | null;
  container?: string | null;
  selectedValue?: string | null;
}

export type MetadataPropertyAutocompleteProps = Omit<
  GetProps<PropertyMetadataDtoListAjaxResponse, AjaxResponseBase, MetadataPropertyAutocompleteQueryParams, void>,
  'path'
>;

export const MetadataPropertyAutocomplete = (props: MetadataPropertyAutocompleteProps) => (
  <Get<PropertyMetadataDtoListAjaxResponse, AjaxResponseBase, MetadataPropertyAutocompleteQueryParams, void>
    path={`/api/services/app/Metadata/PropertyAutocomplete`}
    {...props}
  />
);

export type UseMetadataPropertyAutocompleteProps = Omit<
  UseGetProps<PropertyMetadataDtoListAjaxResponse, AjaxResponseBase, MetadataPropertyAutocompleteQueryParams, void>,
  'path'
>;

export const useMetadataPropertyAutocomplete = (props: UseMetadataPropertyAutocompleteProps) =>
  useGet<PropertyMetadataDtoListAjaxResponse, AjaxResponseBase, MetadataPropertyAutocompleteQueryParams, void>(
    `/api/services/app/Metadata/PropertyAutocomplete`,
    props
  );

export type metadataPropertyAutocompleteProps = Omit<
  RestfulShesha.GetProps<
    PropertyMetadataDtoListAjaxResponse,
    AjaxResponseBase,
    MetadataPropertyAutocompleteQueryParams,
    void
  >,
  'queryParams'
>;
export const metadataPropertyAutocomplete = (
  queryParams: MetadataPropertyAutocompleteQueryParams,
  props: metadataPropertyAutocompleteProps
) =>
  RestfulShesha.get<
    PropertyMetadataDtoListAjaxResponse,
    AjaxResponseBase,
    MetadataPropertyAutocompleteQueryParams,
    void
  >(`/api/services/app/Metadata/PropertyAutocomplete`, queryParams, props);

export interface MetadataGetPropertiesQueryParams {
  container?: string | null;
}

export type MetadataGetPropertiesProps = Omit<
  GetProps<PropertyMetadataDtoListAjaxResponse, AjaxResponseBase, MetadataGetPropertiesQueryParams, void>,
  'path'
>;

export const MetadataGetProperties = (props: MetadataGetPropertiesProps) => (
  <Get<PropertyMetadataDtoListAjaxResponse, AjaxResponseBase, MetadataGetPropertiesQueryParams, void>
    path={`/api/services/app/Metadata/GetProperties`}
    {...props}
  />
);

export type UseMetadataGetPropertiesProps = Omit<
  UseGetProps<PropertyMetadataDtoListAjaxResponse, AjaxResponseBase, MetadataGetPropertiesQueryParams, void>,
  'path'
>;

export const useMetadataGetProperties = (props: UseMetadataGetPropertiesProps) =>
  useGet<PropertyMetadataDtoListAjaxResponse, AjaxResponseBase, MetadataGetPropertiesQueryParams, void>(
    `/api/services/app/Metadata/GetProperties`,
    props
  );

export type metadataGetPropertiesProps = Omit<
  RestfulShesha.GetProps<PropertyMetadataDtoListAjaxResponse, AjaxResponseBase, MetadataGetPropertiesQueryParams, void>,
  'queryParams'
>;
export const metadataGetProperties = (
  queryParams: MetadataGetPropertiesQueryParams,
  props: metadataGetPropertiesProps
) =>
  RestfulShesha.get<PropertyMetadataDtoListAjaxResponse, AjaxResponseBase, MetadataGetPropertiesQueryParams, void>(
    `/api/services/app/Metadata/GetProperties`,
    queryParams,
    props
  );