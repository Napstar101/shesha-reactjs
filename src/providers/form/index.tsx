import React, { FC, useContext, PropsWithChildren, useEffect, MutableRefObject, useMemo } from 'react';
import formReducer from './reducer';
import {
  FormActionsContext,
  FormStateContext,
  UndoableFormStateContext,
  FORM_CONTEXT_INITIAL_STATE,
  IComponentAddPayload,
  IComponentDeletePayload,
  IComponentUpdatePayload,
  ISetVisibleComponentsPayload,
  IUpdateChildComponentsPayload,
  ISetFormDataPayload,
  IFormStateContext,
  ConfigurableFormInstance,
  IFormActionsContext,
  IFormSettings,
  DEFAULT_FORM_SETTINGS,
} from './contexts';
import { IFormProps, IFormActions, FormMarkup, FormMarkupWithSettings, IFormSections } from './models';
import { getFlagSetters } from '../utils/flagsSetters';
import {
  componentAddAction,
  componentDeleteAction,
  componentUpdateAction,
  componentUpdateSettingsValidationAction,
  loadRequestAction,
  loadSuccessAction,
  loadErrorAction,
  saveRequestAction,
  saveSuccessAction,
  saveErrorAction,
  setFormModeAction,
  setDebugModeAction,
  startDraggingAction,
  endDraggingAction,
  setVisibleComponentsAction,
  updateChildComponentsAction,
  setFormDataAction,
  setValidationErrorsAction,
  setSelectedComponentAction,
  changeMarkupAction,
  registerComponentActionsAction,
  updateFormSettingsAction,
  /* NEW_ACTION_IMPORT_GOES_HERE */
} from './actions';
import { FormMode } from './models';
import { useFormGet, useFormGetByPath, useFormUpdateMarkup, FormUpdateMarkupInput } from '../../apis/form';
import {
  componentsTreeToFlatStructure,
  componentsFlatStructureToTree,
  convertActions,
  getVisibleComponentIds,
  toolbarGroupsToComponents,
  getComponentsAndSettings,
  convertSectionsToList,
} from './utils';
import { FormInstance } from 'antd';
import { ActionCreators } from 'redux-undo';
import useThunkReducer from 'react-hook-thunk-reducer';
import { useDebouncedCallback } from 'use-debounce';
import { IAsyncValidationError, IFormValidationErrors, IToolboxComponentGroup } from '../../interfaces';

export interface IFormProviderProps {
  id?: string;
  path?: string;
  markup?: FormMarkup;
  mode: FormMode;
  form?: FormInstance<any>;
  actions?: IFormActions;
  sections?: IFormSections;
  context?: any; // todo: make generic
  formRef?: MutableRefObject<Partial<ConfigurableFormInstance> | null>;
  toolboxComponentGroups?: IToolboxComponentGroup[];
}

