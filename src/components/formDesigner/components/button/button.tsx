import React from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { BorderOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ButtonType } from 'antd/lib/button';
import ConfigurableFormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import { useForm } from '../../../../providers/form';
import { useClosestModal } from '../../../../providers/dynamicModal';
import { evaluateValue, validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { useShaRouting } from '../../../../providers';
import ShaIcon, { IconType } from '../../../shaIcon';

type ButtonActionType = 'submit' | 'reset' | 'close' | 'custom';

export type IActionParameters = [{ key: string; value: string }];

export interface IButtonProps extends IConfigurableFormComponent {
  actionType: ButtonActionType;
  customAction?: string;
  customActionParameters?: IActionParameters;
  icon?: string;

  buttonType?: ButtonType;
  danger?: boolean;
}

const settingsForm = settingsFormJson as FormMarkup;

const TextField: IToolboxComponent<IButtonProps> = {
  type: 'button',
  name: 'Button',
  icon: <BorderOutlined />,
  factory: (model: IButtonProps) => {
    const { form, getAction, formData } = useForm();
    const { router } = useShaRouting();
    const closestModal = useClosestModal();

    const fieldModel = {
      ...model,
      label: null,
      tooltip: null,
    };

    const onClick = () => {
      switch (model.actionType) {
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
          else router?.back();
          break;

        case 'custom':
          const action = model.customAction ? getAction(model.id, model.customAction) : null;

          if (action) {
            const actionArgs = {};
            
            for (let parameterIdx in model.customActionParameters) {
              const parameter = model.customActionParameters[parameterIdx];
              const value = evaluateValue(parameter.value, { data: formData });
              actionArgs[parameter.key] = value;
            }

            action(formData, actionArgs);
          }
          break;

        default:
          break;
      }
    };

    return (
      <ConfigurableFormItem model={fieldModel}>
        <Button
          onClick={onClick}
          type={model.buttonType}
          danger={model.danger}
          icon={model.icon ? <ShaIcon iconName={model.icon as IconType} /> : undefined}
        >
          {model.label}
        </Button>
      </ConfigurableFormItem>
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
