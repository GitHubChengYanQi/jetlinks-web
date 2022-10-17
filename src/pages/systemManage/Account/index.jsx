import React, {useRef, useState} from 'react';
import {Button, Space, Menu, Dropdown, message, Input, Select as AntSelect} from 'antd';
import moment from 'moment';
import {config, useHistory} from 'ice';
import cookie from 'js-cookie';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Save from '@/pages/systemManage/Account/Save';
import Table from '@/components/Table';
import {
  JumpLogin,
  mgrUserList, UserExcelDownloadTemplate,
  UserExcelImport,
  userRemove,
  userStart,
  userStop,
} from '@/Config/ApiUrl/system/user';
import FormItem from '@/components/Table/components/FormItem';
import DatePicker from '@/components/DatePicker';
import {useRequest} from '@/util/Request';
import {ActionButton, DangerButton, PrimaryButton} from '@/components/Button';
import {isArray} from '@/util/Tools';
import BatchImport from '@/components/BatchImport';
import SelectRoles from '@/pages/systemManage/Role/components/SelectRoles';
import store from '@/store';


const Account = () => {

  const [userInfo] = store.useModel('user');

  const info = userInfo.info || {};

  const ref = useRef();

  const [saveVisible, setSaveVisible] = useState();

  const [keys, setKeys] = useState([]);

  const [batchImport, setBatchImport] = useState(false);


  const {run: Jump} = useRequest(JumpLogin,
    {
      manual: true,
      onSuccess: (res) => {
        cookie.set('jetlink-token', res);
        window.location.href = window.location.origin;
      }
    });

  // 批量冻结账号
  const {run: stop} = useRequest(userStop,
    {
      manual: true,
      onSuccess: () => {
        setKeys([]);
        message.success('停用成功！');
        ref.current.refresh();
      }
    });


  const {run: deleteRun} = useRequest(userRemove,
    {
      manual: true,
      onSuccess: () => {
        setKeys([]);
        message.success('删除成功！');
        ref.current.refresh();
      }
    });

  // 批量解冻账号
  const {run: start} = useRequest(userStart,
    {
      manual: true,
      onSuccess: () => {
        setKeys([]);
        message.success('启用成功！');
        ref.current.refresh();
      }
    });


  const columns = [
    {title: '账号名称', dataIndex: 'account', align: 'center', render: (text) => <Render text={text}/>},
    {title: '账号姓名', dataIndex: 'name', align: 'center', render: (text) => <Render width={200} text={text}/>},
    {title: '角色名称', dataIndex: 'roleName', align: 'center', render: (text) => <Render width={200} text={text}/>},
    {
      title: '账号状态', dataIndex: 'status', align: 'center', render: (text) => <Render>
        <Button danger={text !== 'ENABLE'} type="link">{text === 'ENABLE' ? '启用' : '停用'}</Button>
      </Render>
    },
    {title: '手机号码', dataIndex: 'phone', align: 'center', render: (text) => <Render width={150} text={text}/>},
    {title: '电子邮箱', dataIndex: 'email', align: 'center', render: (text) => <Render width={150} text={text}/>},
    {
      title: '账号有效期', dataIndex: '8', align: 'center',
      render: (text, record) => <Render width={150}>
        {record.beginTime ? `${moment(record.beginTime).format('YYYY-MM-DD') || '-'}~${moment(record.endTime).format('YYYY-MM-DD') || '-'}` : '永久'}
      </Render>
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      render: (text) => <Render width={150} text={text}/>
    },
  ];

  const menu = <Menu
    items={[
      {
        key: '1',
        label: <Warning content="您确定启用么？" onOk={() => start({data: {userIds: keys}})}>批量启用</Warning>,
      },
      {
        danger: true,
        key: '2',
        label: <Warning content="您确定停用么？" onOk={() => stop({data: {userIds: keys}})}>批量停用</Warning>,
      },
      {
        danger: true,
        key: '3',
        label: <Warning onOk={() => deleteRun({data: {userIds: keys}})}>批量删除</Warning>,
      },
    ]}
  />;

  const {baseURI} = config;
  const token = cookie.get('jetlink-token');

  const exportMenu = <Menu
    items={[
      {
        key: '1',
        label: '导入',
        onClick: () => {
          setBatchImport(true);
        }
      },
      {
        key: '2',
        label: '导出',
        onClick: () => {
          window.open(`${baseURI}/UserExcel/export?authorization=${token}&userIds=${keys}`);
        }
      },
    ]}
  />;

  const searchForm = () => {
    return (
      <>
        <FormItem name="time" label="创建时间" component={DatePicker} RangePicker select/>
        <FormItem
          name="status"
          label="账号状态"
          component={({value, onChange}) => {
            return <AntSelect
              defaultValue="all"
              value={value || 'all'}
              options={[{label: '全部', value: 'all'}, {label: '启用', value: 'ENABLE'}, {label: '停用', value: 'LOCKED'}]}
              onChange={(value) => {
                onChange(value === 'all' ? null : value);
              }}
            />;
          }} select/>
        <FormItem
          label="角色名称"
          name="roleName"
          component={SelectRoles}
        />
        <FormItem name="name" label="关键字查询" component={Input} style={{width: 250}} placeholder="管理员账号/姓名/手机号/邮箱"/>
      </>
    );
  };

  return <>
    <Table
      formSubmit={(values) => {
        if (isArray(values.time).length > 0) {
          values = {...values, startTime: values.time[0], endTime: values.time[1],};
        }
        return {...values,deptId: info.deptId};
      }}
      onChange={setKeys}
      selectedRowKeys={keys}
      tableKey="account"
      ref={ref}
      api={mgrUserList}
      columns={columns}
      rowKey="userId"
      searchForm={searchForm}
      searchButtons={[
        <PrimaryButton key="0" onClick={() => setSaveVisible({})}>新建账号</PrimaryButton>,
        <Dropdown key="1" disabled={keys.length === 0} overlay={menu} placement="bottom">
          <PrimaryButton>批量操作</PrimaryButton>
        </Dropdown>,
        <Dropdown key="2" overlay={exportMenu} placement="bottom">
          <PrimaryButton>导入导出</PrimaryButton>
        </Dropdown>
      ]}
      actionRender={(text, record) => {
        const open = record.status === 'ENABLE';
        return <Space>
          <PrimaryButton onClick={() => setSaveVisible(record)}>编辑</PrimaryButton>
          <Warning disabled={info.userId === record.userId || record.status !== 'ENABLE'} content="确定进入到该账户系统吗？" onOk={() => Jump({params: {userId: record.userId}})}>
            <PrimaryButton disabled={info.userId === record.userId || record.status !== 'ENABLE'}>进入账户</PrimaryButton>
          </Warning>
          <Warning
            content={`您确定${open ? '停用' : '启用'}么?`}
            onOk={() => !open ? start({data: {userIds: [record.userId]}}) : stop({data: {userIds: [record.userId]}})
            }>
            {open ? <DangerButton>停用</DangerButton> : <ActionButton>启用</ActionButton>}
          </Warning>
          <Warning onOk={() => deleteRun({data: {userIds: [record.userId]}})}>
            <DangerButton danger type="link">删除</DangerButton>
          </Warning>
        </Space>;
      }}
    />
    <Save
      success={(success) => {
        setSaveVisible(null);
        if (success) {
          ref.current.submit();
        } else {
          ref.current.refresh();
        }
      }}
      close={() => setSaveVisible(null)}
      visible={Boolean(saveVisible)}
      data={saveVisible || {}}
    />

    <BatchImport
      columns={[
        {title: '账号名称', dataIndex: 'account', align: 'center', render: (text) => <Render text={text}/>},
        {title: '账号姓名', dataIndex: 'name', align: 'center', render: (text) => <Render text={text}/>},
        {title: '账号角色', dataIndex: 'roleName', align: 'center', render: (text) => <Render text={text}/>},
        {title: '手机号码', dataIndex: 'phone', align: 'center', render: (text) => <Render text={text}/>},
        {title: '电子邮件', dataIndex: 'email', align: 'center', render: (text) => <Render text={text}/>},
        {title: '账号密码', dataIndex: 'password', align: 'center', render: (text) => <Render text={text}/>},
        {title: '状态', dataIndex: 'status', align: 'center', render: (text) => <Render text={text}/>},
      ]}
      title="账号"
      templeteApi={UserExcelDownloadTemplate}
      api={UserExcelImport}
      success={() => {
        setBatchImport(false);
        ref.current.refresh();
      }}
      visible={batchImport}
      close={() => setBatchImport(false)}
    />
  </>;
};

export default Account;

