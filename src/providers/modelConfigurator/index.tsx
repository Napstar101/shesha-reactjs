import React, { FC, useReducer, useContext, PropsWithChildren } from 'react';
import modelReducer from './reducer';
import {
  IUpdateChildItemsPayload,
  IUpdateItemSettingsPayload,
  ModelConfiguratorActionsContext,
  ModelConfiguratorStateContext,
  SIDEBAR_MENU_CONTEXT_INITIAL_STATE,
} from './contexts';
import {
  addItemAction,
  deleteItemAction,
  selectItemAction,
  updateChildItemsAction,
  updateItemAction,
  addGroupAction,
  deleteGroupAction,
  /* NEW_ACTION_IMPORT_GOES_HERE */
} from './actions';
import { getItemById } from './utils';
import { IModelItem } from '../../interfaces/modelConfigurator';

export interface IModelConfiguratorProviderPropsBase {
  baseUrl?: string;
}

export interface IModelConfiguratorProviderProps {
  items: IModelItem[];
}

const ModelConfiguratorProvider: FC<PropsWithChildren<IModelConfiguratorProviderProps>> = props => {
  const { children } = props;

  const [state, dispatch] = useReducer(modelReducer, {
    ...SIDEBAR_MENU_CONTEXT_INITIAL_STATE,
    items: props.items || [],
  });

  const addItem = () => {
    dispatch(addItemAction());
  };

  const deleteItem = (uid: string) => {
    dispatch(deleteItemAction(uid));
  };

  const selectItem = (uid: string) => {
    if (state.selectedItemId !== uid) {
      dispatch(selectItemAction(uid));
    }
  };

  const updateChildItems = (payload: IUpdateChildItemsPayload) => {
    dispatch(updateChildItemsAction(payload));
  };

  const addGroup = () => {
    // console.log('addGroup.... called');

    dispatch(addGroupAction());
  };

  const deleteGroup = (uid: string) => {
    dispatch(deleteGroupAction(uid));
  };

  const getItem = (uid: string): IModelItem => {
    return getItemById(state.items, uid);
  };

  const updateItem = (payload: IUpdateItemSettingsPayload) => {
    dispatch(updateItemAction(payload));
  };

  /* NEW_ACTION_DECLARATION_GOES_HERE */

  //const memoizedSelectedItemId = useMemo(() => state?.selectedItemId, [state.selectedItemId]);

  return (
    <ModelConfiguratorStateContext.Provider value={{ ...state /*, selectedItemId: memoizedSelectedItemId*/ }}>
      <ModelConfiguratorActionsContext.Provider
        value={{
          addItem,
          deleteItem,
          selectItem,
          updateChildItems,
          getItem,
          updateItem,
          addGroup,
          deleteGroup,
          /* NEW_ACTION_GOES_HERE */
        }}
      >
        {children}
      </ModelConfiguratorActionsContext.Provider>
    </ModelConfiguratorStateContext.Provider>
  );
};

function useModelConfiguratorState() {
  const context = useContext(ModelConfiguratorStateContext);

  if (context === undefined) {
    throw new Error('useModelConfiguratorState must be used within a ModelConfiguratorProvider');
  }

  return context;
}

function useModelConfiguratorActions() {
  const context = useContext(ModelConfiguratorActionsContext);

  if (context === undefined) {
    throw new Error('useModelConfiguratorActions must be used within a ModelConfiguratorProvider');
  }

  return context;
}

function useModelConfigurator() {
  return { ...useModelConfiguratorState(), ...useModelConfiguratorActions() };
}

export { ModelConfiguratorProvider, useModelConfigurator };
