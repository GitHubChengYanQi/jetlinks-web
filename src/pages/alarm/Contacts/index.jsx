import React, {useRef, useState} from 'react';
import {Button, Space, Dropdown, Menu, Input, Badge, message} from 'antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import {contactDelete, contactList} from '@/pages/alarm/Contacts/url';
import Save from '@/pages/alarm/Contacts/Save';
import {request} from '@/util/Request';

const Contacts = () => {

  const [saveVisible, setSaveVisible] = useState();

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
      render: (text) => <Render text={text || 500}/>
    },
    {
      title: '是否短信通知', dataIndex: 'shortMessageStatus', align: 'center', render: (text) => <Render>
        <Badge color={text === '1' ? 'green' : 'red'} text={text === '1' ? '是' : '否'}/>
      </Render>
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
      <FormItem label="姓名" name="1" component={Input}/>
      <FormItem label="职务" name="2" component={Input}/>
      <FormItem label="负责区域" name="3" component={Input}/>
      <FormItem label="通知状态" name="4" component={Input}/>
      <FormItem label="手机号码" name="5" component={Input}/>
      <FormItem label="创建时间" name="6" component={Input}/>
    </>;
  };

  return <>
    <Table
      ref={ref}
      api={contactList}
      searchButtons={[
        <Dropdown key={1} overlay={menu} placement="bottom">
          <Button>新增联系人</Button>
        </Dropdown>,
        <Dropdown key={2} overlay={actionMenu} placement="bottom">
          <Button>批量操作</Button>
        </Dropdown>,
        <Button key={3}>导出</Button>
      ]}
      searchForm={searchForm}
      columns={columns}
      rowKey="contactId"
      actionRender={(text, record) => (
        <Space>
          <Button type="link" onClick={() => setSaveVisible(record)}>编辑</Button>
          <Warning onOk={()=>handleDelete(record.contactId)}>
            <Button type="link" danger>删除</Button>
          </Warning>
        </Space>
      )}
    />

    <Save data={saveVisible} visible={saveVisible} success={() => {
      setSaveVisible();
      ref.current.submit();
    }} close={() => setSaveVisible()}/>
  </>;
};
export default Contacts;
