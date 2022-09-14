import React from 'react';
import {config} from 'ice';
import cookie from 'js-cookie';
import {Button} from 'antd';

export const filePreview = '/system/filePreview';
export const preview = '/rest/system/preview';
export const upload = '/rest/system/upload';

const {baseURI} = config;

const DownloadFile = (
  {
    fileId,
  }
) => {

  const token = cookie.get('jetlink-token');

  if (!fileId) {
    return <Button style={{padding: 0}} type="link" disabled>查看</Button>;
  }

  return <>
    <a
      href={`${baseURI}${upload}?fileId=${fileId}&authorization=${token}`}
      target="_blank"
      rel="noreferrer"
    >
      查看
    </a>
  </>;
};

export default DownloadFile;
