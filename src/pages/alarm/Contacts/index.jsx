import React, {useRef, useState} from 'react';
import {Space, Dropdown, Menu, Input, message, Button, Modal, Tag} from 'antd';
import {createFormActions} from '@formily/antd';
import {config} from 'ice';
import cookie from 'js-cookie';
import moment from 'moment';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import {
  contactDelete,
  contactDeleteBatch,
  contactDownloadTemplate,
  contactExcel,
  contactList
} from '@/pages/alarm/Contacts/url';
import Save from '@/pages/alarm/Contacts/Save';
import {useRequest} from '@/util/Request';
import BatchImport from '@/components/BatchImport';
import {DangerButton, PrimaryButton} from '@/components/Button';
import {isArray} from '@/util/Tools';
import DatePicker from '@/components/DatePicker';
import store from '@/store';
import Select from '@/components/Select';
import {alarmContactFindAll} from '@/pages/alarm/ContactGroup/url';

const formActionsPublic = createFormActions();

export const selectGroup = ({value, onChange}) => {
  return <Select
    placeholder="请选择报警联系组"
    value={value}
    onChange={(value) => {
      onChange(value);
    }}
    api={alarmContactFindAll}
    format={(data) => {
      return isArray(data).map(item => ({value: item.groupId, label: item.name}));
    }}
  />;
};

