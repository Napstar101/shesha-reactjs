import React, { FC } from 'react';
import { Button, message } from 'antd';
import {
  SaveOutlined,
  CloseCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { useShaRouting } from '../../../providers/shaRouting';
import { useModelConfigurator } from '../../../providers';

export interface IProps { }

export const ModelConfiguratorToolbar: FC<IProps> = () => {
  const { load, save } = useModelConfigurator();
  //const { saveForm, setFormMode, setDebugMode, formMode, undo, redo, canUndo, canRedo } = useForm();
  const { router } = useShaRouting();

  const onSaveClick = () => {
    save()
      .then(() => message.success('Model saved successfully'))
      .catch(() => message.error('Failed to save model'));
  };

  const onLoadClick = () => {
    load();
  };

  //   const onUndoClick = () => {
  //     undo();
  //   };

  //   const onRedoClick = () => {
  //     redo();
  //   };

  const onCancelClick = () => {
    router?.back();
  };

  return (
    <div className="sha-designer-toolbar">
      {/* <div className="sha-designer-toolbar-left">
        <Button key="undo" shape="circle" onClick={onUndoClick} disabled={!canUndo} title="Undo">
          <UndoOutlined />
        </Button>
        <Button key="redo" shape="circle" onClick={onRedoClick} disabled={!canRedo} title="Redo">
          <RedoOutlined />
        </Button>
      </div> */}
      <div className="sha-designer-toolbar-right">
        {false && (
          <Button onClick={onCancelClick} type="primary" danger>
            <CloseCircleOutlined /> Cancel
          </Button>
        )}
        <Button key="load" onClick={onLoadClick} type="default">
          <ReloadOutlined /> Load
        </Button>
        <Button key="save" onClick={onSaveClick} type="primary">
          <SaveOutlined /> Save
        </Button>
      </div>
    </div>
  );
};

export default ModelConfiguratorToolbar;
