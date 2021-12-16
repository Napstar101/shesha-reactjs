import React, { FC, useState } from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import FormDesigner from './formDesigner';
import {
  /*MetadataProvider,*/ FormProvider,
  ShaApplicationProvider,
  useSheshaApplication,
  MetadataDispatcherProvider,
} from '../../providers';
import AuthContainer from '../authedContainer';
import { Button, Select } from 'antd';
import { formGetByPath, formUpdateMarkup, formTestDelayGet, formTestDelayPost } from '../../apis/form';
import allFormsJson from './allForms.json';
import { LabeledValue } from 'antd/lib/select';
import { addStory } from '../../stories/utils';

export default {
  title: 'Components/Temp/FormDesigner',
  component: FormDesigner,
} as Meta;

export interface IFormDesignerStoryProps {
  formPath?: string;
  formId?: string;
}

const backendUrl = process.env.STORYBOOK_BASE_URL; // TODO: Make this configurable

// Create a master template for mapping args to render the Button component
const DesignerTemplate: Story<IFormDesignerStoryProps> = args => (
  <ShaApplicationProvider backendUrl={backendUrl}>
    <AuthContainer layout={true}>
      <MetadataDispatcherProvider>
        <FormProvider path={args.formPath} id={args.formId} mode="designer">
          <FormDesigner />
        </FormProvider>
      </MetadataDispatcherProvider>
    </AuthContainer>
  </ShaApplicationProvider>
);

export const TableContextProps = DesignerTemplate.bind({});

TableContextProps.args = {
  formPath: '/settings/forms/playground',
};

export const ColumnProps = addStory(DesignerTemplate, {
  //formPath: 'D:\\Boxfusion\\Shesha3\\opensource\\shesha-reactjs\\src\\components\\formDesigner\\components\\dataTable\\table\\columnsEditor\\columnSettings.json'
  formId: '70D82B7E-73AD-4EB1-A445-F569CEC771E0',
});

//#region for refactoring only

export interface IActionsTemplateProps {
  formPath: string;
}
const ActionsTemplate: Story<IActionsTemplateProps> = props => {
  return (
    <ShaApplicationProvider backendUrl={backendUrl}>
      <AuthContainer layout={true}>
        <ActionsTemplateContent {...props}></ActionsTemplateContent>
      </AuthContainer>
    </ShaApplicationProvider>
  );
};

const ActionsTemplateContent: FC<IActionsTemplateProps> = props => {
  const { backendUrl, httpHeaders } = useSheshaApplication();

  const [form, setForm] = useState(null);

  const onLoadClick = () => {
    formGetByPath({ path: props.formPath }, { base: backendUrl, headers: httpHeaders })
      .then(response => {
        console.log({ msg: 'loaded', response: response });
        setForm(response.result);
      })
      .catch(error => {
        console.log({ msg: 'failed to load', error: error });
      });
  };

  const onSaveClick = () => {
    if (!Boolean(form)) {
      console.log('Form not loaded!');
      return;
    }

    formUpdateMarkup(form, { id: form.id, base: backendUrl, headers: httpHeaders })
      .then(response => {
        console.log({ msg: 'form saved', response: response });
      })
      .catch(err => {
        console.log({ msg: 'form save failed', error: err });
      });
  };

  const onPostClick = () => {
    formTestDelayPost({ queryParams: { delayMs: 200 }, base: backendUrl, headers: httpHeaders })
      .then(response => {
        console.log({ msg: 'post success', response: response });
      })
      .catch(error => {
        console.log({ msg: 'post failed', error: error });
      });
  };

  const onGetClick = () => {
    formTestDelayGet({ delayMs: 500 }, { base: backendUrl, headers: httpHeaders })
      .then(response => {
        console.log({ msg: 'get success', response: response });
      })
      .catch(err => {
        console.log({ msg: 'get failed', error: err });
      });
  };

  return (
    <div>
      <Button onClick={onLoadClick}>Load form by path</Button>
      <Button onClick={onSaveClick}>Save form</Button>

      <Button onClick={onPostClick}>Test Post</Button>
      <Button onClick={onGetClick}>Test Get</Button>
    </div>
  );
};

