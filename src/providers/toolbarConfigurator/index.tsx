import React, { FC, useReducer, useContext, PropsWithChildren } from 'react';
import toolbarReducer from './reducer';
import {
  IUpdateChildItemsPayload,
  IUpdateItemSettingsPayload,
  ToolbarConfiguratorActionsContext,
  ToolbarConfiguratorStateContext,
  TOOLBAR_CONTEXT_INITIAL_STATE,
} from './contexts';
import {
  addButtonAction,
  deleteButtonAction,
  addGroupAction,
  deleteGroupAction,
  selectItemAction,
  updateChildItemsAction,
  updateItemAction,
  /* NEW_ACTION_IMPORT_GOES_HERE */
} from './actions';
import { ToolbarItemProps } from './models';
import { getItemById } from './utils';

export interface IToolbarConfiguratorProviderPropsBase {
  baseUrl?: string;
}

export interface IToolbarConfiguratorProviderProps {
  items: ToolbarItemProps[];
  value?: any;
  onChange?: (value: any) => void;
}

const ToolbarConfiguratorProvider: FC<PropsWithChildren<IToolbarConfiguratorProviderProps>> = props => {
  const {
    // onChange,
    // value,
    children,
  } = props;

  const [state, dispatch] = useReducer(toolbarReducer, {
    ...TOOLBAR_CONTEXT_INITIAL_STATE,
    items: props.items,
  });

  const addButton = () => {
    dispatch(addButtonAction());
  };

  const deleteButton = (uid: string) => {
    dispatch(deleteButtonAction(uid));
  };

  const addGroup = () => {
    dispatch(addGroupAction());
  };

  const deleteGroup = (uid: string) => {
    dispatch(deleteGroupAction(uid));
  };

  const selectItem = (uid: string) => {
    dispatch(selectItemAction(uid));
  };

  const updateChildItems = (payload: IUpdateChildItemsPayload) => {
    dispatch(updateChildItemsAction(payload));
  };

  const getItem = (uid: string): ToolbarItemProps => {
    return getItemById(state.items, uid);
  };

  const updateItem = (payload: IUpdateItemSettingsPayload) => {
    dispatch(updateItemAction(payload));
  };
  /*
  const getChildItems = (path: string[]): ToolbarItemProps[] => {
    if (path == null || path.length === 0)
      return state.items;
    
    let parent: ToolbarItemProps = null;
    path.forEach(item => {
      state.items
    })
    reduce(state.items, (prev, curr) => )
    return null;
  }
  */
  /* NEW_ACTION_DECLARATION_GOES_HERE */

  return (
    <ToolbarConfiguratorStateContext.Provider value={state}>
      <ToolbarConfiguratorActionsContext.Provider
        value={{
          addButton,
          deleteButton,
          addGroup,
          deleteGroup,
          selectItem,
          updateChildItems,
          getItem,
          updateItem,
          //getChildItems,
          /* NEW_ACTION_GOES_HERE */
        }}
      >
        {children}
      </ToolbarConfiguratorActionsContext.Provider>
    </ToolbarConfiguratorStateContext.Provider>
  );
};

function useToolbarConfiguratorState() {
  const context = useContext(ToolbarConfiguratorStateContext);

  if (context === undefined) {
    throw new Error('useToolbarConfiguratorState must be used within a ToolbarConfiguratorProvider');
  }

  return context;
}

function useToolbarConfiguratorActions() {
  const context = useContext(ToolbarConfiguratorActionsContext);

  if (context === undefined) {
    throw new Error('useToolbarConfiguratorActions must be used within a ToolbarConfiguratorProvider');
  }

  return context;
}

function useToolbarConfigurator() {
  return { ...useToolbarConfiguratorState(), ...useToolbarConfiguratorActions() };
}

export { ToolbarConfiguratorProvider, useToolbarConfigurator };
