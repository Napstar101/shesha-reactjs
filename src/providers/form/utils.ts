import {
  IFlatComponentsStructure,
  IConfigurableFormComponent,
  ROOT_COMPONENT_KEY,
  IComponentsDictionary,
  IComponentsContainer,
  IFormActions,
  IFormAction,
  FormMarkup,
  FormMarkupWithSettings,
  IFormSection,
  IFormSections,
} from './models';
import Mustache from 'mustache';
import { IToolboxComponent, IToolboxComponentGroup, IToolboxComponents } from '../../interfaces';
import Schema, { Rules, ValidateSource } from 'async-validator';
import { DEFAULT_FORM_SETTINGS, IFormSettings } from './contexts';
import { formGet, formGetByPath } from '../../apis/form';
import { IPropertyMetadata } from '../../interfaces/metadata';
import { nanoid } from 'nanoid';
import { Rule } from 'antd/lib/form';

/** Convert components tree to flat structure.
 * In flat structure we store components settings and their relations separately:
 *    allComponents - dictionary (key:value) of components. key - Id of the component, value - conponent settings
 *    componentRelations - dictionary of component relations. key - id of the container, value - ordered list of subcomponent ids
 * */
export const componentsTreeToFlatStructure = (
  toolboxComponents: IToolboxComponents,
  components: IConfigurableFormComponent[]
): IFlatComponentsStructure => {
  let result: IFlatComponentsStructure = {
    allComponents: {},
    componentRelations: {},
  };

  const processComponent = (component: IConfigurableFormComponent, parentId?: string) => {
    // prepare component runtime
    result.allComponents[component.id] = {
      ...component,
      parentId,
      visibilityFunc: getCustomVisibilityFunc(component),
      enabledFunc: getCustomEnabledFunc(component),
    };

    const level = result.componentRelations[parentId] || [];
    level.push(component.id);
    result.componentRelations[parentId] = level;

    if (component.type) {
      const componentRegistration = toolboxComponents[component.type];

      // custom containers
      let customContainerNames = componentRegistration?.customContainerNames || [];
      let subContainers: IComponentsContainer[] = [];
      customContainerNames.forEach(containerName => {
        const containers = component[containerName] as IComponentsContainer[];
        if (containers) subContainers = [...subContainers, ...containers];
      });
      if (component['components']) subContainers.push({ id: component.id, components: component['components'] });

      subContainers.forEach(subContainer => {
        if (subContainer && subContainer.components) {
          subContainer.components.forEach(c => {
            processComponent(c, subContainer.id);
          });
        }
      });
    }
  };

  if (components) {
    components.forEach(component => {
      processComponent(component, ROOT_COMPONENT_KEY);
    });
  }

  return result;
};

/** Convert flat components structure to a component tree */
export const componentsFlatStructureToTree = (
  toolboxComponents: IToolboxComponents,
  flat: IFlatComponentsStructure
): IConfigurableFormComponent[] => {
  let tree: IConfigurableFormComponent[] = [];

  const processComponent = (container: IConfigurableFormComponent[], ownerId: string) => {
    const componentIds = flat.componentRelations[ownerId];

    if (!componentIds) return;

    // iterate all component ids on the current level
    componentIds.forEach(id => {
      // extract current component and add to hierarchy
      const component = { ...flat.allComponents[id] };
      container.push(component);

      //  process all childs if any
      if (id in flat.componentRelations) {
        const childComponents: IConfigurableFormComponent[] = [];
        processComponent(childComponents, id);
        component['components'] = childComponents;
      }

      // note: this function may be called for custom container without type
      if (component.type) {
        const componentRegistration = toolboxComponents[component.type];

        const customContainers = componentRegistration?.customContainerNames || [];
        customContainers.forEach(containerName => {
          const childContainers = component[containerName] as IComponentsContainer[];

          if (childContainers) {
            childContainers.forEach(c => {
              const childComponents: IConfigurableFormComponent[] = [];
              processComponent(childComponents, c.id);
              c.components = childComponents;
            });
          }
        });
      }
    });
  };

  processComponent(tree, ROOT_COMPONENT_KEY);

  return tree;
};

/**
 * Load form from the back-end
 */
export const loadFormById = (id: string) => {
  return formGet({ id });
};
export const loadFormByPath = (path: string) => {
  return formGetByPath({ path }, {});
};

