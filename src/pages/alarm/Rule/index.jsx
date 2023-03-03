import React, {useRef, useState} from 'react';
import {Space, message, Drawer} from 'antd';
import {useHistory} from 'ice';
import Render from '@/components/Render';
import Table from '@/components/Table';
import FormItem from '@/components/Table/components/FormItem';
import {PrimaryButton} from '@/components/Button';
import Save from '@/pages/alarm/Rule/Save';
import {alarmDelete} from '@/pages/alarm/url';
import {useRequest} from '@/util/Request';
import {deviceModelList} from '@/pages/equipment/Model/url';
import Select from '@/components/Select';
import SelectDevice from '@/pages/alarm/Rule/components/SelectDevice';
import SelectModle from '@/pages/equipment/OutStock/Save/components/SelectModle';
import {categoryFindAll} from '@/pages/equipment/Category/url';
import AlarmProject from '@/pages/alarm/AlarmProject';
import {CloseOutlined} from '@ant-design/icons';

const Rule = () => {

  const ref = useRef();

  const history = useHistory();

  const [saveVisible, setSaveVisible] = useState();

  const [keys, setKeys] = useState([]);

  const [bindRule, setBindRule] = useState('');

  const [model, setModel] = useState({});

  const columns = [
    {title: '设备型号名称', dataIndex: 'name', align: 'center', render: (text) => <Render text={text}/>},
    {
      title: '所属设备类别',
      dataIndex: 'categoryResult',
      align: 'center',
      render: (categoryResult = {}) => <Render text={categoryResult.name}/>
    },
    {
      title: '启用报警项数',
      dataIndex: 'startAlarmNum',
      align: 'center',
      render: (text = '0') => <Render>{text || 0}</Render>
    },
    {title: '总报警项数', dataIndex: 'totalAlarmNum', align: 'center', render: (text = '0') => <Render>{text || 0}</Render>},
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
      <FormItem
        label="设备类别"
        name="categoryId"
        api={categoryFindAll}
        format={(data = []) => data.map(item => ({label: item.name, value: item.categoryId}))}
        component={Select}
      />
      <FormItem label="设备型号" name="modelId" component={SelectModle}/>
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
            setModel(record);
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

    <Drawer
      destroyOnClose
      title='报警项设置'
      closable={false}
      extra={<CloseOutlined onClick={() => setModel({})}/>}
      width="70vw"
      open={model.modelId}
      onClose={() => setModel({})}
    >
      <AlarmProject modelId={model.modelId} modelName={model.name} categoryName={model.categoryResult?.name}/>
    </Drawer>

    <SelectDevice visible={bindRule} close={() => setBindRule('')}/>
  </>;
};
export default Rule;
