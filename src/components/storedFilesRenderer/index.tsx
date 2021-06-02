import React, { FC } from 'react';
import { StoredFilesRendererBase } from '../storedFilesRendererBase';
import { useStoredFilesStore } from '../../providers/storedFiles';

interface IStoredFilesRendererProps {
  ownerId?: string;
  ownerType?: string;
}

export const StoredFilesRenderer: FC<IStoredFilesRendererProps> = ({ ownerId, ownerType }) => {
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
    />
  );
};

export default StoredFilesRenderer;
