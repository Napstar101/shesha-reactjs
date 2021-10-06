import React, { FC } from 'react';
import { StoredFilesRendererBase } from '../storedFilesRendererBase';
import { useStoredFilesStore } from '../../providers/storedFiles';
import { ButtonProps } from 'antd';

interface IStoredFilesRendererProps {
  ownerId?: string;
  ownerType?: string;
  isDragger?: boolean;
  uploadBtnProps?: ButtonProps;
  disabled?: boolean;
}

export const StoredFilesRenderer: FC<IStoredFilesRendererProps> = ({
  ownerId,
  ownerType,
  isDragger,
  uploadBtnProps,
  disabled,
}) => {
  const {
    fileList,
    deleteFile,
    uploadFile: uploadFileRequest,
    downloadZipFile,
    downloadFile,
    isInProgress,
    succeeded,
  } = useStoredFilesStore();

  return (
    <StoredFilesRendererBase
      ownerId={ownerId}
      ownerType={ownerType}
      fileList={fileList}
      uploadFile={uploadFileRequest}
      deleteFile={deleteFile}
      downloadZipFile={downloadZipFile}
      downloadFile={downloadFile}
      isDownloadingFileListZip={isInProgress && isInProgress.dowloadZip}
      isDownloadZipSucceeded={succeeded && succeeded.dowloadZip}
      isDragger={isDragger}
      uploadBtnProps={uploadBtnProps}
      disabled={disabled}
    />
  );
};

export default StoredFilesRenderer;
