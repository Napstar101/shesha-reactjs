import React, { FC, useState } from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import FormDesigner from './formDesigner';
import { /*MetadataProvider,*/ FormProvider, ShaApplicationProvider, useSheshaApplication, MetadataDispatcherProvider } from '../../providers';
import AuthContainer from '../authedContainer';
import { Button } from 'antd';
import { formGetByPath, formUpdateMarkup, formTestDelayGet, formTestDelayPost } from '../../apis/form';

export default {
  title: 'Components/Temp/FormDesigner',
  component: FormDesigner,
} as Meta;

const addStory = <TArgs,>(template: Story<TArgs>, args: TArgs) => {
  const story = template.bind({});
  story.args = args;
  return story;
}

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
        {/* <MetadataProvider> */}
        <FormProvider
          path={args.formPath}
          id={args.formId}
          mode="designer"
        >
          <FormDesigner />
        </FormProvider>
        {/* </MetadataProvider> */}
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
  formId: '70D82B7E-73AD-4EB1-A445-F569CEC771E0'
})

export const IndexPage = addStory(DesignerTemplate, {
  formPath: '/indexTable',
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
}

const ActionsTemplateContent: FC<IActionsTemplateProps> = (props) => {
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
  }

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
  }

  const onPostClick = () => {
    formTestDelayPost({ queryParams: { delayMs: 200 }, base: backendUrl, headers: httpHeaders })
      .then(response => {
        console.log({ msg: 'post success', response: response });
      })
      .catch(error => {
        console.log({ msg: 'post failed', error: error });
      });
  }

  const onGetClick = () => {
    formTestDelayGet({ delayMs: 500 }, { base: backendUrl, headers: httpHeaders })
      .then(response => {
        console.log({ msg: 'get success', response: response });
      })
      .catch(err => {
        console.log({ msg: 'get failed', error: err });
      });
  }

  return (
    <div>
      <Button onClick={onLoadClick}>Load form by path</Button>
      <Button onClick={onSaveClick}>Save form</Button>

      <Button onClick={onPostClick}>Test Post</Button>
      <Button onClick={onGetClick}>Test Get</Button>
    </div>
  );
}

export const RefactoringActions = ActionsTemplate.bind({});
const refactoringArgs: IActionsTemplateProps = {
  formPath: '/indexTable'
};
RefactoringActions.args = refactoringArgs;

//#endregion

export const SectionsUsage = addStory(DesignerTemplate, {
  formPath: '/settings/forms/playground'
});

export const QueryBuilderSettings = addStory(DesignerTemplate, {
  formId: '7490f400-1d50-47f7-ab84-97625e67ea29'
});

export const TableViewSettings = addStory(DesignerTemplate, {
  formId: '6f0f3e5c-c173-46c2-bb52-5b8d584068c5'
});

export const IndexPageWithTableConfig = addStory(DesignerTemplate, {
  formPath: '/index-page-with-config'
});

export const TableContext = addStory(DesignerTemplate, {
  formPath: 'D:\\Boxfusion\\Shesha3\\opensource\\metadata\\shesha-reactjs_etalon\\src\\components\\formDesigner\\components\\dataTable\\tableContext\\settingsForm.json'
});
export const AutocompleteProps = addStory(DesignerTemplate, {
  formPath: 'D:\\Boxfusion\\Shesha3\\opensource\\metadata\\shesha-reactjs_etalon\\src\\components\\formDesigner\\components\\autocomplete\\settingsForm.json'
});