export const getCustomVisibilityFunc = ({ customVisibility, name }: IConfigurableFormComponent) => {
  if (customVisibility) {
    // console.log('customVisibility : name, customVisibility', name, customVisibility);
  }

  if (customVisibility) {
    try {
      const customVisibilityExecutor = customVisibility ? new Function('value, data', customVisibility) : null;

      const getIsVisible = function(data = {}) {
        if (customVisibilityExecutor) {
          try {
            return customVisibilityExecutor(name ? data[name] : undefined, data);
          } catch (e) {
            console.warn(`Custom Visibility of field ${name} throws exception: ${e}`);
            return true;
          }
        }

        return true;
        //return !(component.contextData && component.contextData.isEmpty && component.contextData.readOnly && component.hideWhenEmpty);
      };

      return getIsVisible;
    } catch (e) {
      return () => {
        console.warn(`Incorrect syntax of the 'Custom Visibility', field name: ${name}, error: ${e}`);
      };
    }
  } else return () => true;
};

export const getCustomEnabledFunc = ({ customEnabled, name }: IConfigurableFormComponent) => {
  if (customEnabled) {
    try {
      const customEnabledExecutor = customEnabled ? new Function('value, data', customEnabled) : null;

      const getIsEnabled = function(data = {}) {
        if (customEnabledExecutor) {
          try {
            return customEnabledExecutor(name ? data[name] : undefined, data);
          } catch (e) {
            console.error(`Custom Enabled of field ${name} throws exception: ${e}`);
            return true;
          }
        }

        return true;
        //return !(component.contextData && component.contextData.isEmpty && component.contextData.readOnly && component.hideWhenEmpty);
      };

      return getIsEnabled;
    } catch (e) {
      return () => {
        console.warn(`Incorrect syntax of the 'Custom Enabled', field name: ${name}, error: ${e}`);
      };
    }
  } else return () => true;
};

export const evaluateString = (template, data) => {
  return template ? Mustache.render(template, data) : template;
};

export const getVisibilityFunc2 = (expression, name) => {
  if (expression) {
    try {
      const customVisibilityExecutor = expression ? new Function('data, context', expression) : null;

      const getIsVisible = function(data = {}, context = {}) {
        if (customVisibilityExecutor) {
          try {
            return customVisibilityExecutor(data, context);
          } catch (e) {
            console.warn(`Custom Visibility of ${name} throws exception: ${e}`);
            return true;
          }
        }

        return true;
      };

      return getIsVisible;
    } catch (e) {
      return () => {
        console.warn(`Incorrect syntax of the 'Custom Visibility', component: ${name}, error: ${e}`);
      };
    }
  } else return () => true;
};

/**
 * Return ids of visible components according to the custom visibility
 */
export const getVisibleComponentIds = (components: IComponentsDictionary, values: any): string[] => {
  let visibleComponents: string[] = [];
  for (let key in components) {
    const component = components[key] as IConfigurableFormComponent;
    if (!component || component.hidden) continue;

    const isVisible = component.visibilityFunc == null || component.visibilityFunc(values);
    if (isVisible) visibleComponents.push(key);
  }
  return visibleComponents;
};

/**
 * Return ids of visible components according to the custom enabled
 */
export const getEnabledComponentIds = (components: IComponentsDictionary, values: any): string[] => {
  let enabledComponents: string[] = [];
  for (let key in components) {
    const component = components[key] as IConfigurableFormComponent;
    if (!component || component.disabled) continue;

    const isEnabled =
      !Boolean(component?.enabledFunc) ||
      (typeof component?.enabledFunc === 'function' && component?.enabledFunc(values));

    if (isEnabled) enabledComponents.push(key);
  }
  return enabledComponents;
};

/**
 * Return field name for the antd form by a given expression
 * @param expression field name in dot notation e.g. 'supplier.name' or 'fullName'
 */
export const getFieldNameFromExpression = (expression: string) => {
  if (!expression) return '';

  return expression.includes('.') ? expression.split('.') : expression;
};

/**
 * Return valudation rules for the specified form component
 */
