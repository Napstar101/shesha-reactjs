import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { FormOutlined } from '@ant-design/icons';
import settingsFormJson from './settingsForm.json';
import { NotesRenderer } from '../../../../';
import { useForm } from '../../../../providers/form';
import { evaluateValue, validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import React from 'react';
import NotesProvider from '../../../../providers/notes';

export interface INotesProps extends IConfigurableFormComponent {
  ownerId: string;
  ownerType: string;
}

const settingsForm = settingsFormJson as FormMarkup;

const NotesComponent: IToolboxComponent<INotesProps> = {
  type: 'notes',
  name: 'Notes',
  icon: <FormOutlined />,
  factory: (model: INotesProps) => {
    const { formMode, visibleComponentIds } = useForm();

    const { formData } = useForm();
    const ownerId = evaluateValue(model.ownerId, { data: formData });

    const hiddenByCondition = visibleComponentIds && !visibleComponentIds.includes(model.id);
    const isHidden = formMode !== 'designer' && (model.hidden || hiddenByCondition);
    if (isHidden) return null;

    const isReadOnly = model?.readOnly || formMode === 'readonly';

    return (
      <NotesProvider ownerId={ownerId} ownerType={model.ownerType}>
        <NotesRenderer showCommentBox={model.disabled !== true && !isReadOnly} />
      </NotesProvider>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  initModel: model => {
    const customModel: INotesProps = {
      ...model,
      ownerId: '{data.id}',
      ownerType: '',
    };
    return customModel;
  },
};

export default NotesComponent;
