import React, {useRef, useState} from 'react';
import {Space, Dropdown, Menu, Input, message, Select as AntSelect} from 'antd';
import moment from 'moment';
import {config} from 'ice';
import cookie from 'js-cookie';
import {createFormActions} from '@formily/antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Save from '@/pages/equipment/InStock/Save';
import Info from '@/pages/equipment/InStock/Info';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import DatePicker from '@/components/DatePicker';
import {
  instockBatchDelete,
  instockDownloadTemplate,
  instockImport,
  instockList
} from '@/pages/equipment/InStock/url';
import {useRequest} from '@/util/Request';
import Select from '@/components/Select';
import BatchImport from '@/components/BatchImport';
import {DangerButton, PrimaryButton} from '@/components/Button';
import {isArray} from '@/util/Tools';
import SelectModle from '@/pages/equipment/OutStock/Save/components/SelectModle';

const formActionsPublic = createFormActions();

const InStock = (
  {
    selectDevice,
    select,
    onChange = () => {
    }
  }
) => {

  const ref = useRef();

  const [saveVisible, setSaveVisible] = useState(false);
  const [batchImport, setBatchImport] = useState(false);

  const [infoVisible, setInfoVisible] = useState();

  const [records, setResords] = useState(selectDevice ? [selectDevice] : []);

  const keys = records.map(item => item.instockId);

  const {loading: deleteLoading, run: deleteRun} = useRequest(instockBatchDelete, {
    manual: true,
    onSuccess: () => {
      setResords([]);
      message.success('删除成功！');
      ref.current.refresh();
    },
    onError: () => message.error('删除失败!')
  });


  const columns = [
    {
      title: '设备状态', dataIndex: 'status', align: 'center', render: (value) => {
        const open = value === 'online';
        return <Render>
          <span className={open ? 'green' : 'close'}>{open ? '在线' : '离线'}</span>
        </Render>;
      }
    },
    {title: '终端备注', dataIndex: 'remarks', align: 'center', render: (text) => <Render text={text}/>},
    {title: '登记名称', dataIndex: 'name', align: 'center', render: (text) => <Render text={text}/>},
    {title: '设备类别', dataIndex: 'categoryName', align: 'center', render: (text) => <Render text={text}/>},
    {title: '设备型号', dataIndex: 'modelName', align: 'center', render: (text) => <Render width={120} text={text}/>},
    {title: '设备MAC地址', dataIndex: 'mac', align: 'center', render: (text) => <Render width={120} text={text}/>},
    {title: '入库批次', dataIndex: 'batch', align: 'center', render: (text) => <Render width={120} text={text}/>},
    {title: '入库人员', dataIndex: 'userName', align: 'center', render: (text) => <Render width={200} text={text}/>},
    {title: '操作时间', dataIndex: 'createTime', align: 'center', render: (text) => <Render width={200} text={text}/>},
    {
      title: '入库时间',
      dataIndex: 'instockTime',
      align: 'center',
      render: (text) => <Render width={200} text={text ? moment(text).format('YYYY-MM-DD') : '-'}/>
    },
  ];


  const inStockMenu = <Menu
    items={[
      {
        key: '1',
        label: '单个入库',
        onClick: () => {
          setSaveVisible(true);
        }
      }, {
        key: '2',
        label: '批量入库',
        onClick: () => {
          setBatchImport(true);
        }
      },
    ]}
  />;

  const menu = <Menu
    items={[
      {
        key: '1',
        label: <Warning onOk={() => deleteRun({data: {inStockIds: keys}})}>批量删除</Warning>,
      },
    ]}
  />;


  const searchForm = () => {
    return <>
      <FormItem label="入库时间" name="time" component={DatePicker} RangePicker/>
      <FormItem label="设备MAC" name="mac" component={Input}/>
      <FormItem label="登记名称" name="name" component={Input}/>
      <FormItem label="设备型号" name="modelId" component={SelectModle}/>
      <FormItem
        label="设备状态"
        name="status"
        component={({value, onChange}) => {
          return <AntSelect
            defaultValue="all"
            value={value || 'all'}
            options={[{label: '全部', value: 'all'}, {label: '在线', value: 'online'}, {label: '离线', value: 'offline'}]}
            onChange={(value) => {
              onChange(value === 'all' ? null : value);
            }}
          />;
        }}
      />
    </>;
  };

  const {baseURI} = config;
  const token = cookie.get('jetlink-token');

  return <>
    <Table
      formActions={formActionsPublic}
      loading={deleteLoading}
      formSubmit={(values) => {
        if (isArray(values.time).length > 0) {
          values = {...values, startTime: values.time[0], endTime: values.time[1],};
        }
        return values;
      }}
      tableKey={select ? null : 'instock'}
      checkedRows={records}
      onChangeRows={(records) => {
        if (select) {
          onChange(records[records.length - 1]);
        }
        setResords(select ? [records[records.length - 1] || {}] : records);
      }}
      noAction={select}
      selectedRowKeys={keys}
      ref={ref}
      searchButtons={select ? null : [
        <Dropdown key={1} overlay={inStockMenu} placement="bottom" trigger={['click', 'hover']}>
          <PrimaryButton>新增入库</PrimaryButton>
        </Dropdown>,
        <Dropdown disabled={keys.length === 0} key={2} overlay={menu} placement="bottom">
          <PrimaryButton>批量操作</PrimaryButton>
        </Dropdown>,
        <PrimaryButton key={3} onClick={() => {
          window.open(`${baseURI}/InStockExcel/export?authorization=${token}&instockIds=${keys}`);
        }}>导出</PrimaryButton>
      ]}
      searchForm={searchForm}
      api={instockList}
      columns={columns}
      rowKey="instockId"
      actionRender={(text, record) => (
        <Space>
          <PrimaryButton onClick={() => {
            setInfoVisible(record);
          }}>详情</PrimaryButton>
          <PrimaryButton onClick={() => {
            setSaveVisible(record);
          }}>编辑</PrimaryButton>
          <Warning onOk={() => deleteRun({data: {inStockIds: [record.instockId]}})}>
            <DangerButton>删除</DangerButton>
          </Warning>
        </Space>
      )}
    />

    <Info visible={infoVisible} onClose={() => setInfoVisible()} data={infoVisible}/>
    <Save data={saveVisible} visible={saveVisible} close={() => setSaveVisible(false)} success={(success) => {
      setSaveVisible(false);
      if (success) {
        ref.current.submit();
      } else {
        ref.current.refresh();
      }
    }}/>
    <BatchImport
      columns={[
        {title: '登记名称', dataIndex: 'name', align: 'center', render: (text) => <Render text={text}/>},
        {title: '设备备注', dataIndex: 'remark', align: 'center', render: (text) => <Render text={text}/>},
        {title: '设备分组', dataIndex: 'classifyName', align: 'center', render: (text) => <Render text={text}/>},
        {title: '设备类别', dataIndex: 'categoryName', align: 'center', render: (text) => <Render text={text}/>},
        {title: '设备型号', dataIndex: 'modelName', align: 'center', render: (text) => <Render text={text}/>},
        {title: '设备MAC地址', dataIndex: 'mac', align: 'center', render: (text) => <Render text={text}/>},
        {title: '物料网卡号', dataIndex: 'cardNumber', align: 'center', render: (text) => <Render text={text}/>},
      ]}
      api={instockImport}
      templeteApi={instockDownloadTemplate}
      title="入库"
      success={() => {
        setBatchImport(false);
        ref.current.refresh();
      }}
      visible={batchImport}
      close={() => setBatchImport(false)}
    />
  </>;
};
export default InStock;
