import React, { FC } from 'react';
import { HistoryOutlined } from '@ant-design/icons';
import { Popover, Skeleton, Button } from 'antd';
import { DateDisplay } from '../';
import { useStoredFileGetFileVersions, StoredFileVersionInfoDto } from '../../apis/storedFile';
import filesize from 'filesize';
import { useAuth, useStoredFile } from '../../providers';

interface IProps {
  readonly fileId: string;
}

export const FileVersionsPopup: FC<IProps> = ({ fileId }) => {
  if (fileId == null) return null;

  const { headers } = useAuth();

  const {
    loading: loading,
    refetch: fetchHistory,
    /*error: fetchError, */ data: serverData,
  } = useStoredFileGetFileVersions({ 
    fileId: fileId, 
    lazy: true, 
    requestOptions: {
      headers,
    },
  });

  const { downloadFile } = useStoredFile();

  const handleVisibleChange = () => {
    if (!serverData) fetchHistory();
  };

  const uploads = serverData?.result;

  const handleVersionDownloadClick = (fileVersion: StoredFileVersionInfoDto) => {
    downloadFile({ fileId: fileId, versionNo: fileVersion.versionNo, fileName: fileVersion.fileName });
  };

  const content = (
    <Skeleton loading={loading}>
      <ul>
        {uploads &&
          uploads.map((item, i) => (
            <li key={i}>
              <strong>Version {i + 1}</strong> Uploaded {item.dateUploaded && <DateDisplay date={item.dateUploaded} />}{' '}
              by {item.uploadedBy}
              <br />
              <Button type="link" onClick={() => handleVersionDownloadClick(item)}>
                {item.fileName} ({filesize(item.size)})
              </Button>
            </li>
          ))}
      </ul>
    </Skeleton>
  );

  return (
    <Popover content={content} title="History" onVisibleChange={handleVisibleChange}>
      <HistoryOutlined />
    </Popover>
  );
};

export default FileVersionsPopup;
