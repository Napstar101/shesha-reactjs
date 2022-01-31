import {
  IModelConfiguratorStateContext,
  MODEL_CONFIGURATOR_CONTEXT_INITIAL_STATE,
} from './contexts';
import { ModelActionEnums } from './actions';
import { handleActions } from 'redux-actions';
import { IModelItem } from '../../interfaces/modelConfigurator';
import { ModelPropertyDto, ModelConfigurationDto } from '../../apis/modelConfigurations';

const mapPropertyToModelItem = (property: ModelPropertyDto): IModelItem => {
  const result = {
    id: property.id,
    name: property.name,
    label: property.label,
    description: property.description,
    dataType: property.dataType,
    dataFormat: property.dataFormat,
    entityType: property.entityType,
    referenceListName: property.referenceListName,
    referenceListNamespace: property.referenceListNamespace,
    source: property.source,
    properties: property.properties.map<IModelItem>(p => mapPropertyToModelItem(p)),
  }

  return result;  
}

const modelReducer = handleActions<IModelConfiguratorStateContext, any>(
  {
    [ModelActionEnums.LoadRequest]: (state: IModelConfiguratorStateContext) => {
      return {
        ...state,
        //id: payload
      };
    },

    [ModelActionEnums.LoadSuccess]: (
      state: IModelConfiguratorStateContext,
      action: ReduxActions.Action<ModelConfigurationDto>
    ) => {
      const { payload } = action;

      return {
        ...state,
        modelConfiguration: payload,
      };
    },

    [ModelActionEnums.SaveSuccess]: (
      state: IModelConfiguratorStateContext,
      action: ReduxActions.Action<ModelConfigurationDto>
    ) => {
      const { payload } = action;

      return {
        ...state,
        id: payload.id,
        modelConfiguration: {...payload},
      };
    },
  },

  MODEL_CONFIGURATOR_CONTEXT_INITIAL_STATE
);

export default modelReducer;