export const RefactoringActions = ActionsTemplate.bind({});
const refactoringArgs: IActionsTemplateProps = {
  formPath: '/indexTable',
};
RefactoringActions.args = refactoringArgs;

//#endregion

export const SectionsUsage = addStory(DesignerTemplate, {
  formPath: '/settings/forms/playground',
});

export const QueryBuilderSettings = addStory(DesignerTemplate, {
  formId: '7490f400-1d50-47f7-ab84-97625e67ea29',
});

export const TableViewSettings = addStory(DesignerTemplate, {
  formId: '6f0f3e5c-c173-46c2-bb52-5b8d584068c5',
});

export const IndexPageWithEntityType = addStory(DesignerTemplate, {
  formPath: '/indexTable',
});

export const IndexPageWithTableConfig = addStory(DesignerTemplate, {
  formPath: '/index-page-with-config',
});

export const TableContext = addStory(DesignerTemplate, {
  formPath:
    'D:\\Boxfusion\\Shesha3\\opensource\\metadata\\shesha-reactjs_etalon\\src\\components\\formDesigner\\components\\dataTable\\tableContext\\settingsForm.json',
});
export const AutocompleteProps = addStory(DesignerTemplate, {
  formPath:
    'D:\\Boxfusion\\Shesha3\\opensource\\metadata\\shesha-reactjs_etalon\\src\\components\\formDesigner\\components\\autocomplete\\settingsForm.json',
});
export const CodeEditorProps = addStory(DesignerTemplate, {
  formPath:
    'D:\\Boxfusion\\Shesha3\\opensource\\metadata\\shesha-reactjs_etalon\\src\\components\\formDesigner\\components\\codeEditor\\settingsForm.json',
});

export const FormSettings = addStory(DesignerTemplate, {
  formPath: 'D:\\Boxfusion\\Shesha3\\opensource\\metadata\\shesha-reactjs_etalon\\src\\components\\formDesigner\\formSettings.json',
});

export const SimplePropsProps = addStory(DesignerTemplate, {
  formPath: '/persons/edit',
});

export const ModelItemProps = addStory(DesignerTemplate, {
  formPath: 'D:\\Boxfusion\\Shesha3\\opensource\\metadata\\shesha-reactjs\\src\\components\\modelConfigurator\\itemSettings.json',
});

export const ModelGroupProps = addStory(DesignerTemplate, {
  formPath: 'D:\\Boxfusion\\Shesha3\\opensource\\metadata\\shesha-reactjs\\src\\components\\modelConfigurator\\groupSettings.json',
});

interface FormInfo {
  name: string;
  path: string;
  id: string;
}
export const FormsEditor: FC = () => {
  const [currentForm, setCurrentForm] = useState(null);
  const forms = allFormsJson as FormInfo[];
  const options = forms.map<LabeledValue>(f => ({
    value: f.id,
    label: f.name,
  }));
  return (
    <div>
      <div>
        <Select<LabeledValue>
          showSearch
          optionFilterProp="label"
          style={{ width: '100%' }}
          options={options}
          labelInValue={true}
          onChange={value => setCurrentForm(value.value)}
        ></Select>
      </div>
      <div>
        Designer {currentForm}
        {currentForm && (
          <MetadataDispatcherProvider>
            <FormProvider id={currentForm} mode="designer">
              <FormDesigner />
            </FormProvider>
          </MetadataDispatcherProvider>
        )}
      </div>
    </div>
  );
};

const BrowserTemplate: Story = () => (
  <ShaApplicationProvider backendUrl={backendUrl}>
    <AuthContainer layout={true}>
      <FormsEditor></FormsEditor>
    </AuthContainer>
  </ShaApplicationProvider>
);

export const Browser = addStory(BrowserTemplate, null);
