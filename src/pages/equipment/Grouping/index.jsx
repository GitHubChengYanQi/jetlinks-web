import React, {useRef, useState} from 'react';
import {Row, Col, Button, Space, Dropdown, Menu, message,} from 'antd';
import cookie from 'js-cookie';
import {config} from 'ice';
import LeftTree from '@/pages/monitor/LeftTree';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Save from './Save';
import Table from '@/components/Table';
import styles from '@/pages/monitor/index.module.less';
import {
  deviceClassifyDelete,
  DeviceClassifyDownloadTemplate,
  DeviceClassifyExcel,
  deviceClassifyList
} from '@/pages/equipment/Grouping/url';
import BatchImport from '@/components/BatchImport';
import {DangerButton, PrimaryButton} from '@/components/Button';
import store from '@/store';
import {useRequest} from '@/util/Request';

const Grouping = () => {

  const ref = useRef();

  const [saveVisible, setSaveVisible] = useState();
  const [batchImport, setBatchImport] = useState(false);
  const dataDispatchers = store.useModel('dataSource')[1];

  const [keys,setKeys] = useState([]);

  const {loading, run} = useRequest(deviceClassifyDelete, {
    manual: true,
    onSuccess: () => {
      message.success('删除成功！');
      ref.current.submit();
    },
    onError: () => message.error('删除失败！')
  });


  const columns = [
    {title: '所属客户', dataIndex: 'customerName', align: 'center', render: (text) => <Render text={text} />},
    {title: '分组名称', dataIndex: 'name', align: 'center', render: (text) => <Render text={text} />},
    {title: '创建时间', dataIndex: 'createTime', align: 'center', render: (text) => <Render text={text} />},
  ];


  const menu = <Menu
    items={[
      {
        key: '1',
        label: '单独新建',
        onClick: () => {
          setSaveVisible({});
        }
      },
      {
        key: '2',
        label: '批量导入',
        onClick: () => {
          setBatchImport(true);
        }
      },
    ]}
  />;

  const [close, setClose] = useState(false);

  const {baseURI} = config;
  const token = cookie.get('jetlink-token');

  return <>
    <Row gutter={24}>
      <Col span={close ? 1 : 4}>
        <div className={styles.leftTree}>
          <LeftTree
            open={close}
            close={() => setClose(!close)}
            noAction
            showModules={['group']}
            onChange={() => {

            }}
          />
        </div>
      </Col>
      <Col span={close ? 23 : 20}>
        <Table
          onChange={setKeys}
          loading={loading}
          tableKey="grouping"
          ref={ref}
          searchButtons={[
            <Dropdown key={1} overlay={menu} placement="bottom">
              <Button type="primary">新建分组</Button>
            </Dropdown>,
            <Button key={2} type="primary" onClick={()=>{
              window.open(`${baseURI}/DeviceClassifyExcel/export?authorization=${token}&classifyIds=${keys}`);
            }}>导出</Button>
          ]}
          api={deviceClassifyList}
          columns={columns}
          rowKey="classifyId"
          actionRender={(text, record) => (
            <Space>
              <PrimaryButton onClick={() => setSaveVisible(record)}>编辑</PrimaryButton>
              <Warning onOk={() => run({data: {classifyId: record.classifyId}})}>
                <DangerButton>删除</DangerButton>
              </Warning>
            </Space>
          )}
        />
      </Col>
    </Row>

    <Save
      success={() => {
        dataDispatchers.getDeviceClass();
        setSaveVisible(null);
        ref.current.submit();
      }}
      visible={Boolean(saveVisible)}
      close={() => setSaveVisible(null)}
      data={saveVisible || {}}
    />

    <BatchImport
      columns={[
        {title: '分组名称', dataIndex: 'name', align: 'center', render: (text) => <Render text={text} />},
        {title: '状态', dataIndex: 'status', align: 'center', render: (text) => <Render text={text} />},
      ]}
      title="分组"
      templeteApi={DeviceClassifyDownloadTemplate}
      api={DeviceClassifyExcel}
      success={() => {
        setBatchImport(false);
        ref.current.submit();
        dataDispatchers.getDeviceClass();
      }}
      visible={batchImport}
      close={() => setBatchImport(false)}
    />
  </>;
};

export default Grouping;
