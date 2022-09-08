import React, {useRef, useState} from 'react';
import {Button, Space, Dropdown, Menu, Input, message, Select as AntSelect} from 'antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Save from '@/pages/equipment/InStock/Save';
import Info from '@/pages/equipment/InStock/Info';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import DatePicker from '@/components/DatePicker';
import {instockDelete, instockList} from '@/pages/equipment/InStock/url';
import {request} from '@/util/Request';
import Select from '@/components/Select';
import {categoryFindAll} from '@/pages/equipment/Category/url';
import {deviceModelListSelect} from '@/pages/equipment/Model/url';

const InStock = () => {

  const ref = useRef();

  const [saveVisible, setSaveVisible] = useState(false);

  const [infoVisible, setInfoVisible] = useState();

  const [keys, setkeys] = useState([]);

  const delConfirm = (instockId) => {
    request({...instockDelete, data: {instockId}}).then((res) => {
      if (res.success) {
        message.success('删除成功!');
        ref.current.submit();
      }
    }).catch(() => message.success('删除失败！'));
  };


  const columns = [
    {
      title: '设备状态', dataIndex: 'status', align: 'center', render: (value) => {
        const open = true || value === '99';
        return <Render>
          <Button type="link" disabled={!open}>{open ? '在线' : '离线'}</Button>
        </Render>;
      }
    },
    {title: '登记名称', dataIndex: 'name', align: 'center', render: (text) => <Render text={text}/>},
    {title: '设备类别', dataIndex: 'categoryName', align: 'center', render: (text) => <Render text={text}/>},
    {title: '设备型号', dataIndex: 'modelName', align: 'center', render: (text) => <Render width={120} text={text}/>},
    {title: '设备MAC地址', dataIndex: 'mac', align: 'center', render: (text) => <Render width={120} text={text}/>},
    {title: '入库人员', dataIndex: 'userName', align: 'center', render: (text) => <Render width={200} text={text}/>},
    {title: '操作时间', dataIndex: 'createTime', align: 'center', render: (text) => <Render width={200} text={text}/>},
    {title: '入库时间', dataIndex: 'instockTime', align: 'center', render: (text) => <Render width={200} text={text}/>},
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      render: (text, record) => (
        <Space>
          <Button ghost type="primary" onClick={() => {
            setInfoVisible(record);
          }}>详情</Button>
          <Warning onOk={() => delConfirm(record.instockId)}>
            <Button danger>删除</Button>
          </Warning>
        </Space>
      ),
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

        }
      },
    ]}
  />;

  const menu = <Menu
    items={[
      {
        key: '1',
        label: <Warning>批量删除</Warning>,
        onClick: () => {

        }
      },
    ]}
  />;


  const searchForm = () => {
    return <>
      <FormItem label="入库时间" name="instockTime" component={DatePicker} RangePicker/>
      <FormItem label="设备MAC" name="mac" component={Input}/>
      <FormItem label="登记名称" name="name" component={Input}/>
      <FormItem
        label="设备类别"
        name="categoryId"
        api={categoryFindAll}
        format={(data = []) => data.map(item => ({label: item.name, value: item.categoryId}))}
        component={Select}
      />
      <FormItem label="设备型号" name="modelId" api={deviceModelListSelect} component={Select}/>
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
      <FormItem label="所属客户" name="6" component={Select}/>
    </>;
  };

  return <>
    <Table
      onChange={setkeys}
      ref={ref}
      searchButtons={[
        <Dropdown key={1} overlay={inStockMenu} placement="bottom">
          <Button>新增入库</Button>
        </Dropdown>,
        <Dropdown disabled={keys.length === 0} key={2} overlay={menu} placement="bottom">
          <Button>批量操作</Button>
        </Dropdown>,
        <Button key={3}>导出</Button>
      ]}
      searchForm={searchForm}
      api={instockList}
      columns={columns}
      rowKey="instockId"
    />

    <Info visible={infoVisible} onClose={() => setInfoVisible()} data={infoVisible}/>
    <Save visible={saveVisible} close={() => setSaveVisible(false)} success={() => {
      setSaveVisible(false);
      ref.current.submit();
    }}/>
  </>;
};
export default InStock;
