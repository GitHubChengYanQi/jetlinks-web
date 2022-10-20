import React, {useRef, useState} from 'react';
import {Space, Input, message} from 'antd';
import Render from '@/components/Render';
import Warning from '@/components/Warning';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import {DangerButton, PrimaryButton} from '@/components/Button';
import Save from '@/pages/alarm/Rule/Save';
import {alarmDelete, alarmList} from '@/pages/alarm/url';
import {useRequest} from '@/util/Request';
import {deviceModelListSelect} from '@/pages/equipment/Model/url';
import Select from '@/components/Select';

const Rule = () => {

  const ref = useRef();

  const [saveVisible, setSaveVisible] = useState();

  const [keys, setKeys] = useState([]);

  const columns = [
    {title: '规则名称', dataIndex: 'name', align: 'center', render: (text) => <Render width={150} text={text} />},
    {title: '设备型号', dataIndex: 'modelName', align: 'center', render: (text) => <Render text={text} />},
  ];

  const {loading: deleteLoaing, run: deleteRun} = useRequest(alarmDelete, {
    manual: true,
    onSuccess: () => {
      message.success('删除成功！');
      ref.current.refresh();
    },
  });

  const searchForm = () => {
    return <>
      <FormItem label="规则名称" name="name" component={Input} />
      <FormItem label="设备型号" name="modelId" api={deviceModelListSelect} component={Select} />
    </>;
  };

  return <>
    <Table
      onChange={setKeys}
      selectedRowKeys={keys}
      loading={deleteLoaing}
      ref={ref}
      api={alarmList}
      tableKey="rule"
      searchButtons={[
        <PrimaryButton key="1" onClick={() => {
          setSaveVisible({});
        }}>新增规则</PrimaryButton>
      ]}
      searchForm={searchForm}
      columns={columns}
      rowKey="alarmId"
      actionRender={(value, record) => (
        <Space>
          <PrimaryButton onClick={() => {
            setSaveVisible(record);
          }}>
            编辑
          </PrimaryButton>
          <Warning onOk={() => {
            deleteRun({data: {alarmId: record.alarmId}});
          }}>
            <DangerButton>删除</DangerButton>
          </Warning>
        </Space>
      )}
    />

    <Save
      detail={saveVisible || {}}
      visible={saveVisible}
      close={() => setSaveVisible()}
      success={(success) => {
        setSaveVisible();
        if (success) {
          ref.current.submit();
        } else {
          ref.current.refresh();
        }
      }}
    />
  </>;
};
export default Rule;
