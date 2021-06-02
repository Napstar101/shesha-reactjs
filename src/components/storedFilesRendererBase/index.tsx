import React, { FC, useEffect } from 'react';
import Dragger, { DraggerProps } from 'antd/lib/upload/Dragger';
import { InboxOutlined, FileZipOutlined, UploadOutlined } from '@ant-design/icons';
import { message, Button, notification, Alert, Upload } from 'antd';
import { UploadChangeParam, RcFile } from 'antd/lib/upload/interface';
import { IUploadFilePayload, IStoredFile, IDownloadFilePayload } from '../../providers/storedFiles/contexts';

interface IUploaderFileTypes {
  name: string;
  type: string;
}

export interface IStoredFilesRendererProps {
  fileList?: IStoredFile[];
  allowUpload?: boolean;
  showDragger?: boolean;
  ownerId?: string;
  ownerType?: string;
  multiple?: boolean;
  isDownloadingFileListZip?: boolean;
  isDownloadZipSucceeded?: boolean;
  fetchFilesError?: boolean;
  downloadZipFileError?: boolean;
  deleteFile: (fileIdToDelete: string) => void;
  uploadFile: (payload: IUploadFilePayload) => void;
  downloadZipFile?: () => void;
  downloadFile: (payload: IDownloadFilePayload) => void;
  validFileTypes?: IUploaderFileTypes[];
  isDragger?: boolean;
  maxFileLength?: number;
}

export const StoredFilesRendererBase: FC<IStoredFilesRendererProps> = ({
  multiple = true,
  fileList = [],
  isDownloadingFileListZip,
  isDownloadZipSucceeded,
  deleteFile,
  uploadFile,
  downloadZipFile,
  downloadFile,
  ownerId,
  ownerType,
  fetchFilesError,
  downloadZipFileError,
  validFileTypes = [],
  maxFileLength = 0,
  isDragger = true,
}) => {
  const hasFiles = !!fileList.length;

  useEffect(() => {
    if (isDownloadZipSucceeded) {
      openFilesZipNotification();
    }
  }, [isDownloadZipSucceeded]);

  const props: DraggerProps = {
    name: 'file',
    multiple,
    fileList,
    onChange(info: UploadChangeParam) {
      const { status } = info.file;

      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove(file) {
      deleteFile(file.uid);
    },
    customRequest(options: any) {
      // It used to be RcCustomRequestOptions, but it doesn't seem to be found anymore
      uploadFile({ file: options.file, ownerId, ownerType });
    },
    beforeUpload(file: RcFile) {
      const { type, size } = file;

      const isValidFileType =
        validFileTypes.length === 0 ? true : validFileTypes.map(({ type }) => type).includes(type);

      if (!isValidFileType) {
        const validTypes = validFileTypes.map(({ name }) => name).join(',');

        message.error(`You can only upload files of type: (${validTypes})`);
      }

      const isAcceptableFileSize = maxFileLength === 0 ? true : size / 1024 / 1024 <= maxFileLength;

      if (!isAcceptableFileSize) {
        message.error(`Image must smaller than ${maxFileLength}MB!`);
      }

      return isValidFileType && isAcceptableFileSize;
    },
    onDownload: ({ uid, name }) => {
      downloadFile({ fileId: uid, fileName: name });
    },
    onPreview: ({ uid, name }) => {
      downloadFile({ fileId: uid, fileName: name });
    }
  };

  console.log({isDragger, props});

  const openFilesZipNotification = () =>
    notification.success({
      message: `Download success!`,
      description: 'Your files have been downloaded successfully. Please check your download folder.',
      placement: 'topRight',
    });

  return (
    <div className="sha-stored-files-renderer">
      {isDragger ? (
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>

          {!hasFiles && <p className="stored-files-renderer-no-files">You currently do not have files</p>}

          <p className="ant-upload-text">Click or drag file to this area to upload</p>
        </Dragger>
      ) : (
        <Upload {...props}>
          <Button>
            <UploadOutlined /> Upload
          </Button>

          {!hasFiles && (
            <Alert className="stored-files-renderer-no-files" message="You currently do not have files" type="info" />
          )}
        </Upload>
      )}

      {fetchFilesError && (
        <Alert message="Error" description="Sorry, an error occurred while trying to fetch file list." type="error" />
      )}

      {downloadZipFileError && (
        <Alert message="Error" description="Sorry, an error occurred while trying to download zip file." type="error" />
      )}

      {hasFiles && !!downloadZipFile && (
        <div className="stored-files-renderer-btn-container">
          <Button size="small" type="link" icon onClick={() => downloadZipFile()} loading={isDownloadingFileListZip}>
            {!isDownloadingFileListZip && <FileZipOutlined />} Download Zip
          </Button>
        </div>
      )}
    </div>
  );
};

export default StoredFilesRendererBase;
