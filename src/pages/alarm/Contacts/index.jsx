import React, {useRef, useState} from 'react';
import {Space, Dropdown, Menu, Input, message, Button} from 'antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import {contactDelete, contactList} from '@/pages/alarm/Contacts/url';
import Save from '@/pages/alarm/Contacts/Save';
import {request} from '@/util/Request';
import BatchImport from '@/components/BatchImport';
import {DangerButton, PrimaryButton} from '@/components/Button';
import {createFormActions} from '@formily/antd';

const formActionsPublic = createFormActions();

const Contacts = ({
  noAction,
  ids = [],
  onChange = () => {
  },
  onSuccess = () => {
  }
}) => {

  const [saveVisible, setSaveVisible] = useState();
  const [batchImport, setBatchImport] = useState(false);

  const [keys, setKeys] = useState(ids || []);

  const ref = useRef();

  const columns = [
    {title: '姓名', dataIndex: 'name', align: 'center', render: (text) => <Render width={150} text={text}/>},
    {
      title: '职务',
      dataIndex: 'job',
      align: 'center',
      render: (text) => <Render text={text}/>
    },
    {title: '负责区域', dataIndex: 'region', align: 'center', render: (text) => <Render text={text}/>},
    {
      title: '剩余免费短信条数',
      dataIndex: 'shortMessageNumber',
      align: 'center',
      render: (text) => <Render className="green" text={text || 500}/>
    },
    {
      title: '是否短信通知', dataIndex: 'shortMessageStatus', align: 'center', render: (text = '0') => {
        const open = text !== '0';
        return <Render>
          <span className={open ? 'green' : 'red'}>{open ? '启用' : '停用'}</span>
        </Render>;
      }
    },
    {title: '手机号码', dataIndex: 'phone', align: 'center', render: (text) => <Render width={150} text={text}/>},
    {title: '电子邮箱', dataIndex: 'mail', align: 'center', render: (text) => <Render text={text}/>},
    {title: '创建时间', dataIndex: 'createTime', align: 'center', render: (text) => <Render text={text}/>},
  ];

  const handleDelete = (contactId) => {
    request({...contactDelete, data: {contactId}}).then((res) => {
      if (res.success) {
        message.success('删除成功!');
        ref.current.submit();
      }
    }).catch(() => message.success('删除失败！'));
  };

  const menu = <Menu
    items={[
      {
        key: '1',
        label: '单独新增',
        onClick: () => {
          setSaveVisible({});
        }
      },
      {
        key: '3',
        label: '批量新增',
        onClick: () => {

        }
      },
    ]}
  />;

  const actionMenu = <Menu
    items={[
      {
        key: '1',
        label: '批量删除',
        danger: true,
        onClick: () => {

        }
      },
    ]}
  />;

  const searchForm = () => {
    return <>
      <FormItem noLabel={noAction} label="姓名" name="1" component={Input}/>
      <FormItem noLabel={noAction} label="职务" name="2" component={Input}/>
      <FormItem noLabel={noAction} label="负责区域" name="3" component={Input}/>
      <FormItem noLabel={noAction} label="手机号码" name="5" component={Input}/>
      {!noAction && <FormItem label="创建时间" name="6" component={Input}/>}
    </>;
  };

  return <>
    <Table
      formActions={formActionsPublic}
      selectedRowKeys={keys}
      onChange={(value, record) => {
        onChange(value, record);
        setKeys(value);
      }}
      noAction={noAction}
      tableKey={noAction ? '' : 'contact'}
      ref={ref}
      api={contactList}
      searchButtons={noAction ? [] : [
        <Dropdown key={1} overlay={menu} placement="bottom">
          <PrimaryButton>新增联系人</PrimaryButton>
        </Dropdown>,
        <Dropdown key={2} overlay={actionMenu} placement="bottom">
          <PrimaryButton>批量操作</PrimaryButton>
        </Dropdown>,
        <PrimaryButton key={3}>导出</PrimaryButton>
      ]}
      searchForm={searchForm}
      columns={columns}
      rowKey="contactId"
      footer={!noAction ? null : () => {
        return <Button type="primary" ghost onClick={onSuccess}>确认</Button>;
      }}
      actionRender={(text, record) => (
        <Space>
          <PrimaryButton onClick={() => setSaveVisible(record)}>编辑</PrimaryButton>
          <Warning onOk={() => handleDelete(record.contactId)}>
            <DangerButton>删除</DangerButton>
          </Warning>
        </Space>
      )}
    />

    <Save data={saveVisible} visible={saveVisible} success={() => {
      setSaveVisible();
      ref.current.submit();
    }} close={() => setSaveVisible()}/>

    <BatchImport
      title="联系人"
      success={() => {
        setBatchImport(false);
        ref.current.submit();
      }}
      visible={batchImport}
      close={() => setBatchImport(false)}
    />
  </>;
};
export default Contacts;
