import React, {useRef, useState} from 'react';
import {Button, Space, Menu, Dropdown, Input, Select as AntSelect, message} from 'antd';
import {config} from 'ice';
import cookie from 'js-cookie';
import {createFormActions} from '@formily/antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import DatePicker from '@/components/DatePicker';
import AccountAsk from '@/pages/Login/AccountAsk';
import {
  customerDelete,
  customerFrozen,
  customerList,
  customerStart,
  customerThaw
} from '@/pages/systemManage/Tenant/url';
import {DangerButton, PrimaryButton} from '@/components/Button';
import Save from '@/pages/systemManage/Tenant/Save';
import Info from '@/pages/systemManage/Tenant/Info';
import DownloadFile from '@/components/DownloadFile';
import {isArray} from '@/util/Tools';
import {useRequest} from '@/util/Request';
import {JumpLogin} from '@/Config/ApiUrl/system/user';
import store from '@/store';
import {AccountFormat} from '@/pages/systemManage/Account';

const formActionsPublic = createFormActions();

const Tenant = (
  {
    customer,
    select,
    onChange = () => {
    }
  }
) => {

  const [dataSource] = store.useModel('dataSource');

  const currentCustomer = dataSource.customer || {};

  const ref = useRef();

  const [askAccount, setAskAccount] = useState();

  const [visible, setVisible] = useState(false);

  const [infoVisible, setInfoVisible] = useState();

  const [records, setResords] = useState(customer ? [customer] : []);

  const keys = records.map(item => item.customerId);

  const {run: Jump} = useRequest(JumpLogin,
    {
      manual: true,
      onSuccess: (res) => {
        cookie.set('jetlink-token', res);
        window.location.href = window.location.origin;
      }
    });


  const {loading, run} = useRequest(customerStart, {
    manual: true,
    onSuccess: () => {
      setResords([]);
      message.success('通过成功！');
      ref.current.refresh();
    }
  });

  const {loading: deleteLoading, run: deleteRun} = useRequest(customerDelete, {
    manual: true,
    onSuccess: () => {
      setResords([]);
      message.success('删除成功！');
      ref.current.refresh();
    }
  });

  const {loading: frozenLoading, run: frozenRun} = useRequest(customerFrozen, {
    manual: true,
    onSuccess: () => {
      setResords([]);
      message.success('冻结成功！');
      ref.current.refresh();
    }
  });

  const {loading: thawLoading, run: thawRun} = useRequest(customerThaw, {
    manual: true,
    onSuccess: () => {
      setResords([]);
      message.success('冻结成功！');
      ref.current.refresh();
    }
  });

  const columns = [
    {
      title: '审核结果',
      dataIndex: 'status',
      align: 'center',
      render: (text) => {
        const open = text === 1;
        const closeText = (text === -1 ? '停用' : '待审核');
        return <Render>
          <Button
            className={open ? 'green' : 'red'}
            type="link"
          >
            {open ? '通过' : closeText}
          </Button>
        </Render>;
      }
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
    {
      title: '管理员账号',
      dataIndex: 'adminAccount',
      align: 'center',
      render: (text) => <Render text={AccountFormat(text)} />
    },
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
      {!select && <FormItem
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
      />}
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
      formActions={formActionsPublic}
      loading={loading || deleteLoading || frozenLoading || thawLoading}
      checkedRows={records}
      onChangeRows={(records) => {
        if (select) {
          onChange(records[records.length - 1]);
        }
        setResords(select ? [records[records.length - 1] || {}] : records);
      }}
      noAction={select}
      selectedRowKeys={keys}
      formSubmit={(values) => {
        if (isArray(values.time).length > 0) {
          values = {...values, startTime: values.time[0], endTime: values.time[1],};
        }
        return {status: select ? 1 : null, ...values};
      }}
      ref={ref}
      tableKey={select ? null : 'customer'}
      api={customerList}
      searchButtons={select ? null : [
        <PrimaryButton key={0} onClick={() => setAskAccount({})}>新增租户</PrimaryButton>,
        <Dropdown disabled={keys.length === 0} key={1} overlay={menu} placement="bottom">
          <PrimaryButton>批量操作</PrimaryButton>
        </Dropdown>,
        <PrimaryButton disabled={keys.length === 0} key={2} onClick={() => {
          window.open(`${baseURI}/CustomerExcel/export?authorization=${token}&customerIds=${keys}`);
        }}>导出</PrimaryButton>
      ]}
      searchForm={searchForm}
      columns={columns}
      rowKey="customerId"
      actionRender={(text, record) => {
        const open = record.status === 1;
        const frozen = record.status === -1;
        return <Space>
          <Button
            hidden={select || frozen}
            className={!open && 'bgGreen'}
            type="primary"
            onClick={() => setInfoVisible({...record, detail: open})}>{open ? '详情' : '通过'}
          </Button>
          <PrimaryButton onClick={() => setAskAccount(record)}>修改</PrimaryButton>
          <Warning
            disabled={!open || !record.adminId}
            content="确定进入到该账户系统吗？"
            onOk={() => Jump({params: {userId: record.adminId}})}>
            <PrimaryButton disabled={!open}>进入账户</PrimaryButton>
          </Warning>
          <PrimaryButton hidden={currentCustomer.customerId === 0} onClick={() => setVisible(true)}>数据转发</PrimaryButton>
          <Warning
            content={frozen ? '是否启用?' : '是否停用?'}
            onOk={() => frozen ? thawRun({params: {customerId: record.customerId}}) : frozenRun({params: {customerId: record.customerId}})}
          >
            {frozen ? <PrimaryButton className="bgGreen">启用</PrimaryButton> : <DangerButton>停用</DangerButton>}
          </Warning>
          <Warning content="是否永久删除?" onOk={() => deleteRun({data: {customerIds: [record.customerId]}})}>
            <DangerButton>删除</DangerButton>
          </Warning>
        </Space>;
      }}
    />

    <AccountAsk
      login
      customer={askAccount?.customerId}
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
      detail={infoVisible?.detail}
      customerId={infoVisible?.customerId}
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


