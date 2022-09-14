import React, {useRef, useState} from 'react';
import {Button, Space, Menu, Dropdown, Select, Input, message} from 'antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import DatePicker from '@/components/DatePicker';
import AccountAsk from '@/pages/Login/AccountAsk';
import {customerList, customerStart} from '@/pages/systemManage/Tenant/url';
import {useRequest} from '@/util/Request';
import {ActionButton, DangerButton, PrimaryButton} from '@/components/Button';
import Save from '@/pages/systemManage/Tenant/Save';
import Info from '@/pages/systemManage/Tenant/Info';
import DownloadFile from '@/components/DownloadFile';


const Tenant = () => {

  const ref = useRef();

  const [askAccount, setAskAccount] = useState();

  const [visible, setVisible] = useState(false);

  const [infoVisible, setInfoVisible] = useState();

  const columns = [
    {
      title: '审核结果',
      dataIndex: 'status',
      align: 'center',
      render: (text) => <Render>
        <Button danger={text !== 1} type="link">{text === 1 ? '通过' : '待审核'}</Button></Render>
    },
    {title: '企业名称', dataIndex: 'name', align: 'center', render: (text) => <Render width={200} text={text}/>},
    {title: '统一社会信用代码', dataIndex: 'code', align: 'center', render: (text) => <Render text={text}/>},
    {title: '企业经营场所', dataIndex: 'place', align: 'center', render: (text) => <Render width={200} text={text}/>},
    {title: '管理员姓名', dataIndex: 'contactName', align: 'center', render: (text) => <Render text={text}/>},
    {title: '管理员手机号码', dataIndex: 'contactPhone', align: 'center', render: (text) => <Render text={text}/>},
    {title: '管理员账号', dataIndex: 'adminAccount', align: 'center', render: (text) => <Render text={text}/>},
    {title: '身份证号 ', dataIndex: 'legalPersonCard', align: 'center', render: (text) => <Render text={text}/>},
    {
      title: '营业执照 ',
      dataIndex: 'file',
      align: 'center',
      render: (fileId) => <Render width={50}><DownloadFile fileId={fileId}/></Render>
    },
    {
      title: '提交时间 ',
      dataIndex: 'createTime',
      align: 'center',
      render: (text) => <Render width={150} text={text}/>
    },
  ];

  const menu = <Menu
    items={[
      {
        key: '1',
        label: <Warning content="您确定通过么？">批量通过</Warning>,
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
    return <>
      <FormItem label="审核结果" name="jg" component={Select} select/>
      <FormItem label="提交时间" name="tj" component={DatePicker} select/>
      <FormItem label="企业查询" name="qy" component={Input} select/>
      <FormItem label="联系人查询" name="lxr" component={Input} select/>
    </>;
  };

  return <>
    <Table
      ref={ref}
      tableKey="customer"
      api={customerList}
      searchButtons={[
        <Dropdown key={1} overlay={menu} placement="bottom">
          <PrimaryButton>批量操作</PrimaryButton>
        </Dropdown>,
        <PrimaryButton key={2}>导出</PrimaryButton>
      ]}
      searchForm={searchForm}
      columns={columns}
      rowKey="customerId"
      actionRender={(text, record) => {
        const open = record.status === 1;
        return <Space>
          {!open && <ActionButton onClick={() => setInfoVisible(record)}>通过</ActionButton>}
          {!open && <PrimaryButton onClick={() => setAskAccount(record)}>修改</PrimaryButton>}
          <PrimaryButton onClick={() => setVisible(true)}>数据转发</PrimaryButton>
          <Warning>
            <DangerButton>删除</DangerButton>
          </Warning>
        </Space>;
      }}
    />

    <AccountAsk
      visibilityToggle={false}
      visible={askAccount}
      onClose={() => {
        ref.current.submit();
        setAskAccount(null);
      }}
      data={askAccount || {}}
    />

    <Save visible={visible} close={() => setVisible(false)} success={() => {
      setVisible(false);
      ref.current.submit();
    }}/>

    <Info
      data={infoVisible}
      visible={infoVisible}
      close={() => setInfoVisible()}
      success={() => {
        setInfoVisible();
        ref.current.submit();
      }}
    />
  </>;
};

export default Tenant;


