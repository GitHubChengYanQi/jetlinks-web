import React, {useRef, useState} from 'react';
import {Button, Space, Menu, Dropdown, Input, Select, message} from 'antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Save from './Save';
import Table from '@/components/Table';
import DatePicker from '@/components/DatePicker';
import FormItem from '../../../components/Table/components/FormItem/index';
import {roleList, roleRemove} from '@/Config/ApiUrl/system/role';
import Note from '@/components/Note';
import {request} from '@/util/Request';
import {isArray} from '@/util/Tools';
import {ActionButton, DangerButton, PrimaryButton} from '@/components/Button';

const Role = () => {

  const ref = useRef();

  const [saveVisible, setSaveVisible] = useState();


  const handleDelete = (roleId) => {
    request({...roleRemove, params: {roleId}}).then((res) => {
      if (res.success) {
        message.success('删除成功!');
        ref.current.submit();
      }
    }).catch(() => message.success('删除失败！'));
  };

  const columns = [
    {title: '角色名称', dataIndex: 'name', align: 'center', render: (text) => <Render text={text} />},
    {
      title: '菜单权限',
      dataIndex: 'menuList',
      align: 'center',
      render: (menuList = []) => <Render width={200}>
        <Note maxWidth={400}>{isArray(menuList).map(item => item.name).toString()}</Note>
      </Render>
    },
    {title: '分组权限', dataIndex: '3', align: 'center', render: (text) => <Render text={text} />},
    {title: '角色状态', dataIndex: '4', align: 'center', render: (text) => <Render width={200} text={text} />},
    {title: '应用账号数', dataIndex: '5', align: 'center', render: (text) => <Render text={text} />},
    {title: '创建时间', dataIndex: 'createTime', align: 'center', render: (text) => <Render width={150} text={text} />},
  ];

  const menu = <Menu
    items={[
      {
        key: '1',
        label: <Warning content="您确定启用么？">批量启用</Warning>,
        onClick: () => {

        }
      },
      {
        danger: true,
        key: '2',
        label: <Warning content="您确定停用么？">批量停用</Warning>,
        onClick: () => {

        }
      },
      {
        danger: true,
        key: '3',
        label: <Warning>批量删除</Warning>,
        onClick: () => {

        }
      },
    ]}
  />;

  const searchForm = () => {
    return (
      <>
        <FormItem label="创建时间" select name="time" component={DatePicker} showTime />
        <FormItem label="角色状态" name="status" component={Select} />
        <FormItem label="角色名称" name="name" component={Input} />
      </>
    );
  };

  return <>

    <Table
      ref={ref}
      searchForm={searchForm}
      searchButtons={[
        <PrimaryButton key="0" onClick={() => setSaveVisible({})}>新建角色</PrimaryButton>,
        <Dropdown key="1" overlay={menu} placement="bottom">
          <PrimaryButton>批量操作</PrimaryButton>
        </Dropdown>,
        <PrimaryButton key="2">导出</PrimaryButton>
      ]}
      api={roleList}
      columns={columns}
      rowKey="roleId"
      actionRender={(text, record) => (
        <Space>
          <PrimaryButton onClick={() => {
            const menuList = record.menuList || [];
            setSaveVisible({
              ...record,
              menuIds: menuList.map(item => `${item.menuId}`)
            });
          }}>编辑</PrimaryButton>
          <Warning content="您确定启用么?">
            <ActionButton>启用</ActionButton>
          </Warning>
          <Warning onOk={() => handleDelete(record.roleId)}>
            <DangerButton>删除</DangerButton>
          </Warning>
        </Space>
      )}
    />

    <Save
      success={() => {
        setSaveVisible(null);
        ref.current.submit();
      }}
      close={() => setSaveVisible(null)}
      visible={saveVisible}
      data={saveVisible}
    />
  </>;
};

export default Role;

