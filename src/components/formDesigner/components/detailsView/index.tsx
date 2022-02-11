import React from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { BarChartOutlined, DashboardFilled, ProfileOutlined } from '@ant-design/icons';
import settingsFormJson from './settingsForm.json';
import { Page } from '../../../..';
import ComponentsContainer from '../../componentsContainer';
import { useForm } from '../../../../providers/form';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import DetailsViewSettings, { IDetailsPageSettingsProps } from './settings';
import { IDetailsViewProps } from './models';

export interface IDetailsViewComponentProps extends IDetailsPageSettingsProps, IConfigurableFormComponent {}

const settingsForm = settingsFormJson as FormMarkup;

const DetailsViewComponent: IToolboxComponent<IDetailsViewComponentProps> = {
  type: 'detailsView',
  name: 'Details View',
  icon: <ProfileOutlined />,
  factory: (model: IDetailsViewComponentProps) => {
    console.log('DetailsViewComponent model :>> ', model);
    const { formMode, visibleComponentIds } = useForm();

    const hiddenByCondition = visibleComponentIds && !visibleComponentIds.includes(model.id);

    const isDesignerMode = formMode === 'designer';

    const isHidden = !isDesignerMode && (model.hidden || hiddenByCondition);

    if (isHidden) return null;

    return (
      <Page
        title="Some heading"
        toolbarItems={[
          { title: 'Some title', icon: <DashboardFilled /> },
          { title: 'Another title', icon: <BarChartOutlined /> },
        ]}
        backUrl={'Some back url'}
        headerTagList={[
          { title: 'Some title', tag: 'Some tag' },
          { title: 'Another title', tag: 'another tag' },
        ]}
      >
        <ComponentsContainer containerId={model.id} />
      </Page>
    );
    // return (
    //   <ConditionalWrap condition={!isDesignerMode} wrap={children => <Page>{children}</Page>}>
    //     <ComponentsContainer containerId={model.id} />
    //   </ConditionalWrap>
    // );
  },
  // settingsFormMarkup: settingsForm,
  settingsFormFactory: ({ model, onSave, onCancel, onValuesChange }) => {
    return (
      <DetailsViewSettings
        model={(model as unknown) as IDetailsViewProps}
        onSave={onSave as any}
        onCancel={onCancel}
        onValuesChange={onValuesChange as any}
      />
    );
  },
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  initModel: model => {
    const customProps: IDetailsViewComponentProps = {
      ...model,
    };
    return customProps;
  },
};

export default DetailsViewComponent;
