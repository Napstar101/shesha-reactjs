import { createAction } from 'redux-actions';
import { ISelectionProps } from './models';

export enum DataTableSelectionActionEnums {
  SetSelectedRow = 'SET_SELECTED_ROW',
  /* NEW_ACTION_TYPE_GOES_HERE */
}

export const setSelectedRowAction = createAction<ISelectionProps, ISelectionProps>(
  DataTableSelectionActionEnums.SetSelectedRow,
  p => p
);

/* NEW_ACTION_GOES_HERE */
