import React, {useRef, useState} from 'react';
import {useHistory} from 'ice';
import {Button, Modal, Space} from 'antd';
import {deviceModelList} from '@/pages/equipment/Model/url';
import {PrimaryButton} from '@/components/Button';
import Table from '@/components/Table';
import Render from '@/components/Render';
import Save from '@/pages/alarm/AlarmProject/Save';
import AlarmTime from '@/pages/alarm/AlarmProject/components/AlarmTime';
import Drawer from '@/components/Drawer';
import ContactList from '@/pages/alarm/AlarmProject/components/ContactList';

const AlarmProject = () => {

  const ref = useRef();

  const drawerRef = useRef();

  const history = useHistory();

  const [keys, setKeys] = useState([]);

  const [openTime, set0penTime] = useState(false);

  const [saveVisible, setSaveVisible] = useState();

  const columns = [
    {title: '报警名称', dataIndex: 'name', align: 'center', render: (text) => <Render text={text}/>},
    {
      title: '报警通知预案',
      dataIndex: 'categoryResult',
      align: 'center',
      render: (categoryResult = {}) => <Render text={categoryResult.name}/>
    },
    {title: '报警时间间隔', dataIndex: 'deviceNum', align: 'center', render: (text = '0') => <Render>{text || 0}</Render>},
    {
      title: '报警联系人组',
      dataIndex: 'deviceNum',
      align: 'center',
      render: (text = '0') => <Button type="link" onClick={() => drawerRef.current.open(true)}>{text || 0}</Button>
    },
    {title: '报警状态', dataIndex: 'deviceNum', align: 'center', render: (text = '0') => <Render>{text || 0}</Render>},
  ];

  return <>
    <h1 className="primaryColor">报警项设置</h1>
    <h3>设备类型：智能箱产品</h3>
    <h3>设备型号：opt</h3>
    <div style={{textAlign: 'right', padding: '0 24px 12px'}}>
      <Space>
        <Button type="primary" onClick={() => set0penTime(true)}>批量设置报警时间间隔</Button>
        <Button type="primary">批量启用</Button>
        <Button type="primary">批量停用</Button>
      </Space>
    </div>
    <Table
      onChange={setKeys}
      selectedRowKeys={keys}
      ref={ref}
      api={deviceModelList}
      tableKey="model"
      columns={columns}
      rowKey="modelId"
      actionRender={(value, record) => (
        <Space>
          <PrimaryButton onClick={() => setSaveVisible(record)}>
            编辑
          </PrimaryButton>
        </Space>
      )}
    />

    <Save data={saveVisible} visible={saveVisible} success={(success) => {
      setSaveVisible();
      if (success) {
        ref.current.submit();
      } else {
        ref.current.refresh();
      }
    }} close={() => setSaveVisible()}/>

    <Modal
      title="设置报警时间间隔"
      open={openTime}
      width={500}
      onOk={() => {
      }}
      onCancel={() => set0penTime(false)}
    >
      <div style={{textAlign: 'center'}}>
        <AlarmTime width={400}/>
      </div>
    </Modal>

    <Drawer
      width='auto'
      headTitle="报警名称:12312312"
      ref={drawerRef}
    >
      <ContactList/>
    </Drawer>
  </>;
};

export default AlarmProject;