export const getValidationRules = (component: IConfigurableFormComponent) => {
  const { validate } = component;
  let rules: Rule[] = [];

  // todo: implement more generic way (e.g. using validation providers)

  if (validate) {
    if (validate.required)
      rules.push({
        required: true,
        message: validate?.message || 'This field is required',
      });

    if (validate.minValue)
      rules.push({
        min: validate.minValue,
        type: 'number',
      });

    if (validate.maxValue)
      rules.push({
        max: validate.maxValue,
        type: 'number',
      });

    if (validate.minLength)
      rules.push({
        min: validate.minLength,
        type: 'string',
      });

    if (validate.maxLength)
      rules.push({
        max: validate.maxLength,
        type: 'string',
      });

    if (validate.validator)
      rules.push({
        validator: (...r) => new Function('rule', 'value', 'callback', validate.validator)(...r),
      });
  }

  return rules;
};

/* Convert string to camelCase */
export const camelize = str => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
};

const DICTIONARY_ACCESSOR_REGEX = /(^[\s]*\{(?<key>[\w]+)\.(?<accessor>[^\}]+)\}[\s]*$)/;
const NESTED_ACCESSOR_REGEX = /((?<key>[\w]+)\.(?<accessor>[^\}]+))/;

export const evaluateValue = (value: string, dictionary: any) => {
  return _evaluateValue(value, dictionary, true);
};

export const _evaluateValue = (value: string, dictionary: any, isRoot: boolean) => {
  if (!value) return value;
  if (!dictionary) return null;

  const match = value.match(isRoot ? DICTIONARY_ACCESSOR_REGEX : NESTED_ACCESSOR_REGEX);
  if (!match) return value;

  // check nested properties
  if (match.groups.accessor.match(NESTED_ACCESSOR_REGEX)) {
    // try get value recursive
    return _evaluateValue(match.groups.accessor, dictionary[match.groups.key], false);
  } else {
    const container = dictionary[match.groups.key];
    if (!container) return null;

    const evaluatedValue = container[match.groups.accessor];

    // console.log({
    //   msg: 'regex parsed',
    //   key: match.groups.key,
    //   accessor: match.groups.accessor,
    //   evaluatedValue,
    // });

    return evaluatedValue;
  }
};

const TAGS_REGEX = /{(?<key>[\w]+)\.(?<accessor>[^\}]+)\}/;

export const replaceTags = (value: string, dictionary: any) => {
  if (!value) return value;

  const match = value.match(TAGS_REGEX);
  if (!match) return value;

  if (!dictionary) return null;

  const result = value.replace(TAGS_REGEX, (_match, key, accessor) => {
    const container = dictionary[key] || {};
    return container[accessor] || '';
  });

  return result;
};

export const convertActions = (ownerId: string, actions: IFormActions): IFormAction[] => {
  let result: IFormAction[] = [];
  for (let key in actions) {
    result.push({
      owner: ownerId,
      name: key,
      body: actions[key],
    });
  }
  return result;
};

export const convertSectionsToList = (ownerId: string, sections: IFormSections): IFormSection[] => {
  let result: IFormSection[] = [];
  for (let key in sections) {
    result.push({
      owner: ownerId,
      name: key,
      body: sections[key],
    });
  }

  return result;
};

export const toolbarGroupsToComponents = (availableComponents: IToolboxComponentGroup[]): IToolboxComponents => {
  let allComponents: IToolboxComponents = {};
  if (availableComponents) {
    availableComponents.forEach(group => {
      group.components.forEach(component => {
        allComponents[component.type] = component;
      });
    });
  }
  return allComponents;
};

export const findToolboxComponent = (
  availableComponents: IToolboxComponentGroup[],
  predicate: (component: IToolboxComponent) => boolean
): IToolboxComponent => {
  if (availableComponents) {
    for (let gIdx = 0; gIdx < availableComponents.length; gIdx++) {
      const group = availableComponents[gIdx];
      for (let cIdx = 0; cIdx < group.components.length; cIdx++) {
        if (predicate(group.components[cIdx])) return group.components[cIdx];
      }
    }
  }

  return null;
};

/** backward compatibility */
export const getComponentsAndSettings = (markup: FormMarkup): FormMarkupWithSettings => {
  return {
    components: getComponentsFromMarkup(markup),
    formSettings: getFromSettingsFromMarkup(markup),
  };
};

export const getComponentsFromMarkup = (markup: FormMarkup): IConfigurableFormComponent[] => {
  if (!markup) return [];
  return Array.isArray(markup)
    ? (markup as IConfigurableFormComponent[])
    : (markup as FormMarkupWithSettings).components;
};

