import React, {useRef, useState} from 'react';
import {Space, Dropdown, Menu, message, Select, Input, Button, Modal, Tag} from 'antd';
import {createFormActions} from '@formily/antd';
import moment from 'moment';
import {useHistory} from 'ice';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import DatePicker from '@/components/DatePicker';
import {useRequest} from '@/util/Request';
import {ActionButton, DangerButton, PrimaryButton} from '@/components/Button';
import {isArray} from '@/util/Tools';
import {
  alarmContactGroupBatchDelete, alarmContactGroupBatchStart, alarmContactGroupBatchStop,
  alarmContactGroupDelete,
  alarmContactGroupList, alarmContactGroupStart, alarmContactGroupStop
} from '@/pages/alarm/ContactGroup/url';
import Note from '@/components/Note';

const formActionsPublic = createFormActions();

const List = () => {

  const ref = useRef();
  const history = useHistory();

  const [records, setResords] = useState([]);
  const [classifies, setClassifies] = useState([]);

  const keys = records.map(item => item.groupId);

  const {loading: batchStopLoading, run: batchStop} = useRequest(alarmContactGroupBatchStop, {
    manual: true,
    onSuccess: () => {
      setResords([]);
      message.success('关闭成功！');
      ref.current.refresh();
    },
  });

  const {loading: batchStartLoading, run: batchStart} = useRequest(alarmContactGroupBatchStart, {
    manual: true,
    onSuccess: () => {
      setResords([]);
      message.success('启用成功！');
      ref.current.refresh();
    },
  });

  const {loading: stopLoading, run: stop} = useRequest(alarmContactGroupStop, {
    manual: true,
    onSuccess: () => {
      setResords([]);
      message.success('关闭成功！');
      ref.current.refresh();
    },
  });

  const {loading: startLoading, run: start} = useRequest(alarmContactGroupStart, {
    manual: true,
    onSuccess: () => {
      setResords([]);
      message.success('启用成功！');
      ref.current.refresh();
    },
  });

  const {loading: deleteLoading, run: deleteRun} = useRequest(alarmContactGroupDelete, {
    manual: true,
    onSuccess: () => {
      setResords([]);
      message.success('删除成功！');
      ref.current.refresh();
    },
  });

  const {loading: batchDeleteLoading, run: batchDeleteRun} = useRequest(alarmContactGroupBatchDelete, {
    manual: true,
    onSuccess: () => {
      setResords([]);
      message.success('删除成功！');
      ref.current.refresh();
    },
  });


  const columns = [
    {title: '报警联系组', dataIndex: 'name', align: 'center',},
    {
      title: '负责区域', dataIndex: 'classifies', align: 'center', render(classifies) {
        return <Button type="link" onClick={() => {
          setClassifies(isArray(classifies));
        }}>
          <Note maxWidth={200}>{isArray(classifies).map(item => item.name)}</Note>
        </Button>;
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      render: (text) => {
        const open = text === 1;
        return <Render>
          <span className={open ? 'green' : 'red'}>{open ? '启用' : '停用'}</span>
        </Render>;
      }
    },
    {title: '创建时间', dataIndex: 'createTime', align: 'center', render: (text) => <Render text={text || '--'}/>},
  ];

  const menu = <Menu
    items={[
      {
        key: '1',
        label: <Warning content="您确定启用么？" onOk={() => batchStart({data: {groupIds: keys}})}>批量启用</Warning>,
      },
      {
        danger: true,
        key: '2',
        label: <Warning content="您确定停用么？" onOk={() => batchStop({data: {groupIds: keys}})}>批量停用</Warning>,
      },
      {
        danger: true,
        key: '3',
        label: <Warning onOk={() => {
          batchDeleteRun({data: {groupIds: keys}});
        }}>批量删除</Warning>,
      },
    ]}
  />;

  const searchForm = () => {
    return <>
      <FormItem label="创建时间" name="time" component={DatePicker} RangePicker/>
      <FormItem label="报警联系组名称" name="name" component={Input}/>
      <FormItem
        label="状态"
        name="status"
        component={({value, onChange}) => {
          return <Select
            defaultValue="all"
            value={typeof value === 'number' ? value : 'all'}
            options={[{label: '全部', value: 'all'}, {label: '启用', value: 1}, {label: '停用', value: 0}]}
            onChange={(value) => {
              onChange(value === 'all' ? null : value);
            }}
          />;
        }}
        select
      />
    </>;
  };

  return <>
    <Table
      formActions={formActionsPublic}
      formSubmit={(values) => {
        if (isArray(values.time).length > 0) {
          values = {
            ...values,
            startTime: moment(values.time[0]).format('YYYY/MM/DD 00:00:00'),
            endTime: moment(values.time[1]).format('YYYY/MM/DD 23:59:59'),
          };
        }
        return values;
      }}
      loading={batchStartLoading || batchStopLoading || deleteLoading || batchDeleteLoading || stopLoading || startLoading}
      checkedRows={records}
      selectedRowKeys={keys}
      onChangeRows={(records) => {
        setResords(records);
      }}
      tableKey="category"
      ref={ref}
      searchButtons={[
        <PrimaryButton key={1} onClick={() => history.push('/alarm/ContactGroupEdit')}>新建报警联系组</PrimaryButton>,
        <Dropdown key={2} disabled={keys.length === 0} overlay={menu} placement="bottom">
          <PrimaryButton>批量操作</PrimaryButton>
        </Dropdown>
      ]}
      searchForm={searchForm}
      api={alarmContactGroupList}
      columns={columns}
      rowKey="groupId"
      actionRender={(text, record) => {
        const open = record.status === 1;
        return <Space>
          <PrimaryButton onClick={() => {
            history.push(`/alarm/ContactGroupEdit?groupId=${record.groupId}`);
          }}>编辑</PrimaryButton>
          <Warning onOk={() => {
            deleteRun({data: {groupId: record.groupId}});
          }}>
            <DangerButton>删除</DangerButton>
          </Warning>
          <Warning content={`您确定${open ? '停用' : '启用'}么？`} onOk={() => {
            if (open) {
              stop({data: {groupId: record.groupId}});
            } else {
              start({data: {groupId: record.groupId}});
            }
          }}>
            {open ? <DangerButton>停用</DangerButton> : <ActionButton>启用</ActionButton>}
          </Warning>
        </Space>;
      }}
    />

    <Modal
      title="负责区域"
      open={classifies.length > 0}
      footer={null}
      onCancel={() => setClassifies([])}
    >
      {
        isArray(classifies).map((item, index) => {
          return <div key={index} style={{padding: 12, display: 'inline-block'}}>
            <Tag key={index} style={{padding: 12}}>{item.name}</Tag>
          </div>;
        })
      }
    </Modal>
  </>;
};
export default List;
