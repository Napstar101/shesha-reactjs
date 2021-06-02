import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent, IFormComponentContainer } from '../../../../providers/form/models';
import { FolderOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import ComponentsContainer from '../../componentsContainer';
import { v4 as uuid } from 'uuid';
import settingsFormJson from './settingsForm.json';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { useForm } from '../../../../providers';

const { TabPane } = Tabs;

export interface ITabProps {
  id: string;
  key: string;
  title: string;
  components: IConfigurableFormComponent[];
}

export interface ITabsComponentProps extends IConfigurableFormComponent {
  tabs: ITabProps[];
}

const settingsForm = settingsFormJson as FormMarkup;

const TabsComponent: IToolboxComponent<ITabsComponentProps> = {
  type: 'tabs',
  name: 'Tabs',
  icon: <FolderOutlined />,
  factory: model => {
    const { formMode, visibleComponentIds } = useForm();

    const size = 'small';
    const { tabs } = model as ITabsComponentProps;

    const hiddenByCondition = visibleComponentIds && !visibleComponentIds.includes(model.id);
    const isHidden = formMode !== 'designer' && (model.hidden || hiddenByCondition);
    if (isHidden) return null;

    return (
      <Tabs defaultActiveKey="0" size={size} type="card">
        {tabs &&
          tabs.map((t, index) => (
            <TabPane key={index} tab={t.title}>
              <ComponentsContainer containerId={t.id}></ComponentsContainer>
            </TabPane>
          ))}
      </Tabs>
    );
  },
  initModel: model => {
    let tabsModel: ITabsComponentProps = {
      ...model,
      name: 'custom Name',
      tabs: [{ id: uuid(), title: 'Tab 1', key: 'tab1', components: [] }],
    };
    return tabsModel;
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  customContainerNames: ['tabs'],

  getContainers: model => {
    const { tabs } = model as ITabsComponentProps;
    return tabs.map<IFormComponentContainer>(t => ({ id: t.id }));
  },
};

export default TabsComponent;
