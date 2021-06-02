import { createContext } from 'react';
import { ISelectionProps } from './models';

export interface IDataTableSelectionStateContext {
  selectedRow?: ISelectionProps;
}

export interface IDataTableSelectionActionsContext {
  setSelectedRow: (index: number, row: any) => void;
  /* NEW_ACTION_ACTION_DECLARATION_GOES_HERE */
}

export const DATATABLE_SELECTION_CONTEXT_INITIAL_STATE: IDataTableSelectionStateContext = {
  selectedRow: null,
};

export const DataTableSelectionStateContext = createContext<IDataTableSelectionStateContext>(
  DATATABLE_SELECTION_CONTEXT_INITIAL_STATE
);

export const DataTableSelectionActionsContext = createContext<IDataTableSelectionActionsContext>(undefined);
