import React, {useState} from 'react';
import {Button, Space, Dropdown, Menu, Select, Input} from 'antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Restart from '@/pages/equipment/Equipment/Restart';
import Save from '@/pages/equipment/Equipment/Save';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import DatePicker from '@/components/DatePicker';
import {useHistory} from 'ice';

const Equipment = () => {

  const history = useHistory();

  const [saveVisible, setSaveVisible] = useState();

  const [restarting, setRestarting] = useState();
  const changeDeploy = (record) => {

  };

  const unDeploy = (record) => {

  };

  const columns = [
    {
      title: '序号',
      align: 'center',
      dataIndex: '0',
      render: (value, record, index) => <Render text={index + 1} width={50}/>
    },
    {
      title: '设备状态', dataIndex: 'state', align: 'center', render: (state = {}) => {
        const notActive = state.value === 'notActive';
        const offline = state.value === 'offline';
        return <Render>
          <Button type="link" disabled={offline} danger={notActive}>{state.text}</Button>
        </Render>;
      }
    },
    {
      title: '终端备注',
      dataIndex: '2',
      align: 'center',
      render: (text) => {
        return <Render>
          <div onClick={() => history.push('/monitor')}>{text}</div>
        </Render>;
      }
    },
    {
      title: '设备名称', dataIndex: 'name', align: 'center', render: (text) => <Render text={text}/>
    },
    {title: '设备分组', dataIndex: '5', align: 'center', render: (text) => <Render text={text}/>},
    {title: '设备类别', dataIndex: '6', align: 'center', render: (text) => <Render text={text}/>},
    {
      title: '设备型号',
      dataIndex: 'productName',
      align: 'center',
      render: (text) => <Render width={120} text={text}/>
    },
    {
      title: '设备IP地址', dataIndex: '8', align: 'center', render: (text) => {
        return <Render width={120}>
          <Warning content="确定进入远程配置么？">
            <Button type="link">{text}</Button>
          </Warning>
        </Render>;
      }
    },
    {title: '设备MAC地址', dataIndex: '9', align: 'center', render: (text) => <Render width={120} text={text}/>},
    {title: '位置信息', dataIndex: '10', align: 'center', render: (text) => <Render width={200} text={text}/>},
    {title: '运行时间', dataIndex: '11', align: 'center', render: (text) => <Render text={text}/>},
    {
      title: '上线时间',
      dataIndex: 'createTime',
      align: 'center',
      render: (text) => <Render width={150} text={text}/>
    },
    {title: '离线时间', dataIndex: '12', align: 'center', render: (text) => <Render width={150} text={text}/>},
    {title: '质保时间', dataIndex: '12', align: 'center', render: (text) => <Render width={150} text={text}/>},
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      render: (text, record) => {
        const stateValue = record.state?.value;
        const notActive = stateValue === 'notActive';
        return <Space>
          <Button ghost type="primary" onClick={() => setSaveVisible({id: 11})}>编辑</Button>
          <Warning content={`确定要${notActive ? '重启' : '禁用'}重启设备么？`} onOk={() => setRestarting(record)}>
            <Button ghost danger={!notActive} type="primary">{notActive ? '重启' : '禁用 '}</Button>
          </Warning>
        </Space>;
      }
    },
  ];

  const menu = <Menu
    items={[
      {
        key: '1',
        label: <Warning content="确定要重启设备么?" onOk={() => setRestarting({})}>批量重启</Warning>,
        onClick: () => {

        }
      },
    ]}
  />;

  const actionMenu = <Menu
    items={[
      {
        key: '1',
        label: '单个新增',
        onClick: () => {
          setSaveVisible({});
        }
      },
    ]}
  />;

  const searchForm = () => {
    return <>
      <FormItem label="设备状态" name="1" component={Select}/>
      <FormItem label="终端备注" name="2" component={Input}/>
      <FormItem label="设备名称" name="3" component={Input}/>
      <FormItem label="设备分组" name="4" component={Input}/>
      <FormItem label="设备型号" name="5" component={Input}/>
      <FormItem label="设备MAC" name="6" component={Input}/>
      <FormItem label="位置信息" name="7" component={Input}/>
      <FormItem label="离线时间" name="8" component={DatePicker} showTime/>
    </>;
  };

  return <>
    <Table
      searchButtons={[
        <Dropdown key={0} overlay={actionMenu} placement="bottom">
          <Button>新增设备</Button>
        </Dropdown>,
        <Button key={1}>移动分组</Button>,
        <Dropdown key={2} overlay={menu} placement="bottom">
          <Button>批量操作</Button>
        </Dropdown>,
        <Button key={3}>导出</Button>
      ]}
      searchForm={searchForm}
      dataSource={[{id: 1}, {id: 2}]}
      columns={columns}
      rowKey="id"
    />

    <Save
      visible={Boolean(saveVisible)}
      close={() => setSaveVisible(null)}
      data={saveVisible || {}}
      success={() => {

      }}
    />
    <Restart
      visible={restarting}
      success={() => {
        if (restarting.id) {
          const stateValue = restarting.state?.value;
          const notActive = stateValue === 'notActive';
          if (notActive) {
            changeDeploy(restarting);
          } else {
            unDeploy(restarting);
          }
        }
        setRestarting(null);
      }}
    />
  </>;
};

export default Equipment;
