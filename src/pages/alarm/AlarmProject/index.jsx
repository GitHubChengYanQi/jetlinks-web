import React, {useEffect, useRef, useState} from 'react';
import {getSearchParams, useHistory} from 'ice';
import {Button, Modal, Space, Table} from 'antd';
import {PrimaryButton} from '@/components/Button';
import Render from '@/components/Render';
import Save from '@/pages/alarm/AlarmProject/Save';
import AlarmTime from '@/pages/alarm/AlarmProject/components/AlarmTime';
import Drawer from '@/components/Drawer';
import ContactList from '@/pages/alarm/AlarmProject/components/ContactList';
import style from '@/components/Table/index.module.less';
import {useRequest} from '@/util/Request';
import {getColumnByModelId} from '@/pages/monitor/url';
import {isArray} from '@/util/Tools';

const AlarmProject = (
  {
    custom,
    global
  }
) => {

  const ref = useRef();

  const drawerRef = useRef();

  const history = useHistory();

  const searchParams = getSearchParams();

  const [rows, setRows] = useState([]);

  const [openTime, set0penTime] = useState(false);

  const [saveVisible, setSaveVisible] = useState();

  const [dataSource,setDatSource] = useState([]);

  const {loading: getRulesLoaing, run: getRules} = useRequest(getColumnByModelId, {
    manual: true,
    onSuccess: (res) => {
      setDatSource(res);
    },
  });

  useEffect(() => {
    if (searchParams.modelId) {
      getRules({data: {modelId: searchParams.modelId}});
    }
  }, []);

  const columns = [
    {title: '序号', dataIndex: 'name', align: 'center', render: (text, record, index) => <Render>{index + 1}</Render>},
    {title: '报警名称', dataIndex: 'title', align: 'center', render: (text) => <Render text={text}/>},
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
    {
      title: '操作', dataIndex: 'deviceNum', align: 'center', render: (value, record) => (
        <Space>
          <PrimaryButton onClick={() => setSaveVisible(record)}>
            编辑
          </PrimaryButton>
        </Space>
      )
    },
  ];

  return <>
    <div hidden={custom || global}>
      <h1 className="primaryColor">报警项设置</h1>
      <h3>设备类型：{searchParams.categoryName}</h3>
      <h3>设备型号：{searchParams.modelName}</h3>
    </div>

    <div hidden={global} style={{textAlign: 'right', padding: '0 24px 12px'}}>
      <Space>
        <Button type="primary" onClick={() => set0penTime(true)}>批量设置报警时间间隔</Button>
        <Button type="primary">批量启用</Button>
        <Button type="primary">批量停用</Button>
      </Space>
    </div>
    <Table
      loading={getRulesLoaing}
      bordered
      onHeaderRow={() => {
        return {
          className: style.headerRow
        };
      }}
      rowSelection={global ? undefined : {
        selectedRowKeys: rows.map(item => item.key),
        onChange: (row, selectedRows) => {
          setRows(selectedRows);
        }
      }}
      pagination={false}
      dataSource={dataSource}
      tableKey="model"
      columns={columns}
      rowKey="key"
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
      width="auto"
      headTitle="报警名称:12312312"
      ref={drawerRef}
    >
      <ContactList show={custom || global}/>
    </Drawer>
  </>;
};

export default AlarmProject;