const Contacts = ({
  noAction,
  checkedRows = [],
  onChange = () => {
  },
  onSuccess = () => {
  }
}) => {

  const [dataSource] = store.useModel('dataSource');

  const customer = dataSource.customer || {};

  const [saveVisible, setSaveVisible] = useState();
  const [batchImport, setBatchImport] = useState(false);

  const [array, setArray] = useState([]);

  const [keys, setKeys] = useState(checkedRows.map(item => item.contactId));

  const ref = useRef();

  const columns = [
    {title: '姓名', dataIndex: 'name', align: 'center', render: (text) => <Render width={150} text={text}/>},
    {
      title: '职务',
      dataIndex: 'job',
      align: 'center',
      render: (text) => <Render text={text}/>
    },
    {
      title: '报警联系组',
      dataIndex: 'groups',
      align: 'center',
      render: (groups) => {
        const names = [...new Set(isArray(groups).map(item => item.name))];
        return <Render>
          <Button type="link" onClick={() => {
            setArray(names);
          }}>
            {names.length === 0 ? '-' : names.filter((item, index) => index < 3).join('、')}
            {names.length > 3 && '...'}
          </Button>
        </Render>;
      }
    },
    {title: '手机号码', dataIndex: 'phone', align: 'center', render: (text) => <Render width={150} text={text}/>},
    {title: '电子邮箱', dataIndex: 'mail', align: 'center', render: (text) => <Render text={text || '-'}/>},
    {
      title: '剩余免费短信条数',
      dataIndex: 'shortMessageNumber',
      align: 'center',
      render: (text) => <Render className="green" text={text || '-'}/>
    },
    {
      title: '是否短信通知', dataIndex: 'shortMessageStatus', align: 'center', render: (text = '0') => {
        const open = text !== '0';
        return <Render>
          <span className={open ? 'green' : 'red'}>{open ? '启用' : '停用'}</span>
        </Render>;
      }
    },
    {title: '创建时间', dataIndex: 'createTime', align: 'center', render: (text) => <Render text={text}/>},
  ];

  const {loading: deleteBatchLoading, run: deleteBatchRun} = useRequest(contactDeleteBatch, {
    manual: true,
    onSuccess: () => {
      setKeys([]);
      message.success('删除成功！');
      ref.current.refresh();
    },
  });

  const {loading: deleteLoading, run: deleteRun} = useRequest(contactDelete, {
    manual: true,
    onSuccess: () => {
      setKeys([]);
      message.success('删除成功！');
      ref.current.refresh();
    },
  });

  const actionMenu = <Menu
    items={[
      {
        key: '1',
        label: <Warning
          content="是否要删除该联系人信息，将解除所有绑定信息!"
          onOk={() => deleteBatchRun({data: {contactIds: keys}})}
        >
          批量删除
        </Warning>,
        danger: true,
      },
    ]}
  />;

  const searchForm = () => {
    return <>
      <FormItem noLabel={noAction} label="姓名" name="name" component={Input}/>
      <FormItem noLabel={noAction} label="职务" name="job" component={Input}/>
      <FormItem noLabel={noAction} label="手机号码" name="phone" component={Input}/>
      <FormItem
        noLabel={noAction}
        label="报警联系组"
        name="groupId"
        component={selectGroup}
      />
      {!noAction && <FormItem label="创建时间" name="time" component={DatePicker} RangePicker/>}
    </>;
  };


  const {baseURI} = config;
  const token = cookie.get('jetlink-token');

  return <>
    <Table
      loading={deleteLoading || deleteBatchLoading}
      formSubmit={(values) => {
        if (isArray(values.time).length > 0) {
          values = {
            ...values, startTime: moment(values.time[0]).format('YYYY/MM/DD 00:00:00'),
            endTime: moment(values.time[1]).format('YYYY/MM/DD 23:59:59'),
          };
        }
        return values;
      }}
      formActions={formActionsPublic}
      selectedRowKeys={keys}
      onChange={setKeys}
      checkedRows={checkedRows}
      onChangeRows={onChange}
      noAction={noAction}
      tableKey={noAction ? '' : 'contact'}
      ref={ref}
      api={contactList}
      searchButtons={noAction ? [] : [
        <PrimaryButton key={1} onClick={() => {
          setSaveVisible({});
        }}>新增联系人</PrimaryButton>,
        <Dropdown disabled={keys.length === 0} key={2} overlay={actionMenu} placement="bottom">
          <PrimaryButton>批量操作</PrimaryButton>
        </Dropdown>,
        <PrimaryButton key={3} disabled={keys.length === 0} onClick={() => {
          window.open(`${baseURI}/ContactExcel/export?authorization=${token}&contactIds=${keys}`);
        }}>导出</PrimaryButton>
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
          <Warning content="是否要删除该联系人信息，将解除所有绑定信息!" onOk={() => deleteRun({data: {contactId: record.contactId}})}>
            <DangerButton>删除</DangerButton>
          </Warning>
        </Space>
      )}
    />

    <Save data={saveVisible} visible={saveVisible} success={(success) => {
      setSaveVisible();
      if (success) {
        ref.current.submit();
      } else {
        ref.current.refresh();
      }
    }} close={() => setSaveVisible()}/>

    <BatchImport
      columns={[
        {title: '姓名', dataIndex: 'name', align: 'center', render: (text) => <Render text={text}/>},
        {title: '职务', dataIndex: 'job', align: 'center', render: (text) => <Render text={text}/>},
        {title: '负责区域', dataIndex: 'classifyName', align: 'center', render: (text) => <Render text={text}/>},
        {title: '手机号', dataIndex: 'phone', align: 'center', render: (text) => <Render text={text}/>},
        {title: '电子邮箱', dataIndex: 'mail', align: 'center', render: (text) => <Render text={text}/>},
      ]}
      templeteApi={contactDownloadTemplate}
      api={contactExcel}
      title="联系人"
      success={() => {
        setBatchImport(false);
        ref.current.refresh();
      }}
      visible={batchImport}
      close={() => setBatchImport(false)}
    />

    <Modal
      title="报警联系组"
      open={array.length > 0}
      footer={null}
      onCancel={() => setArray([])}
    >
      {
        isArray(array).map((item, index) => {
          return <div key={index} style={{padding: 12, display: 'inline-block'}}>
            <Tag key={index} style={{padding: 12}}>{item}</Tag>
          </div>;
        })
      }
    </Modal>
  </>;
};
export default Contacts;
