import React, {useRef, useState} from 'react';
import {Space, Dropdown, Menu, message, Select, Input, Button} from 'antd';
import {config} from 'ice';
import cookie from 'js-cookie';
import {createFormActions} from '@formily/antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Save from './Save';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import DatePicker from '@/components/DatePicker';
import {
  categoryList,
  deviceCategoryDelete,
  deviceCategoryStart,
  deviceCategoryStop
} from '@/pages/equipment/Category/url';
import {useRequest} from '@/util/Request';
import {ActionButton, DangerButton, PrimaryButton} from '@/components/Button';
import {isArray} from '@/util/Tools';
import Modal from '@/components/Modal';
import Model from '@/pages/equipment/Model';
import Firmware from '@/pages/equipment/Firmware';

const formActionsPublic = createFormActions();

const Category = (
  {
    value,
    select,
    onChange = () => {
    }
  }
) => {

  const {baseURI} = config;
  const token = cookie.get('jetlink-token');

  const ref = useRef();
  const modelRef = useRef();

  const [saveVisible, setSaveVisible] = useState();

  const [records, setResords] = useState(value ? [value] : []);

  const keys = records.map(item => item.categoryId);

  const {loading: stopLoading, run: stop} = useRequest(deviceCategoryStop, {
    manual: true,
    onSuccess: () => {
      setResords([]);
      message.success('关闭成功！');
      ref.current.refresh();
    },
    onError: () => message.error('关闭失败!')
  });

  const {loading: startLoading, run: start} = useRequest(deviceCategoryStart, {
    manual: true,
    onSuccess: () => {
      setResords([]);
      message.success('启用成功！');
      ref.current.refresh();
    },
    onError: () => message.error('启用失败!')
  });

  const {loading: deleteLoading, run: deleteRun} = useRequest(deviceCategoryDelete, {
    manual: true,
    onSuccess: () => {
      setResords([]);
      message.success('删除成功！');
      ref.current.refresh();
    },
    onError: () => message.error('删除失败!')
  });


  const columns = [
    {title: '设备类别名称', dataIndex: 'name', align: 'center',},
    {title: '所属设备型号种类', dataIndex: 'modelNum', align: 'center', render: (text) => <Render>{text || 0}</Render>},
    {
      title: '所属设备型号数量',
      dataIndex: '3',
      align: 'center',
      render: (text) => <Render className="green">{text || 0}</Render>
    },
    {
      title: '设备类别状态',
      dataIndex: 'status',
      align: 'center',
      render: (text) => {
        const open = text === '1';
        return <Render>
          <span className={open ? 'green' : 'red'}>{open ? '启用' : '停用'}</span>
        </Render>;
      }
    },
    {
      title: '设备型号',
      align: 'center',
      render: (value, record) => <Render>
        <Button type="link" onClick={() => modelRef.current.open({categoryId: record.categoryId})}>管理设备型号</Button>
      </Render>
    },
    {title: '创建时间', dataIndex: 'createTime', align: 'center', render: (text) => <Render text={text || '--'}/>},
  ];

  const menu = <Menu
    items={[
      {
        key: '1',
        label: <Warning content="您确定启用么？" onOk={() => start({data: {categoryIds: keys}})}>批量启用</Warning>,
      },
      {
        danger: true,
        key: '2',
        label: <Warning content="您确定停用么？" onOk={() => stop({data: {categoryIds: keys}})}>批量停用</Warning>,
      },
      {
        danger: true,
        key: '3',
        label: <Warning onOk={() => {
          deleteRun({data: {categoryIds: keys}});
        }}>批量删除</Warning>,
      },
    ]}
  />;

  const searchForm = () => {
    return <>
      <FormItem label="创建时间" name="time" component={DatePicker} RangePicker/>
      <FormItem
        label="类别状态"
        name="status"
        component={({value, onChange}) => {
          return <Select
            defaultValue="all"
            value={value || 'all'}
            options={[{label: '全部', value: 'all'}, {label: '启用', value: '1'}, {label: '禁用', value: '0'},]}
            onChange={(value) => {
              onChange(value === 'all' ? null : value);
            }}
          />;
        }}
        select
      />
      <FormItem label="设备类别名称" name="name" component={Input}/>
    </>;
  };

  return <>
    <Table
      formActions={formActionsPublic}
      formSubmit={(values) => {
        if (isArray(values.time).length > 0) {
          values = {...values, startTime: values.time[0], endTime: values.time[1],};
        }
        return values;
      }}
      loading={stopLoading || startLoading || deleteLoading}
      checkedRows={records}
      selectedRowKeys={keys}
      onChangeRows={(records) => {
        if (select) {
          onChange(records[records.length - 1]);
        }
        setResords(select ? [records[records.length - 1] || {}] : records);
      }}
      tableKey={select ? false : 'category'}
      ref={ref}
      searchButtons={select ? null : [
        <PrimaryButton key={1} onClick={() => setSaveVisible({})}>新建设备类别</PrimaryButton>,
        <Dropdown key={2} disabled={keys.length === 0} overlay={menu} placement="bottom">
          <PrimaryButton>批量操作</PrimaryButton>
        </Dropdown>,
        <PrimaryButton key={3} onClick={() => {
          window.open(`${baseURI}/ClassifyExcel/export?authorization=${token}&categoryIds=${keys}`);
        }}>导出</PrimaryButton>
      ]}
      searchForm={searchForm}
      api={categoryList}
      columns={columns}
      rowKey="categoryId"
      noAction={select}
      actionRender={(text, record) => {
        const open = record.status === '1';
        return <Space>
          <PrimaryButton onClick={() => {
            setSaveVisible(record);
          }}>编辑</PrimaryButton>
          <Warning content={`您确定${open ? '停用' : '启用'}么？`} onOk={() => {
            if (open) {
              stop({data: {categoryIds: [record.categoryId]}});
            } else {
              start({data: {categoryIds: [record.categoryId]}});
            }
          }}>
            {open ? <DangerButton>停用</DangerButton> : <ActionButton>启用</ActionButton>}
          </Warning>
          <Warning onOk={() => deleteRun({data: {categoryIds: [record.categoryId]}})}>
            <DangerButton>删除</DangerButton>
          </Warning>
        </Space>;
      }}
    />

    <Save
      success={(success) => {
        setSaveVisible(null);
        if (success) {
          ref.current.submit();
        } else {
          ref.current.refresh();
        }
      }}
      visible={Boolean(saveVisible)}
      close={() => setSaveVisible(null)}
      data={saveVisible || {}}
    />

    <Modal headTitle="设备型号管理" width={1200} ref={modelRef} component={Model}/>
  </>;
};
export default Category;