export const getFromSettingsFromMarkup = (markup: FormMarkup): IFormSettings => {
  return Array.isArray(markup) || !Boolean(markup)
    ? DEFAULT_FORM_SETTINGS
    : (markup as FormMarkupWithSettings).formSettings;
};

export const validateForm = (rules: Rules, values: ValidateSource): Promise<void> => {
  const validator = new Schema(rules);

  return validator.validate(values);
};

export const getFormValidationRules = (markup: FormMarkup): Rules => {
  const components = getComponentsFromMarkup(markup);

  const rules: Rules = {};
  components.forEach(component => {
    rules[component.name] = getValidationRules(component) as [];
  });

  return rules;
};

export const validateConfigurableComponentSettings = (markup: FormMarkup, values: ValidateSource): Promise<void> => {
  const rules = getFormValidationRules(markup);
  const validator = new Schema(rules);

  return validator.validate(values);
};

export function listComponentToModelMetadata<TModel extends IConfigurableFormComponent>(
  component: IToolboxComponent<TModel>,
  model: TModel,
  metadata: IPropertyMetadata
): TModel {
  let mappedModel = model;

  // map standard properties
  if (metadata.label) mappedModel.label = metadata.label;
  if (metadata.description) mappedModel.description = metadata.description;

  // map component-specific properties
  if (component.linkToModelMetadata) mappedModel = component.linkToModelMetadata(model, metadata);

  return mappedModel;
}

const getContainerNames = (toolboxComponent: IToolboxComponent): string[] => {
  const containers = [...(toolboxComponent.customContainerNames ?? [])];
  if (!containers.includes('components'))
    containers.push('components');
  return containers;
}

export type ProcessingFunc = (child: IConfigurableFormComponent, parentId: string) => void;

export const processRecursive = (componentsRegistration: IToolboxComponentGroup[], parentId: string, component: IConfigurableFormComponent, func: ProcessingFunc) => {
  func(component, parentId);

  const toolboxComponent = findToolboxComponent(componentsRegistration, c => c.type === component.type);
  const containers = getContainerNames(toolboxComponent);

  if (containers) {
    containers.forEach(containerName => {
      const containerComponents = component[containerName] as IConfigurableFormComponent[];
      if (containerComponents){
        containerComponents.forEach(child => {
          func(child, component.id);
          processRecursive(componentsRegistration, parentId, child, func);
        });
      }
    });
  }
}

/**
 * Clone components and generate new ids for them
 * @param componentsRegistration 
 * @param components 
 * @returns 
 */
export const cloneComponents = (componentsRegistration: IToolboxComponentGroup[], components: IConfigurableFormComponent[]): IConfigurableFormComponent[] => {
  let result: IConfigurableFormComponent[] = [];

  components.forEach(component => {
    let clone = {...component, id: nanoid() };

    result.push(clone);

    const toolboxComponent = findToolboxComponent(componentsRegistration, c => c.type === component.type);
    const containers = getContainerNames(toolboxComponent);
  
    if (containers) {
      containers.forEach(containerName => {
        const containerComponents = clone[containerName] as IConfigurableFormComponent[];
        if (containerComponents){
          const newChilds = cloneComponents(componentsRegistration, containerComponents);
          clone[containerName] = newChilds;
        }
      });
    }
  });

  return result;
}

export const createComponentModelForDataProperty = (
  components: IToolboxComponentGroup[],
  propertyMetadata: IPropertyMetadata
): IConfigurableFormComponent => {
  const toolboxComponent = findToolboxComponent(
    components,
    c =>
      Boolean(c.dataTypeSupported) &&
      c.dataTypeSupported({ dataType: propertyMetadata.dataType, dataFormat: propertyMetadata.dataFormat })
  );
  if (!Boolean(toolboxComponent)) return null;

  // find appropriate toolbox component
  // create instance of the component
  // init default values for the component
  // init component according to the metadata

  let componentModel: IConfigurableFormComponent = {
    id: nanoid(),
    type: toolboxComponent.type,
    name: camelize(propertyMetadata.path),
    label: propertyMetadata.label,
    labelAlign: 'right',
    //parentId: containerId,
    hidden: false,
    customVisibility: null,
    visibilityFunc: _data => true,
    isDynamic: false,
  };
  if (toolboxComponent.initModel) componentModel = toolboxComponent.initModel(componentModel);

  componentModel = listComponentToModelMetadata(toolboxComponent, componentModel, propertyMetadata);

  return componentModel;
};