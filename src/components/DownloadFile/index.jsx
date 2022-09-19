import React, {useState} from 'react';
import {config} from 'ice';
import cookie from 'js-cookie';
import {Button, Image, Modal, Space} from 'antd';
import {queryString} from '@/util/Tools';

export const filePreview = '/system/filePreview';
export const preview = '/rest/system/preview';
export const upload = '/rest/system/upload';

const {baseURI} = config;

const imgTypes = ['bmp', 'jpg', 'jpeg', 'png', 'tif', 'gif', 'pcx', 'tga', 'exif', 'fpx', 'svg', 'psd', 'cdr', 'pcd', 'dxf', 'ufo', 'eps', 'ai', 'raw', 'WMF', 'webp', 'avif', 'apng'];

const DownloadFile = (
  {
    fileId,
    fileName = '',
  }
) => {

  const token = cookie.get('jetlink-token');

  const [visible, setVisible] = useState(false);

  let isImg = false;

  try {
    isImg = imgTypes.find(item => queryString(item, fileName.split('.')[fileName.split('.').length - 1]));
  }catch (e) {
    console.error(e);
  }

  return <>
    <Space>
      <div
        // style={{maxWidth: 200, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', margin: 'auto'}}
      >
        {fileName}
      </div>
      <div hidden={!fileId || !fileName}>
        {
          isImg ?
            <Button style={{padding: 0}} type="link" onClick={() => setVisible(true)}>查看</Button>
            :
            <a
              href={`${baseURI}${upload}?fileId=${fileId}&authorization=${token}`}
              target="_blank"
              rel="noreferrer"
            >
              下载
            </a>
        }
      </div>
    </Space>

    <Modal open={visible} footer={null} onCancel={() => setVisible(false)}>
      <div style={{padding: 24, textAlign: 'center'}}>
        <Image src={`${baseURI}${preview}?fileId=${fileId}&authorization=${token}`} />
      </div>
    </Modal>
  </>;
};

export default DownloadFile;
