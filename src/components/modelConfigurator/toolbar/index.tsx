import React, { FC } from 'react';
import { Button } from 'antd';
import {
  SaveOutlined,
  CloseCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { useShaRouting } from '../../../providers/shaRouting';
import { useModelConfigurator } from '../../../providers';

export interface IProps { }

export const ModelConfiguratorToolbar: FC<IProps> = () => {
  const { load, submit } = useModelConfigurator();
  const { router } = useShaRouting();

  const onSaveClick = () => {
    submit();      
  };

  const onLoadClick = () => {
    load();
  };

  const onCancelClick = () => {
    router?.back();
  };

  return (
    <div className="sha-designer-toolbar">
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
