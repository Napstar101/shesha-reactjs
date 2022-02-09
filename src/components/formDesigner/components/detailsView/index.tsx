import React from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { ProfileOutlined } from '@ant-design/icons';
import settingsFormJson from './settingsForm.json';
import { Page } from '../../../..';
import ComponentsContainer from '../../componentsContainer';
import { useForm } from '../../../../providers/form';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import ConditionalWrap from '../../../conditionalWrapper';

export interface IDetailsViewProps extends IConfigurableFormComponent {}

const settingsForm = settingsFormJson as FormMarkup;

const DetailsViewComponent: IToolboxComponent<IDetailsViewProps> = {
  type: 'detailsView',
  name: 'Details View',
  icon: <ProfileOutlined />,
  factory: (model: IDetailsViewProps) => {
    const { formMode, visibleComponentIds } = useForm();

    const hiddenByCondition = visibleComponentIds && !visibleComponentIds.includes(model.id);

    const isDesignerMode = formMode === 'designer';

    const isHidden = !isDesignerMode && (model.hidden || hiddenByCondition);

    if (isHidden) return null;

    return (
      <ConditionalWrap condition={!isDesignerMode} wrap={children => <Page>{children}</Page>}>
        <ComponentsContainer containerId={model.id} />
      </ConditionalWrap>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  initModel: model => {
    const customProps: IDetailsViewProps = {
      ...model,
    };
    return customProps;
  },
};

export default DetailsViewComponent;
