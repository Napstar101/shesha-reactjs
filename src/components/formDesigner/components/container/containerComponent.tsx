import React from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { GroupOutlined } from '@ant-design/icons';
import settingsFormJson from './settingsForm.json';
import ComponentsContainer from '../../componentsContainer';
import { useForm } from '../../../../providers/form';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';

export type ContainerDirection = 'horizontal' | 'vertical';
export type JustifyContent =
  | 'center'
  | 'left'
  | 'right'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch';

export interface IContainerComponentProps extends IConfigurableFormComponent {
  justifyContent?: JustifyContent;
  direction: ContainerDirection;
  className?: string;
}

const settingsForm = settingsFormJson as FormMarkup;

const ContainerComponent: IToolboxComponent<IContainerComponentProps> = {
  type: 'container',
  name: 'Container',
  icon: <GroupOutlined />,
  factory: (model: IContainerComponentProps) => {
    const { isComponentHidden } = useForm();

    if (isComponentHidden(model)) return null;

    return (
      <ComponentsContainer
        containerId={model.id}
        direction={model.direction}
        justifyContent={model.direction === 'horizontal' ? model?.justifyContent : null}
        className={model.className}
      />
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  initModel: (model: IContainerComponentProps) => {
    const customProps: IContainerComponentProps = {
      ...model,
      direction: 'vertical',
      justifyContent: 'left',
    };

    return customProps;
  },
};

export default ContainerComponent;
