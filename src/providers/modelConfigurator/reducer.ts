import {
  IModelConfiguratorStateContext,
  IUpdateChildItemsPayload,
  IUpdateItemSettingsPayload,
  MODEL_CONFIGURATOR_CONTEXT_INITIAL_STATE,
} from './contexts';
import { ModelActionEnums } from './actions';
import { handleActions } from 'redux-actions';
import { getItemPositionById } from './utils';
import { IModelItem } from '../../interfaces/modelConfigurator';
import { nanoid } from 'nanoid/non-secure';
import { ModelConfigurationDto } from '../../apis/modelConfigurations';

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

      const items: IModelItem[] = payload.properties.map<IModelItem>(p => ({
        id: p.id,
        name: p.name,
        itemType: 'property',
        label: p.label,
        description: p.description,
        dataType: p.dataType,
        dataFormat: p.dataFormat,
        entityType: p.entityType,
        referenceListName: p.referenceListName,
        referenceListNamespace: p.referenceListNamespace,
        source: p.source,
        //properties: p.properties,
      }));

      return {
        ...state,
        className: payload.className,
        namespace: payload.namespace,
        items: items,

        /*
        friendlyName: payload.friendlyName,
        typeShortAlias: payload.typeShortAlias,
        tableName: payload.tableName,
        discriminatorValue: payload.discriminatorValue,
        */       
      };
    },

    [ModelActionEnums.AddItem]: (state: IModelConfiguratorStateContext) => {
      const itemProps: IModelItem = {
        id: nanoid(),
        itemType: 'property',
        name: `New property`,
        //childItems: [],
      };

      const newItems = [...state.items];

      const parent = null;

      if (parent) {
        parent.childItems = [...parent.childItems, itemProps];
      } else newItems.push(itemProps);

      return {
        ...state,
        items: newItems,
        selectedItemId: itemProps.id,
      };
    },

    [ModelActionEnums.DeleteItem]: (
      state: IModelConfiguratorStateContext,
      action: ReduxActions.Action<string>
    ) => {
      const { payload } = action;

      const items = removeIdDeep([...state.items], payload);

      return {
        ...state,
        items,
        selectedItemId: state.selectedItemId === payload ? null : state.selectedItemId,
      };
    },

    [ModelActionEnums.SelectItem]: (
      state: IModelConfiguratorStateContext,
      action: ReduxActions.Action<string>
    ) => {
      // console.log('[ModelActionEnums.SelectItem]');
      const { payload } = action;

      return {
        ...state,
        selectedItemId: payload,
      };
    },

    [ModelActionEnums.UpdateItem]: (
      state: IModelConfiguratorStateContext,
      action: ReduxActions.Action<IUpdateItemSettingsPayload>
    ) => {
      const { payload } = action;

      const newItems = [...state.items];

      const position = getItemPositionById(newItems, payload.id);

      if (!position) return state;

      let newArray = position.ownerArray;

      newArray[position.index] = {
        ...newArray[position.index],
        ...payload.settings,
      };

      return {
        ...state,
        items: newItems,
      };
    },

    [ModelActionEnums.UpdateChildItems]: (
      state: IModelConfiguratorStateContext,
      action: ReduxActions.Action<IUpdateChildItemsPayload>
    ) => {
      // console.log('[ModelActionEnums.UpdateChildItems]');
      const {
        payload: { index, childs: childIds },
      } = action;
      if (!Boolean(index) || index.length == 0) {
        return {
          ...state,
          items: childIds,
        };
      }
      // copy all items
      const newItems = [...state.items];
      // blockIndex - full index of the current container
      const blockIndex = [...index];
      // lastIndex - index of the current element in its' parent
      const lastIndex = blockIndex.pop();

      // search for a parent item
      const lastArr = blockIndex.reduce((arr, i) => arr[i]['properties'], newItems);

      // and set a list of childs
      lastArr[lastIndex]['properties'] = childIds;

      return {
        ...state,
        items: newItems,
      };
    },

    [ModelActionEnums.AddGroup]: (state: IModelConfiguratorStateContext) => {
      const groupProps: IModelItem = {
        id: nanoid(),
        itemType: 'group',
        name: `New Group`,
        properties: [],
      };

      return {
        ...state,
        items: [groupProps, ...state.items],
        selectedItemId: groupProps.id,
      };
    },

    [ModelActionEnums.DeleteGroup]: (
      state: IModelConfiguratorStateContext,
      action: ReduxActions.Action<string>
    ) => {
      const { payload } = action;

      const newItems = state.items.filter(item => item.id !== payload);

      return {
        ...state,
        items: [...newItems],
        selectedItemId: state.selectedItemId === payload ? null : state.selectedItemId,
      };
    },
  },

  MODEL_CONFIGURATOR_CONTEXT_INITIAL_STATE
);

export default modelReducer;

function removeIdDeep(list: IModelItem[], idToRemove: string) {
  const filtered = list.filter(entry => entry.id !== idToRemove);
  return filtered.map(entry => {
    if (!entry.properties) return entry;
    return { ...entry, childItems: removeIdDeep(entry.properties, idToRemove) };
  });
}
