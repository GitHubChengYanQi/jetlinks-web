import React, {useState} from 'react';
import {Button, Col, message, Modal, Row, Spin, Table, Upload} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import cookie from 'js-cookie';
import {config} from 'ice';
import styles from './index.module.less';
import {isArray, isObject} from '@/util/Tools';
import {useRequest} from '@/util/Request';
import Render from '@/components/Render';

const {baseURI} = config;

const BatchImport = (
  {
    success = () => {
    },
    close = () => {
    },
    api,
    visible,
    title,
    templeteApi,
    columns = [],
  }
) => {

  const token = cookie.get('jetlink-token');

  const [file, setFile] = useState();

  const [open, setOpen] = useState([]);

  const errorTable = (dataSource = []) => {
    return <Table
      scroll={{x: 'max-content'}}
      rowKey="key"
      columns={[
        ...columns,
        {title: '异常原因', dataIndex: 'error', align: 'center', render: (text) => <Render text={text}/>},
      ]}
      dataSource={dataSource}
    />;
  };

  const {loading, run} = useRequest(api, {
    manual: true,
    onSuccess: (res) => {
      if (isArray(res).length > 0) {
        setOpen(res);
      }
      message.success('导入成功!');
      success();
    },
    onError: () => {
      message.error('导入失败');
    }
  });

  const uploadProps = {
    maxCount: 1,
    accept: '*',
    action: `${baseURI}/system/upload`,
    headers: {
      'Authorization': cookie.get('jetlink-token'),
    },
    onChange(info) {
      const infoFile = info.file || {};
      const response = infoFile.response || {};
      if (infoFile.status === 'done') {
        if (isObject(response.data).fileId) {
          setFile({...info.fileList[0], fileId: response.data.fileId});
          message.success('文件上传成功!');
        } else {
          message.error(response.message || '上传失败！');
        }
      } else if (infoFile.status === 'error') {
        message.error(response.message || '上传失败！');
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
      okButtonProps={{loading, disabled: !isObject(file).fileId}}
      onOk={() => {
        run({params: {fileId: file.fileId}});
      }}
      onCancel={() => close()}
    >
      <Spin spinning={loading} tip="导入中，请稍等...">
        <Row>
          <Col span={4}>选择模板:</Col>
          <Col span={20}>
            <Upload showUploadList={false} {...uploadProps} className={styles.upload}>
              <div className={styles.content}>
                {
                  file ? file.name : <>
                    <UploadOutlined/>
                    <div>将文件拖到此处，或<Button type="link" style={{padding: 0}}>点击上传</Button></div>
                  </>
                }
              </div>
            </Upload>
          </Col>
        </Row>
        <Row>
          <Col span={4}/>
          <Col span={20} style={{paddingTop: 8}}>
            <a
              href={`${baseURI}${templeteApi}?authorization=${token}`}
              target="_blank"
              rel="noreferrer"
            >
              下载模板
            </a>
          </Col>
        </Row>
      </Spin>
    </Modal>

    <Modal
      style={{maxWidth: '60vw'}}
      width="auto"
      open={open.length > 0}
      title="导入异常数据"
      onCancel={() => setOpen([])}
      footer={[
        <Button key="1" type="primary" onClick={() => setOpen([])}>确认</Button>
      ]}>
      {errorTable(open.map((item, index) => ({...item, key: index})))}
    </Modal>
  </>;
};

export default BatchImport;
