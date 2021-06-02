import React from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { BorderOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ButtonType } from 'antd/lib/button';
import FormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import { useForm } from '../../../../providers/form';
import { useClosestModal } from '../../../../providers/dynamicModal';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { useShaRouting } from '../../../../providers';

type ButtonActionType = 'submit' | 'reset' | 'close' | 'custom';

export interface IButtonProps extends IConfigurableFormComponent {
  actionType: ButtonActionType;
  customAction?: string;

  buttonType?: ButtonType;
  danger?: boolean;
}

const settingsForm = settingsFormJson as FormMarkup;

const TextField: IToolboxComponent<IButtonProps> = {
  type: 'button',
  name: 'Button',
  icon: <BorderOutlined />,
  factory: (model: IConfigurableFormComponent) => {
    const { form, getAction } = useForm();
    const { router } = useShaRouting();
    const closestModal = useClosestModal();

    const customProps = model as IButtonProps;
    const fieldModel = {
      ...model,
      label: null,
      tooltip: null,
    };

    const onClick = () => {
      switch (customProps.actionType) {
        case 'submit':
          if (!Boolean(form)) {
            console.warn('Form not found');
            return;
          }
          form.submit();
          break;
        case 'reset':
          if (!Boolean(form)) {
            console.warn('Form not found');
            return;
          }
          form.resetFields();
          break;

        case 'close': // close modal or page
          if (closestModal) closestModal.close();
          else router.back();
          break;

        case 'custom':
          const action = customProps.customAction ? getAction(model.id, customProps.customAction) : null;

          if (action) {
            action();
          }
          break;

        default:
          break;
      }
    };

    return (
      <FormItem model={fieldModel}>
        <Button onClick={onClick} type={customProps.buttonType} danger={customProps.danger}>
          {customProps.label}
        </Button>
      </FormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  initModel: model => {
    const buttonModel: IButtonProps = {
      ...model,
      label: 'Submit',
      actionType: 'submit',
      buttonType: 'default',
    };
    return buttonModel;
  },
};

export default TextField;
