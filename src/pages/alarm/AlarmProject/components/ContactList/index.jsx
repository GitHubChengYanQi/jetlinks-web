import React from 'react';
import {Button, Table as AntTable, Tabs} from 'antd';
import Render from '@/components/Render';
import style from '@/components/Table/index.module.less';

const ContactList = () => {

  const columns = [
    {title: '姓名', dataIndex: 'name', align: 'center', render: (text) => <Render width={150} text={text}/>},
    {
      title: '职务',
      dataIndex: 'job',
      align: 'center',
      render: (text) => <Render text={text}/>
    },
    {title: '手机号码', dataIndex: 'phone', align: 'center', render: (text) => <Render width={150} text={text}/>},
    {title: '电子邮箱', dataIndex: 'mail', align: 'center', render: (text) => <Render text={text}/>},
    {title: '创建时间', dataIndex: 'createTime', align: 'center', render: (text) => <Render text={text}/>},
  ];

  return <>
    <Tabs
      tabBarExtraContent={<Button type="primary">添加联系人组</Button>}
      items={[{key: '1', label: '联系人组'}]}
    />
    <AntTable
      onHeaderRow={() => {
        return {
          className: style.headerRow
        };
      }}
      columns={columns}
      dataSource={[{}, {}, {}]}
    />
  </>;
};

export default ContactList;
