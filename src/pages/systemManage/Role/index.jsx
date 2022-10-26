import React, {useRef, useState} from 'react';
import {Space, Menu, Dropdown, message, Select as AntSelect} from 'antd';
import {config} from 'ice';
import cookie from 'js-cookie';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Save, {formatData} from './Save';
import Table from '@/components/Table';
import DatePicker from '@/components/DatePicker';
import FormItem from '../../../components/Table/components/FormItem/index';
import {roleBatchDelete, roleList, roleStart, roleStop} from '@/Config/ApiUrl/system/role';
import Note from '@/components/Note';
import {useRequest} from '@/util/Request';
import {isArray} from '@/util/Tools';
import {ActionButton, DangerButton, PrimaryButton} from '@/components/Button';
import store from '@/store';
import SelectRoles from '@/pages/systemManage/Role/components/SelectRoles';
import Modal from '@/components/Modal';
import Tree from '@/components/Tree';
import SelectTopClass from '@/pages/monitor/LeftTree/components/Group/Save/components/SelectTopClass';

const Role = () => {

  const modelRef = useRef();
  const groupRef = useRef();

  const [userInfo] = store.useModel('user');

  const info = userInfo.info || {};

  const ref = useRef();

  const [saveVisible, setSaveVisible] = useState();

  const [keys, setKeys] = useState([]);

  const {loading: stopLoading, run: stop} = useRequest(roleStop, {
    manual: true,
    onSuccess: () => {
      setKeys([]);
      message.success('禁用成功！');
      ref.current.refresh();
    },
  });

  const {loading: startLoading, run: start} = useRequest(roleStart, {
    manual: true,
    onSuccess: () => {
      setKeys([]);
      message.success('启用成功！');
      ref.current.refresh();
    },
  });

  const {loading: deleteLoading, run: deleteRun} = useRequest(roleBatchDelete, {
    manual: true,
    onSuccess: () => {
      setKeys([]);
      message.success('删除成功！');
      ref.current.refresh();
    },
  });

  const columns = [
    {title: '角色名称', dataIndex: 'name', align: 'center', render: (text) => <Render text={text} />},
    {
      title: '菜单权限',
      dataIndex: 'menuList',
      align: 'center',
      render: (menuList = []) => <Render
        width={200}
        style={{cursor: 'pointer'}}
        onClick={() => modelRef.current.open(menuList.map(item => `${item.menuId}`))}
      >
        <Note
          tooltip={false}
          className="primaryColor"
          maxWidth={400}>
          {isArray(menuList).map(item => item.name).toString()}
        </Note>
      </Render>
    },
    {
      title: '分组权限',
      dataIndex: 'roleBindResults',
      align: 'center',
      render: (roleBindResults = []) => <Render
        width={200}
        className="green"
        style={{cursor: 'pointer'}}
        onClick={() => groupRef.current.open(roleBindResults.map(item => `${item.classifyId}`))}
      >
        <Note
          tooltip={false}
          className="primaryColor"
          maxWidth={400}>
          {isArray(roleBindResults).map(item => item.classifyName || '全部分组').toString()}
        </Note>
      </Render>
    },
    {
      title: '角色状态', dataIndex: 'status', align: 'center', render: (text) => {
        const open = text === '1';
        return <Render>
          <span className={open ? 'green' : 'red'}>{open ? '启用' : '停用'}</span>
        </Render>;
      }
    },
    {title: '应用账号数', dataIndex: 'userCount', align: 'center', render: (text) => <Render text={text} />},
    {title: '创建时间', dataIndex: 'createTime', align: 'center', render: (text) => <Render width={150} text={text} />},
  ];

  const menu = <Menu
    items={[
      {
        key: '1',
        label: <Warning content="您确定启用么？" onOk={() => start({data: {roleIds: keys}})}>批量启用</Warning>,
      },
      {
        danger: true,
        key: '2',
        label: <Warning content="您确定停用么？" onOk={() => stop({data: {roleIds: keys}})}>批量停用</Warning>,
      },
      {
        danger: true,
        key: '3',
        label: <Warning onOk={() => deleteRun({data: {roleIds: keys}})}>批量删除</Warning>,
      },
    ]}
  />;

  const searchForm = () => {
    return (
      <>
        <FormItem label="创建时间" select name="time" component={DatePicker} RangePicker />
        <FormItem label="角色状态" name="status" component={({value, onChange}) => {
          return <AntSelect
            defaultValue="all"
            value={value || 'all'}
            options={[{label: '全部', value: 'all'}, {label: '启用', value: '1'}, {label: '停用', value: '0'}]}
            onChange={(value) => {
              onChange(value === 'all' ? null : value);
            }}
          />;
        }} />
        <FormItem label="角色名称" name="name" component={SelectRoles} />
      </>
    );
  };

  const {baseURI} = config;
  const token = cookie.get('jetlink-token');

  return <>

    <Table
      onChange={setKeys}
      selectedRowKeys={keys}
      formSubmit={(values) => {
        if (isArray(values.time).length > 0) {
          values = {...values, startTime: values.time[0], endTime: values.time[1],};
        }
        return {...values, deptId: info.deptId};
      }}
      loading={stopLoading || startLoading || deleteLoading}
      tableKey="role"
      ref={ref}
      searchForm={searchForm}
      searchButtons={[
        <PrimaryButton key="0" onClick={() => setSaveVisible({})}>新建角色</PrimaryButton>,
        <Dropdown key="1" overlay={menu} placement="bottom">
          <PrimaryButton>批量操作</PrimaryButton>
        </Dropdown>,
        <PrimaryButton disabled={keys.length === 0} key="2" onClick={() => {
          window.open(`${baseURI}/RoleExcel/export?authorization=${token}&roleIds=${keys}`);
        }}>导出</PrimaryButton>
      ]}
      api={roleList}
      columns={columns}
      rowKey="roleId"
      actionRender={(text, record) => {
        const disabled = [1, 2, 3].includes(record.roleId);
        const open = record.status === '1';
        return <Space>
          <PrimaryButton disabled={info.roleId !== '1' && disabled} onClick={() => {
            const menuList = record.menuList || [];
            const roleBindResults = record.roleBindResults || [];
            setSaveVisible({
              ...record,
              menuIds: menuList.map(item => `${item.menuId}`),
              classifyIds: roleBindResults.map(item => `${item.classifyId}`),
            });
          }}>编辑</PrimaryButton>
          <Warning content={`您确定${open ? '停用' : '启用'}么？`} onOk={() => {
            if (open) {
              stop({data: {roleIds: [record.roleId]}});
            } else {
              start({data: {roleIds: [record.roleId]}});
            }
          }}>
            {open ?
              <DangerButton disabled={disabled}>停用</DangerButton>
              :
              <ActionButton disabled={disabled}>启用</ActionButton>
            }
          </Warning>
          <Warning disabled={disabled} onOk={() => deleteRun({data: {roleIds: [record.roleId]}})}>
            <DangerButton disabled={disabled}>删除</DangerButton>
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
      visible={saveVisible}
      data={saveVisible}
    />

    <Modal
      defaultExpandAll
      headTitle="菜单权限"
      ref={modelRef}
      show
      disabled
      component={Tree}
      padding={24}
      border
      halfChecked
      treeData={[{key: '0', title: '全部', children: formatData(userInfo.menus)}]}
    />

    <Modal
      disabled
      headTitle="分组权限"
      ref={groupRef}
      component={SelectTopClass}
      checkable
      padding={24}
    />
  </>;
};

export default Role;

