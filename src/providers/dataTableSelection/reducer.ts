import { IDataTableSelectionStateContext, DATATABLE_SELECTION_CONTEXT_INITIAL_STATE } from './contexts';
import { DataTableSelectionActionEnums } from './actions';
import { handleActions } from 'redux-actions';
import { ISelectionProps } from './models';

export default handleActions<IDataTableSelectionStateContext, any>(
  {
    [DataTableSelectionActionEnums.SetSelectedRow]: (
      state: IDataTableSelectionStateContext,
      action: ReduxActions.Action<ISelectionProps>
    ) => {
      const { payload } = action;

      return {
        ...state,
        selectedRow: payload,
      };
    },
  },

  DATATABLE_SELECTION_CONTEXT_INITIAL_STATE
);
