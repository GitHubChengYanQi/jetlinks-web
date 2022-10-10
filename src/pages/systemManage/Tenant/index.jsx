import React, {useRef, useState} from 'react';
import {Button, Space, Menu, Dropdown, Input, Select as AntSelect, message} from 'antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import DatePicker from '@/components/DatePicker';
import AccountAsk from '@/pages/Login/AccountAsk';
import {customerDelete, customerList, customerStart} from '@/pages/systemManage/Tenant/url';
import {ActionButton, DangerButton, PrimaryButton} from '@/components/Button';
import Save from '@/pages/systemManage/Tenant/Save';
import Info from '@/pages/systemManage/Tenant/Info';
import DownloadFile from '@/components/DownloadFile';
import {isArray} from '@/util/Tools';
import {useRequest} from '@/util/Request';
import {config} from 'ice';
import cookie from 'js-cookie';

const Tenant = () => {

  const ref = useRef();

  const [askAccount, setAskAccount] = useState();

  const [visible, setVisible] = useState(false);

  const [infoVisible, setInfoVisible] = useState();

  const [keys, setKeys] = useState([]);

  const {loading, run} = useRequest(customerStart, {
    manual: true,
    onSuccess: () => {
      setKeys([]);
      message.success('通过成功！');
      ref.current.refresh();
    }
  });

  const {loading: deleteLoading, run: deleteRun} = useRequest(customerDelete, {
    manual: true,
    onSuccess: () => {
      setKeys([]);
      message.success('删除成功！');
      ref.current.refresh();
    }
  });

  const columns = [
    {
      title: '审核结果',
      dataIndex: 'status',
      align: 'center',
      render: (text) => <Render>
        <Button
          className={text === 1 ? 'green' : 'red'}
          danger={text !== 1}
                type="link">{text === 1 ? '通过' : '待审核'}
        </Button>
      </Render>
    },
    {title: '企业名称', dataIndex: 'name', align: 'center', render: (text) => <Render width={200} text={text} />},
    {title: '统一社会信用代码', dataIndex: 'code', align: 'center', render: (text) => <Render text={text} />},
    {title: '企业经营场所', dataIndex: 'place', align: 'center', render: (text) => <Render width={200} text={text} />},
    {
      title: '可用短信条数',
      dataIndex: 'total',
      align: 'center',
      render: (text) => <Render className="green">{text || 0}</Render>
    },
    {title: '管理员姓名', dataIndex: 'contactName', align: 'center', render: (text) => <Render text={text} />},
    {title: '管理员手机号码', dataIndex: 'contactPhone', align: 'center', render: (text) => <Render text={text} />},
    {title: '管理员账号', dataIndex: 'adminAccount', align: 'center', render: (text) => <Render text={text} />},
    {title: '身份证号 ', dataIndex: 'legalPersonCard', align: 'center', render: (text) => <Render text={text} />},
    {
      title: '营业执照 ',
      dataIndex: 'file',
      align: 'center',
      render: (fileId, record) => <Render
        width={50}>
        <DownloadFile fileId={fileId} fileName={record.fileName} />
      </Render>
    },
    {
      title: '提交时间 ',
      dataIndex: 'createTime',
      align: 'center',
      render: (text) => <Render width={150} text={text} />
    },
  ];

  const menu = <Menu
    items={[
      {
        key: '1',
        label: <Warning content="您确定通过么？" onOk={() => run({data: {customerIds: keys}})}>批量通过</Warning>,
      },
      {
        danger: true,
        key: '3',
        label: <Warning onOk={() => deleteRun({data: {customerIds: keys}})}>批量删除</Warning>,
      },
    ]}
  />;

  const searchForm = () => {
    return <>
      <FormItem
        label="审核结果"
        name="status"
        component={({value, onChange}) => {
          return <AntSelect
            defaultValue="all"
            value={typeof value === 'number' ? value : 'all'}
            options={[{label: '全部', value: 'all'}, {label: '通过', value: 1}, {label: '待审核', value: 0}]}
            onChange={(value) => {
              onChange(value === 'all' ? null : value);
            }}
          />;
        }}
        select
      />
      <FormItem label="提交时间" name="time" component={DatePicker} RangePicker select />
      <FormItem label="企业查询" name="name" component={Input} style={{width: 250}} placeholder="请输入企业名称/统一社会信用代码" />
      <FormItem
        label="管理员查询"
        name="contactName"
        component={Input}
        style={{width: 300}}
        placeholder="请输入管理员账号/姓名/手机号"
      />
    </>;
  };


  const {baseURI} = config;
  const token = cookie.get('jetlink-token');

  return <>
    <Table
      loading={loading || deleteLoading}
      onChange={setKeys}
      selectedRowKeys={keys}
      formSubmit={(values) => {
        if (isArray(values.time).length > 0) {
          values = {...values, startTime: values.time[0], endTime: values.time[1],};
        }
        return values;
      }}
      ref={ref}
      tableKey="customer"
      api={customerList}
      searchButtons={[
        <Dropdown disabled={keys.length === 0} key={1} overlay={menu} placement="bottom">
          <PrimaryButton>批量操作</PrimaryButton>
        </Dropdown>,
        <PrimaryButton key={2} onClick={() => {
          window.open(`${baseURI}/CustomerExcel/export?authorization=${token}&customerIds=${keys}`);
        }}>导出</PrimaryButton>
      ]}
      searchForm={searchForm}
      columns={columns}
      rowKey="customerId"
      actionRender={(text, record) => {
        const open = record.status === 1;
        return <Space>
          <Button
            className={!open && 'bgGreen'}
            type="primary"
            onClick={() => setInfoVisible({...record, detail: open})}>{open ? '详情' : '通过'}
          </Button>
          <PrimaryButton onClick={() => setAskAccount(record)}>修改</PrimaryButton>
          <PrimaryButton onClick={() => setVisible(true)}>数据转发</PrimaryButton>
          <Warning onOk={() => deleteRun({data: {customerIds: [record.customerId]}})}>
            <DangerButton>删除</DangerButton>
          </Warning>
        </Space>;
      }}
    />

    <AccountAsk
      customer
      visibilityToggle={false}
      visible={askAccount}
      onClose={() => {
        ref.current.refresh();
        setAskAccount(null);
      }}
      data={askAccount || {}}
    />

    <Save visible={visible} close={() => setVisible(false)} success={(success) => {
      setVisible(false);
      if (success) {
        ref.current.submit();
      } else {
        ref.current.refresh();
      }
    }} />

    <Info
      data={infoVisible}
      visible={infoVisible}
      close={() => setInfoVisible()}
      success={() => {
        setInfoVisible();
        ref.current.refresh();
      }}
    />
  </>;
};

export default Tenant;