const FormProvider: FC<PropsWithChildren<IFormProviderProps>> = ({
  children,
  id,
  path,
  markup,
  mode,
  form,
  actions,
  sections,
  context,
  formRef,
  toolboxComponentGroups,
}) => {
  const formProps = getComponentsAndSettings(markup);
  const formComponents = formProps?.components;

  const actualComponentGroups = [
    ...(FORM_CONTEXT_INITIAL_STATE.toolboxComponentGroups || []),
    ...(toolboxComponentGroups || []),
  ];

  const toolboxComponents = useMemo(() => toolbarGroupsToComponents(actualComponentGroups), [toolboxComponentGroups]);

  const getToolboxComponent = (type: string) => toolboxComponents[type];

  const flatComponents = componentsTreeToFlatStructure(toolboxComponents, formComponents || []);

  const initial: IFormStateContext = {
    ...FORM_CONTEXT_INITIAL_STATE,
    id: id,
    path: path,
    formMode: mode,
    components: formComponents || [],
    form,
    actions: convertActions(null, actions),
    sections: convertSectionsToList(null, sections),
    context: context,
    toolboxComponentGroups: actualComponentGroups,
    ...flatComponents,
  };

  const [state, dispatch] = useThunkReducer(formReducer, {
    past: [],
    present: initial,
    future: [],
  });

  const fetcherById = useFormGet({ lazy: true, id });
  const fetcherByPath = useFormGetByPath({ lazy: true });
  const { loading: isFetchingFormInfo, error: fetchingFormInfoError, data: fetchingFormInfoResponse } = path
    ? fetcherByPath
    : fetcherById;

  const doFetchFormInfo = () => {
    if (id) {
      dispatch(loadRequestAction({ id }));
      fetcherById.refetch({});
    } else if (path) {
      dispatch(loadRequestAction({ path }));
      fetcherByPath.refetch({ queryParams: { path } });
    }
  };

  useEffect(() => {
    if (markup) return;

    doFetchFormInfo();
  }, [id, path, markup]);

  const EMPTY_PARSED_FORM: FormMarkupWithSettings = {
    components: [],
    formSettings: DEFAULT_FORM_SETTINGS,
  };

  const parseForm = (formJson: string): FormMarkupWithSettings => {
    try {
      const parsed = formJson ? JSON.parse(formJson) : null;

      if (parsed) {
        // old format: array of components
        if (Array.isArray(parsed)) {
          return {
            components: parsed,
            formSettings: DEFAULT_FORM_SETTINGS,
          } as FormMarkupWithSettings;
        }

        // new format
        if (parsed.components && parsed.formSettings) {
          return {
            components: parsed.components,
            formSettings: parsed.formSettings,
          } as FormMarkupWithSettings;
        }
      }

      return EMPTY_PARSED_FORM;
    } catch (error) {
      console.error('Failed to parse form. Error: ' + error);
      return EMPTY_PARSED_FORM;
    }
  };

  useEffect(() => {
    if (markup) {
      const formProps = getComponentsAndSettings(markup);
      /*
      const formProps: FormMarkupWithSettings = (markup as FormMarkupWithSettings)
        ? markup as FormMarkupWithSettings
        : {
          components: markup as IFormComponent[],
          formSettings: DEFAULT_FORM_SETTINGS,
        } as FormMarkupWithSettings;
        */

      const flatComponents = componentsTreeToFlatStructure(toolboxComponents, formProps.components);
      dispatch(changeMarkupAction(flatComponents));
      /*
      const flatComponents = componentsTreeToFlatStructure(markup);
      dispatch(changeMarkupAction(flatComponents));
      */
    } else {
      if (!isFetchingFormInfo) {
        if (fetchingFormInfoResponse) {
          const fetchedForm = fetchingFormInfoResponse?.result;
          if (fetchedForm) {
            const parsedForm = parseForm(fetchedForm.markup);

            const flatComponents = componentsTreeToFlatStructure(toolboxComponents, parsedForm.components);
            const formContent: IFormProps = {
              // todo: use partial for loading
              id: fetchedForm.id,
              path: fetchedForm.path,
              name: fetchedForm.name,
              description: fetchedForm.description,
              components: parsedForm.components,
              formSettings: parsedForm.formSettings,
              ...flatComponents,
            };
            // parse json content
            dispatch((dispatch, _getState) => {
              dispatch(loadSuccessAction(formContent));
              dispatch(ActionCreators.clearHistory());
            });
          }
        }

        if (fetchingFormInfoError) {
          // todo: handle error messages
          dispatch(loadErrorAction());
        }
      }
    }
  }, [isFetchingFormInfo, fetchingFormInfoResponse, fetchingFormInfoError, markup]);

  /* NEW_ACTION_DECLARATION_GOES_HERE */

  const addComponent = (payload: IComponentAddPayload) => {
    dispatch(componentAddAction(payload));
  };

  const deleteComponent = (payload: IComponentDeletePayload) => {
    dispatch(componentDeleteAction(payload));
  };

  const getComponentModel = id => {
    return state.present.allComponents[id];
  };

  const updateComponent = (payload: IComponentUpdatePayload) => {
    dispatch(componentUpdateAction(payload));

    const component = getComponentModel(payload.componentId);
    const toolboxComponent = getToolboxComponent(component.type);
    if (toolboxComponent.validateSettings) {
      toolboxComponent
        .validateSettings(payload.settings)
        .then(() => {
          dispatch(componentUpdateSettingsValidationAction({ componentId: payload.componentId, validationErrors: [] }));
        })
        .catch(({ errors }) => {
          const validationErrors = errors as IAsyncValidationError[];
          dispatch(
            componentUpdateSettingsValidationAction({
              componentId: payload.componentId,
              validationErrors: validationErrors,
            })
          );
        });
    }
  };

  const loadForm = () => {
    doFetchFormInfo();
  };

  // todo: review usage of useFormUpdateMarkup after
  const { mutate: saveFormHttp /*, loading: saveFormInProgress, error: saveFormError*/ } = useFormUpdateMarkup({
    id: id,
  });

  const saveForm = (): Promise<void> => {
    if (!state.present.id) return new Promise(() => {});

    dispatch(saveRequestAction());

    const markup: FormMarkupWithSettings = {
      components: componentsFlatStructureToTree(toolboxComponents, state.present),
      formSettings: state.present.formSettings,
    };

    const dto: FormUpdateMarkupInput = {
      id: state.present.id,
      markup: JSON.stringify(markup),
    };
    return saveFormHttp(dto, {})
      .then(_response => {
        dispatch(saveSuccessAction());
      })
      .catch(_error => {
        dispatch(saveErrorAction());
      });
  };

  const getChildComponents = (id: string) => {
    const childIds = state.present.componentRelations[id];
    if (!childIds) return [];
    const components = childIds.map(componentId => {
      return state.present.allComponents[componentId];
    });
    return components;
  };

  const setFormMode = (formMode: FormMode) => {
    dispatch(setFormModeAction(formMode));
  };

  const setDebugMode = (isDebug: boolean) => {
    dispatch(setDebugModeAction(isDebug));
  };

  const startDragging = () => {
    dispatch(startDraggingAction());
  };

  const endDragging = () => {
    dispatch(endDraggingAction());
  };

  const setVisibleComponents = (payload: ISetVisibleComponentsPayload) => {
    dispatch(setVisibleComponentsAction(payload));
  };

  const updateVisibleComponents = (context: IFormStateContext) => {
    const visibleComponents = getVisibleComponentIds(context.allComponents, context.formData);
    setVisibleComponents({ componentIds: visibleComponents });
  };

  const debouncedUpdateVisibleComponents = useDebouncedCallback<(context: IFormStateContext) => void>(
    context => {
      updateVisibleComponents(context);
    },
    // delay in ms
    200
  );

  const setFormData = (payload: ISetFormDataPayload) => {
    dispatch((dispatch, getState) => {
      dispatch(setFormDataAction(payload));

      // Update visible components. Note: debounced version is used to improve performance and prevent unneeded re-rendering
      const newState = getState().present;
      if (!newState.visibleComponentIds || newState.visibleComponentIds.length == 0) {
        updateVisibleComponents(newState);
      } else {
        debouncedUpdateVisibleComponents(newState);
      }
    });
  };

  const setValidationErrors = (payload: IFormValidationErrors) => {
    dispatch(setValidationErrorsAction(payload));
  };

  const updateChildComponents = (payload: IUpdateChildComponentsPayload) => {
    dispatch(updateChildComponentsAction(payload));
  };

  const undo = () => {
    dispatch(ActionCreators.undo());
  };

  const redo = () => {
    dispatch(ActionCreators.redo());
  };

  const setSelectedComponent = (id: string, componentRef?: MutableRefObject<any>) => {
    dispatch(setSelectedComponentAction({ id, componentRef }));
  };

  const registerActions = (id: string, actions: IFormActions) => {
    dispatch(registerComponentActionsAction({ id, actions: actions }));
  };

  const getAction = (id: string, name: string) => {
    // search requested action in all parents and fallback to form
    let currentId = id;
    do {
      let component = state.present.allComponents[currentId];

      let action = state.present.actions.find(a => a.owner == component?.parentId && a.name == name);
      if (action) return (data, parameters) => action.body(data, parameters);

      currentId = component?.parentId;
    } while (currentId);

    return null;
  };

  const getSection = (id: string, name: string) => {
    // search requested section in all parents and fallback to form
    let currentId = id;

    do {
      let component = state.present.allComponents[currentId];

      let action = state.present.sections.find(a => a.owner == component?.parentId && a.name == name);
      if (action) return data => action.body(data);

      currentId = component?.parentId;
    } while (currentId);

    return null;
  };

  const updateFormSettings = (settings: IFormSettings) => {
    dispatch(updateFormSettingsAction(settings));
  };

  const configurableFormActions: IFormActionsContext = {
    ...getFlagSetters(dispatch),
    addComponent,
    deleteComponent,
    getComponentModel,
    updateComponent,
    loadForm,
    saveForm,
    getChildComponents,
    setFormMode,
    setDebugMode,
    startDragging,
    endDragging,
    setVisibleComponents,
    setFormData,
    setValidationErrors,
    updateChildComponents,
    undo,
    redo,
    setSelectedComponent,
    registerActions,
    getAction,
    getSection,
    updateFormSettings,
    getToolboxComponent,
    /* NEW_ACTION_GOES_HERE */
  };
  if (formRef) formRef.current = { ...configurableFormActions, ...state.present };

  return (
    <UndoableFormStateContext.Provider value={state}>
      <FormStateContext.Provider value={state.present}>
        <FormActionsContext.Provider value={configurableFormActions}>{children}</FormActionsContext.Provider>
      </FormStateContext.Provider>
    </UndoableFormStateContext.Provider>
  );
};

function useFormState() {
  const context = useContext(FormStateContext);

  if (context === undefined) {
    throw new Error('useFormState must be used within a FormProvider');
  }

  return context;
}

function useFormActions() {
  const context = useContext(FormActionsContext);

  if (context === undefined) {
    throw new Error('useFormActions must be used within a FormProvider');
  }

  return context;
}

function useUndoableState() {
  const context = useContext(UndoableFormStateContext);

  if (context === undefined) {
    throw new Error('useUndoableState must be used within a FormProvider');
  }

  return {
    canUndo: context.past.length > 0,
    canRedo: context.future.length > 0,
  };
}

function useForm() {
  return { ...useFormState(), ...useFormActions(), ...useUndoableState() };
}

const isInDesignerMode = () => {
  const context = useContext(FormStateContext);
  return context ? context.formMode === 'designer' : false;
};

export { FormProvider, useFormState, useFormActions, useForm, isInDesignerMode };
