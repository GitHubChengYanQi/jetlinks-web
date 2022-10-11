import React, {useEffect, useState} from 'react';
import {Alert, Card, Form, Input, message, Spin} from 'antd';
import styles from './index.module.less';
import Config from '@/pages/monitor/components/Config';
import {useRequest} from '@/util/Request';
import {alarmAdd, alarmDetail, alarmEdit} from '@/pages/alarm/url';
import Select from '@/components/Select';
import {deviceModelListSelect} from '@/pages/equipment/Model/url';
import {getColumnByModelId} from '@/pages/monitor/url';
import {isArray} from '@/util/Tools';
import AddContacts from '@/pages/alarm/Rule/Save/components/AddContacts';
import AntForm from '@/components/AntForm';


const Save = (
  {
    close = () => {
    },
    success = () => {
    },
    detail = {},
    visible,
    zIndex,
    modelDisabled,
  }
) => {

  const [data, setData] = useState({});

  const [modelColumns, setModelColumns] = useState([]);

  const {loading: getColumnsLoaing, run: getColumns} = useRequest(getColumnByModelId, {
    manual: true,
    onSuccess: (res) => {
      const array = [];
      isArray(res).forEach(item => {
        if (isArray(item.children).length > 0) {
          item.children.map(childrenItem => array.push({label: childrenItem.title, value: childrenItem.dataIndex}));
        } else {
          array.push({label: item.title, value: item.dataIndex});
        }
      });
      setModelColumns(array);
    },
  });

  const {loading, run} = useRequest(alarmDetail, {
    manual: true,
    onSuccess: (res) => {
      if (res.modelId) {
        getColumns({data: {modelId: res.modelId}});
      }
      setData({...res, rules: res.rulesResults});
    },
  });


  useEffect(() => {
    if (modelDisabled && detail.modelId){
      getColumns({data: {modelId: detail.modelId}});
      setData({modelId: detail.modelId});
    }
    if (!detail.alarmId) {
      return;
    }
    run({
      data: {
        alarmId: detail.alarmId,
      }
    });
  }, [detail.alarmId,detail.modelId]);

  return (
    <AntForm
      zIndex={zIndex}
      labelCol={4}
      afterClose={() => {
        setData({});
      }}
      loading={loading}
      width="50vw"
      apis={{
        add: alarmAdd,
        edit: alarmEdit,
      }}
      title="报警规则"
      initialValues={data}
      rowKey="alarmId"
      success={success}
      visible={visible}
      close={close}
      format={(values) => {
        if (isArray(data.rules).some(item => !item.field || !item.alarmCondition || !item.value)) {
          message.warn('请完善报警规则!');
          return false;
        }
        if (isArray(data.contacts).length === 0) {
          message.warn('请选择报警联系人!');
          return false;
        }
        return {...values, rules: data.rules, contactIds: isArray(data.contacts).map(item => item.contactId)};
      }}
    >
      <Card className={styles.card} title={<div className={styles.title}>基本信息</div>} bordered={false}>
        <Form.Item
          initialValue={detail?.name}
          key="name"
          label="规则名称"
          name="name"
          rules={[
            {required: true, message: '请输入规则名称'},
          ]}
        >
          <Input placeholder="请输入规则名称" onChange={({target: {value}}) => {
            setData({...data, name: value});
          }}/>
        </Form.Item>
        <Form.Item
          initialValue={detail?.modelId}
          key="modelId"
          label="设备型号"
          name="modelId"
          rules={[
            {required: true, message: '请选择设备型号'},
          ]}
        >
          <Select disabled={modelDisabled} api={deviceModelListSelect} placeholder="请选择设备型号" onChange={(value) => {
            if (value) {
              getColumns({data: {modelId: value}});
            }
            setData({...data, modelId: value, rules: []});
          }}/>
        </Form.Item>
      </Card>
      {getColumnsLoaing ? <Spin>
        <Alert
          style={{padding: 32}}
          message="正在加载报警配置数据，请稍后..."
          type="info"
        />
      </Spin> : data.modelId && <Card
        className={styles.card}
        title={<div className={styles.title}>报警配置</div>}
        bordered={false}
      >
        <Config value={data.rules} modelColumns={modelColumns} onChange={(value = []) => {
          setData({...data, rules: value});
        }}/>
      </Card>}
      <Card className={styles.card} title={<div className={styles.title}>报警人员</div>} bordered={false}>
        <AddContacts value={data.contacts} onChange={(contacts) => {
          setData({...data, contacts});
        }}/>
      </Card>
    </AntForm>
  );
};

export default Save;
