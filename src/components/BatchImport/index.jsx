import React, {useState} from 'react';
import {Button, Col, message, Modal, Row, Upload} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import cookie from 'js-cookie';
import {config} from 'ice';
import styles from './index.module.less';

const {baseURI} = config;

const BatchImport = (
  {
    success = () => {
    },
    close = () => {
    },
    visible,
    title,
  }
) => {

  const [file, setFile] = useState();

  const uploadProps = {
    maxCount: 1,
    accept: '*',
    action: `${baseURI}system/upload`,
    headers: {
      'Authorization': cookie.get('jetlink-token'),
    },
    onChange(info) {
      if (info.file.status === 'done') {
        setFile(info.fileList[0]);
        message.success('文件上传成功');
      } else if (info.file.status === 'error') {
        message.error(info.file.response.message);
      }
    },
  };


  return <>
    <Modal
      afterClose={() => {
        setFile();
      }}
      destroyOnClose
      width={500}
      title={`批量导入${title}`}
      open={visible}
      okText="导入"
      cancelText="取消"
      onOk={() => {

      }}
      onCancel={() => close()}
    >
      <Row>
        <Col span={4}>选择模板:</Col>
        <Col span={20}>
          <Upload showUploadList={false} {...uploadProps} className={styles.upload}>
            <div className={styles.content}>
              {
                file ? file.name : <>
                  <UploadOutlined />
                  <div>将文件拖到此处，或<Button type="link" style={{padding: 0}}>点击上传</Button></div>
                </>
              }
            </div>
          </Upload>
        </Col>
      </Row>
      <Row>
        <Col span={4} />
        <Col span={20}>
          <Button type="link" style={{padding: 0}}>下载模板</Button>
        </Col>
      </Row>
    </Modal>
  </>;
};

export default BatchImport;
