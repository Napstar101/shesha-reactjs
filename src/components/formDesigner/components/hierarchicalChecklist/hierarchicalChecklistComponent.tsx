import { ApartmentOutlined } from '@ant-design/icons';
import { Skeleton } from 'antd';
import React, { MutableRefObject } from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { useForm } from '../../../../providers';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { evaluateValue, validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { IHierarchicalCheckListProps } from '../../../hierarchicalCheckList';
import { CheckListSelectionType, ISaveSelectionsInput } from '../../../hierarchicalCheckList/interface';
import ConfigurableFormItem, { IConfigurableFormItemProps } from '../formItem';
import HierarchicalCheckListWrapper from './hierarchicalChecklistWrapper';
import settingsFormJson from './settingsForm.json';

const isUuid = (value: string) =>
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(value);

export interface IHierarchicalChecklistProps extends IHierarchicalCheckListProps, IConfigurableFormComponent {
  readonly checklistId: string;
  readonly customHint?: string;
}

export const isChecklistChecked = ({ selection: s }: ISaveSelectionsInput) =>
  !!s.filter(({ selection }) => selection === CheckListSelectionType.Yes)?.length;

export const isChecklistPopulated = ({ selection: s }: ISaveSelectionsInput) => !!s?.length;

const settingsForm = settingsFormJson as FormMarkup;

const HierarchicalChecklistComponent: IToolboxComponent<IHierarchicalChecklistProps> = {
  type: 'checklist',
  name: 'Hierarchical Checklist',
  icon: <ApartmentOutlined />,
  factory: (model: IConfigurableFormComponent, _componentRef: MutableRefObject<any>) => {
    const { formMode, visibleComponentIds } = useForm();
    const customProps = model as IHierarchicalChecklistProps;

    const { formData } = useForm();

    const ownerType = evaluateValue(formData?.ownerType || customProps?.ownerType, { data: formData });
    const ownerId = evaluateValue(formData?.ownerId || customProps?.ownerId, { data: formData });
    const checklistId = evaluateValue(formData?.checklistId || customProps?.checklistId, { data: formData });

    const renderChecklist = () => {
      if (!isUuid(checklistId)) {
        return customProps?.dropdown ? (
          <Skeleton.Input style={{ width: 250 }} active={false} size="default" />
        ) : (
          <Skeleton />
        );
      }

      return (
        <HierarchicalCheckListWrapper
          id={checklistId}
          ownerType={ownerType}
          ownerId={ownerId}
          readOnly={customProps?.disabled}
          dropdown={customProps?.dropdown}
          saveLocally={customProps?.saveLocally}
          hint={customProps?.customHint}
        />
      );
    };

    const hiddenByCondition = visibleComponentIds && !visibleComponentIds.includes(model.id);
    const isHidden = formMode !== 'designer' && (model.hidden || hiddenByCondition);
    if (isHidden) return null;

    const wrapperColProps: Omit<IConfigurableFormItemProps, 'model'> = customProps?.dropdown ? {} : { wrapperCol: { span: 24 } };

    return (
      <ConfigurableFormItem {...wrapperColProps } model={customProps?.dropdown ? model : { ...model, hideLabel: true }}>{renderChecklist()}</ConfigurableFormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  initModel: model => {
    const checklistModel = model as IHierarchicalChecklistProps;

    const customModel: IHierarchicalChecklistProps = {
      ...checklistModel,
      ownerId: '{data.ownerId}',
      checklistId: '{data.checklist.id}',
      ownerType: '',
    };
    return customModel;
  },
};

export default HierarchicalChecklistComponent;
