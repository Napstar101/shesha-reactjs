import React, { FC, useReducer, useContext, PropsWithChildren } from 'react';
import modelReducer from './reducer';
import {
  IModelSettings,
  IUpdateChildItemsPayload,
  IUpdateItemSettingsPayload,
  ModelConfiguratorActionsContext,
  ModelConfiguratorStateContext,
  MODEL_CONFIGURATOR_CONTEXT_INITIAL_STATE,
} from './contexts';
import {
  addItemAction,
  deleteItemAction,
  selectItemAction,
  updateChildItemsAction,
  updateItemAction,
  addGroupAction,
  deleteGroupAction,
  loadRequestAction,
  loadSuccessAction,
  loadErrorAction,

  saveRequestAction,
  saveSuccessAction,
  saveErrorAction,
  setModelSettingsAction,
  /* NEW_ACTION_IMPORT_GOES_HERE */
} from './actions';
import { getItemById } from './utils';
import { IModelItem } from '../../interfaces/modelConfigurator';
import { EntityConfigDto, /*entityConfigGet,*/ entityConfigUpdate } from '../../apis/entityConfig';
import { /*ModelConfigurationDto,*/ modelConfigurationsGetById } from '../../apis/modelConfigurations';
import { useSheshaApplication } from '../../providers';

export interface IModelConfiguratorProviderPropsBase {
  baseUrl?: string;
}

export interface IModelConfiguratorProviderProps {
  id?: string;
  name?: string;
  namespace?: string;
  items: IModelItem[];
}

const ModelConfiguratorProvider: FC<PropsWithChildren<IModelConfiguratorProviderProps>> = props => {
  const { children } = props;

  const { backendUrl } = useSheshaApplication();

  const [state, dispatch] = useReducer(modelReducer, {
    ...MODEL_CONFIGURATOR_CONTEXT_INITIAL_STATE,
    items: props.items || [],
    id: props.id,
  });

  /*
  const { refetch: fetchConfig, data: fetchedConfig, error: _fetchError } = useEntityConfigGet({ lazy: true, queryParams: { id: props.id } });
  useEffect(() => {
    console.log({ fetchedConfig });
  }, [fetchedConfig]);
  */
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

  const load = () => {
    if (state.id){
      dispatch(loadRequestAction());

      // { name: state.className, namespace: state.namespace }
      modelConfigurationsGetById({ id: state.id, base: backendUrl })
        .then(response => {
          if (response.success)
          {
            console.log('fetched config', response.result);
            dispatch(loadSuccessAction(response.result));
          }
          else
            dispatch(loadErrorAction(response.error));
        })
        .catch(e => {
          dispatch(loadErrorAction({ message: 'Failed to load model', details: e }));
        });
    }
    else
      console.error("Failed to fetch a model configuraiton by Id - Id not specified");

    /*
    if (props.id){
      dispatch(loadRequestAction());

      entityConfigGet({ id: state.id }, { base: backendUrl })
        .then(response => {
          if (response.success)
            dispatch(loadSuccessAction(response.result));
          else
            dispatch(loadErrorAction(response.error));
        })
        .catch(e => {
          dispatch(loadErrorAction({ message: 'Failed to load model', details: e }));
        });
    }
    else
      console.error("Failed to fetch a model configuraiton by Id - Id not specified");
    */
  }

  const save = (): Promise<void> => {
    // todo: validate all properties

    if (!state.id) return new Promise(() => { });

    dispatch(saveRequestAction());

    const dto: EntityConfigDto = {
      id: state.id,
      namespace: state.namespace,
      className: state.className,

      friendlyName: state.friendlyName,
      typeShortAlias: state.typeShortAlias,
      tableName: state.tableName,
      discriminatorValue: state.discriminatorValue,
    };

    return entityConfigUpdate(dto, { base: backendUrl })
      .then(response => {
        if (response.success)
          dispatch(saveSuccessAction(response.result));
        else
          dispatch(saveErrorAction(response.error));
      })
      .catch(error => {
        dispatch(saveErrorAction({ message: 'Failed to save model', details: error }));
      });
  }

  const setModelSettings = (settings: IModelSettings) => {
    dispatch(setModelSettingsAction(settings));
  }

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
          load, 
          save,
          setModelSettings,
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
