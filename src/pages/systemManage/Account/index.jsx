import React, {useRef, useState} from 'react';
import {Button, Space, Menu, Dropdown, message, Input, Select} from 'antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Save from '@/pages/systemManage/Account/Save';
import Table from '@/components/Table';
import {mgrUserList, userFreeze, userRemove, userStart, userStop, userUnfreeze} from '@/Config/ApiUrl/system/user';
import FormItem from '@/components/Table/components/FormItem';
import DatePicker from '@/components/DatePicker';
import {request, useRequest} from '@/util/Request';
import {ActionButton, DangerButton, PrimaryButton} from '@/components/Button';


const Account = () => {

  const ref = useRef();

  const [saveVisible, setSaveVisible] = useState();

  const [keys, setKeys] = useState([]);

  // 冻结账号
  const {run: freezeRun} = useRequest(userFreeze,
    {
      manual: true,
      onError: (error) => {
        message.error(error.message);
      },
      onSuccess: () => {
        message.success('禁用成功！');
        ref.current.refresh();
      }
    });


  // 批量冻结账号
  const {run: stop} = useRequest(userStop,
    {
      manual: true,
      onError: (error) => {
        message.error(error.message);
      },
      onSuccess: () => {
        setKeys([]);
        message.success('禁用成功！');
        ref.current.refresh();
      }
    });

  const freeze = async (userId) => {
    freezeRun({data: {userId}});
  };

  // 解冻账号
  const {run: unfreezeRun} = useRequest(userUnfreeze,
    {
      manual: true,
      onError: (error) => {
        message.error(error.message);
      },
      onSuccess: () => {
        message.success('启用成功！');
        ref.current.submit();
      }
    });

  // 批量解冻账号
  const {run: start} = useRequest(userStart,
    {
      manual: true,
      onError: (error) => {
        message.error(error.message);
      },
      onSuccess: () => {
        setKeys([]);
        message.success('启用成功！');
        ref.current.submit();
      }
    });


  const unfreeze = (userId) => {
    unfreezeRun({data: {userId}});
  };

  // 删除账号
  const remove = (userId) => {
    request({...userRemove, params: {userId}}).then((res) => {
      if (res.success) {
        message.success('删除成功!');
        ref.current.submit();
      }
    }).catch(() => message.success('删除失败！'));
  };


  const columns = [
    {title: '账号名称', dataIndex: 'account', align: 'center', render: (text) => <Render text={text}/>},
    {title: '账号姓名', dataIndex: 'name', align: 'center', render: (text) => <Render width={200} text={text}/>},
    {title: '角色名称', dataIndex: 'roleName', align: 'center', render: (text) => <Render width={200} text={text}/>},
    {
      title: '账号状态', dataIndex: 'status', align: 'center', render: (text) => <Render>
        <Button danger={text !== 'ENABLE'} type="link">{text === 'ENABLE' ? '启用' : '禁用'}</Button>
      </Render>
    },
    {title: '手机号码', dataIndex: 'phone', align: 'center', render: (text) => <Render width={150} text={text}/>},
    {title: '电子邮箱', dataIndex: 'email', align: 'center', render: (text) => <Render width={150} text={text}/>},
    {title: '账号有效期', dataIndex: '8', align: 'center', render: (text) => <Render width={150} text={text}/>},
    {title: '租户名称', dataIndex: 'customerName', align: 'center', render: (text) => <Render width={150} text={text}/>},
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
        label: <Warning>批量删除</Warning>,
        onClick: () => {

        }
      },
    ]}
  />;

  const exportMenu = <Menu
    items={[
      {
        key: '1',
        label: '导入',
        onClick: () => {

        }
      },
      {
        key: '2',
        label: '导出',
        onClick: () => {

        }
      },
    ]}
  />;

  const searchForm = () => {
    return (
      <>
        <FormItem name="name" label="创建时间" component={DatePicker} showTime select/>
        <FormItem name="status" label="账号状态" component={Select} select/>
        <FormItem name="status" label="分组名称" component={Select} select/>
        <FormItem name="status" label="关键字查询" component={Input}/>
      </>
    );
  };

  return <>
    <Table
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
          <PrimaryButton type="link" onClick={() => setSaveVisible(record)}>编辑</PrimaryButton>
          <Warning
            content={`您确定${open ? '禁用' : '启用'}么?`}
            onOk={() => !open ? unfreeze(record.userId) : freeze(record.userId)
            }>
            {open ? <DangerButton>禁用</DangerButton> : <ActionButton>启用</ActionButton>}
          </Warning>
          <Warning onOk={() => remove(record.userId)}>
            <DangerButton danger type="link">删除</DangerButton>
          </Warning>
        </Space>;
      }}
    />
    <Save
      success={() => {
        setSaveVisible(null);
        ref.current.submit();
      }}
      close={() => setSaveVisible(null)}
      visible={Boolean(saveVisible)}
      data={saveVisible || {}}
    />
  </>;
};

export default Account;

