export interface IGuidNullableEntityWithDisplayNameDto {
  displayText?: string;
  id?: string;
}

export interface IReferenceListItemDto {
  item?: string;
  itemValue?: number;
  description?: string;
  orderIndex?: number;
  referenceList?: IGuidNullableEntityWithDisplayNameDto;
  id?: string;
}

export interface IReferenceListItemValueDto {
  item?: string;
  itemValue?: number;
}
