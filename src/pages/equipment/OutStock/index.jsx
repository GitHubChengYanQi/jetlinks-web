import React, {useRef, useState} from 'react';
import {Button, Space, Dropdown, Menu, Input, Select as AntSelect, Badge} from 'antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Info from '@/pages/equipment/OutStock/Info';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import {outstockList} from '@/pages/equipment/OutStock/url';
import DatePicker from '@/components/DatePicker';
import {categoryFindAll} from '@/pages/equipment/Category/url';
import Select from '@/components/Select';
import {deviceModelListSelect} from '@/pages/equipment/Model/url';
import Save from '@/pages/equipment/OutStock/Save';
import BatchImport from '@/components/BatchImport';
import {DangerButton, PrimaryButton} from '@/components/Button';

const OutStock = () => {

  const ref = useRef();

  const [saveVisible, setSaveVisible] = useState(false);
  const [batchImport, setBatchImport] = useState(false);

  const [infoVisible, setInfoVisible] = useState();

  const columns = [
    {
      title: '设备状态', dataIndex: 'deviceResult', align: 'center', render: (value = {}) => {
        const open = value.status === '99';
        return <Render>
          <span className={open ? 'green' : 'close'}>{open ? '在线' : '离线'}</span>
        </Render>;
      }
    },
    {
      title: '绑定状态', dataIndex: 'status', align: 'center', render: (value = {}) => {
        const open = value.status === '99';
        return <Render>
          <span className={open ? 'green' : 'red'}>{open ? '已绑定' : '未绑定'}</span>
        </Render>;
      }
    },
    {title: '所属客户', dataIndex: '3', align: 'center', render: (text) => <Render text={text} />},
    {
      title: '终端备注',
      dataIndex: 'deviceResult',
      align: 'center',
      render: (value = {}) => <Render text={value.remarks} />
    },
    {title: '设备名称', dataIndex: 'deviceResult', align: 'center', render: (value = {}) => <Render text={value.name} />},
    {
      title: '设备类别',
      dataIndex: 'deviceResult',
      align: 'center',
      render: (value = {}) => <Render text={value.categoryName} />
    },
    {
      title: '设备型号',
      dataIndex: 'deviceResult',
      align: 'center',
      render: (value = {}) => <Render text={value.modelName} />
    },
    {title: '设备MAC地址', dataIndex: 'deviceResult', align: 'center', render: (value = {}) => <Render text={value.mac} />},
    {title: '出库人员', dataIndex: 'userName', align: 'center', render: (text) => <Render width={200} text={text} />},
    {title: '操作时间', dataIndex: 'createTime', align: 'center', render: (text) => <Render width={200} text={text} />},
    {title: '出库时间', dataIndex: 'outstockTime', align: 'center', render: (text) => <Render width={200} text={text} />},
    {title: '质保时间', dataIndex: '11', align: 'center', render: (text) => <Render width={200} text={text} />},
  ];

  const outStockMenu = <Menu
    items={[
      {
        key: '1',
        label: '单个出库',
        onClick: () => {
          setSaveVisible(true);
        }
      }, {
        key: '2',
        label: '批量出库',
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
        label: <Warning content="您确定解绑么？">批量解绑</Warning>,
        onClick: () => {

        }
      },
    ]}
  />;

  const searchForm = () => {
    return <>
      <FormItem label="出库时间" name="outstockTime" component={DatePicker} RangePicker />
      <FormItem label="设备MAC" name="mac" component={Input} />
      <FormItem label="设备查询" name="name" component={Input} />
      <FormItem
        label="设备类别"
        name="categoryId"
        api={categoryFindAll}
        format={(data = []) => data.map(item => ({label: item.name, value: item.categoryId}))}
        component={Select}
      />
      <FormItem label="设备型号" name="modelId" api={deviceModelListSelect} component={Select} />
      <FormItem label="所属客户" name="6" component={Select} />
      <FormItem
        label="设备状态"
        name="status"
        component={({value, onChange}) => {
          return <AntSelect
            defaultValue="all"
            value={value || 'all'}
            options={[{label: '全部', value: 'all'}, {label: '在线', value: '99'}, {label: '离线', value: '0'}]}
            onChange={(value) => {
              onChange(value === 'all' ? null : value);
            }}
          />;
        }}
      />
      <FormItem
        label="绑定状态"
        name="status"
        component={({value, onChange}) => {
          return <AntSelect
            defaultValue="all"
            value={value || 'all'}
            options={[{label: '全部', value: 'all'}, {label: '已绑定', value: '99'}, {label: '未绑定', value: '0'}]}
            onChange={(value) => {
              onChange(value === 'all' ? null : value);
            }}
          />;
        }}
      />
    </>;
  };

  return <>
    <Table
      searchButtons={[
        <Dropdown key={1} overlay={outStockMenu} placement="bottom">
          <PrimaryButton>新增出库</PrimaryButton>
        </Dropdown>,
        <Dropdown key={2} overlay={menu} placement="bottom">
          <PrimaryButton>批量操作</PrimaryButton>
        </Dropdown>,
        <PrimaryButton key={3}>导出</PrimaryButton>
      ]}
      searchForm={searchForm}
      api={outstockList}
      columns={columns}
      rowKey="outstockId"
      actionRender={(text, record) => (
        <Space>
          <PrimaryButton onClick={() => {
            setInfoVisible(record);
          }}>详情</PrimaryButton>
          <Warning content="您确定解绑么？">
            <DangerButton>解绑</DangerButton>
          </Warning>
        </Space>
      )}
    />

    <Info visible={infoVisible} onClose={() => setInfoVisible()} data={infoVisible} />
    <Save visible={saveVisible} close={() => setSaveVisible(false)} success={() => {
      setSaveVisible();
      ref.current.submit();
    }} />
    <BatchImport
      title="出库"
      success={() => {
        setBatchImport(false);
        ref.current.submit();
      }}
      visible={batchImport}
      close={() => setBatchImport(false)}
    />
  </>;
};
export default OutStock;
