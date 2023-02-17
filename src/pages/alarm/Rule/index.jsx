import React, {useRef, useState} from 'react';
import {Space, Input, message} from 'antd';
import {useHistory} from 'ice';
import Render from '@/components/Render';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import {PrimaryButton} from '@/components/Button';
import Save from '@/pages/alarm/Rule/Save';
import {alarmDelete} from '@/pages/alarm/url';
import {useRequest} from '@/util/Request';
import {deviceModelList, deviceModelListSelect} from '@/pages/equipment/Model/url';
import Select from '@/components/Select';
import SelectDevice from '@/pages/alarm/Rule/components/SelectDevice';

const Rule = () => {

  const ref = useRef();

  const history = useHistory();

  const [saveVisible, setSaveVisible] = useState();

  const [keys, setKeys] = useState([]);

  const [bindRule, setBindRule] = useState('');

  const columns = [
    {title: '设备型号名称', dataIndex: 'name', align: 'center', render: (text) => <Render text={text}/>},
    {
      title: '所属设备类别',
      dataIndex: 'categoryResult',
      align: 'center',
      render: (categoryResult = {}) => <Render text={categoryResult.name}/>
    },
    {title: '启用报警项数', dataIndex: 'deviceNum', align: 'center', render: (text = '0') => <Render>{text || 0}</Render>},
    {title: '总报警项数', dataIndex: 'deviceNum', align: 'center', render: (text = '0') => <Render>{text || 0}</Render>},
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
      <FormItem label="规则名称" name="name" component={Input}/>
      <FormItem label="设备型号" name="modelId" api={deviceModelListSelect} component={Select}/>
    </>;
  };

  return <>
    <Table
      noRowSelection
      onChange={setKeys}
      selectedRowKeys={keys}
      loading={deleteLoaing}
      ref={ref}
      api={deviceModelList}
      tableKey="model"
      searchForm={searchForm}
      columns={columns}
      rowKey="modelId"
      actionRender={(value, record) => (
        <Space>
          <PrimaryButton onClick={() => {
            history.push(`/alarm/alarmProject?modelId=${record.modelId}`);
          }}>
            编辑
          </PrimaryButton>
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

    <SelectDevice visible={bindRule} close={() => setBindRule('')}/>
  </>;
};
export default Rule;
