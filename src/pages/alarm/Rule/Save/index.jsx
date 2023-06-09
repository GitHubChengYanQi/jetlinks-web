import React, {useEffect, useState} from 'react';
import {Alert, Card, Form, Input, message, Spin, Select as AntSelect} from 'antd';
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

export const AlarmDetailFormat = async (res, fileds) => {

  const getModelColumns = (options, key, keys, filedObject, index = 0) => {

    if (!Array.isArray(options)) {
      return false;
    }
    const option = options.find(item => item.key === key);
    if (option) {
      filedObject = {options, option};
    } else {
      options.forEach(item => {
        if (filedObject) {
          return;
        }
        if (item.key === keys[index]) {
          filedObject = getModelColumns(item.children, key, keys, filedObject, index + 1);
        }
      });
    }
    return filedObject || {};
  };

  return {
    ...res,
    rules: isArray(res.rulesResults).map(record => {
      const field = isArray(record.field && record.field.split(','));
      let otherData = {};
      const infoModelColumns = field.map((filed, index) => {
        const {options, option} = getModelColumns(fileds, filed, field);
        if (index === field.length - 1) {
          otherData = option || {};
        }
        return options;
      });
      const alarmCndition = isArray(otherData.conditions).find(item => item.condition === record.alarmCondition);
      return {
        ...record,
        field,
        infoModelColumns,
        ...otherData,
        alarmConditionName: alarmCndition?.symbol,
        alarmConditionTitle: alarmCndition?.title,
        children: null,
      };
    })
  };
};


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
      setModelColumns(isArray(res));
    },
  });

  const {loading, run} = useRequest(alarmDetail, {
    manual: true,
    onSuccess: async (res) => {
      let fileds = [];
      if (res.modelId) {
        fileds = await getColumns({data: {modelId: res.modelId}});
      }

      const newData = await AlarmDetailFormat(res, fileds);

      setData(newData);
    },
  });


  useEffect(() => {
    if (modelDisabled && detail.modelId) {
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
  }, [detail.alarmId, detail.modelId]);

  return (
    <AntForm
      zIndex={zIndex}
      labelCol={4}
      afterClose={() => {
        setData({});
      }}
      loading={loading}
      width="auto"
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
        if (
          isArray(data.rules).length === 0 ||
          isArray(data.rules).some(item =>
            !item.field ||
            !item.alarmCondition ||
            !(typeof item.value === 'number' ? true : (item.value || (typeof item.minNum === 'number' && typeof item.maxNum === 'number' && item.maxNum > item.minNum)))
          )) {
          message.warn('请完善报警规则!');
          return false;
        }
        if (isArray(data.contacts).length === 0) {
          message.warn('请选择报警联系人!');
          return false;
        }
        return {
          ...values,
          rules: isArray(data.rules).map(item => ({...item, field: item.field.toString()})),
          contactIds: isArray(data.contacts).map(item => item.contactId)
        };
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
        <Form.Item
          initialValue={detail?.andOr || 0}
          key="andOr"
          label="报警条件"
          name="andOr"
          rules={[
            {required: true, message: '请选择报警条件'},
          ]}
        >
          <AntSelect placeholder="请选择报警条件" options={[{label: '全部条件满足', value: 1}, {label: '任意条件满足', value: 0}]}/>
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
        <Config detail={detail.alarmId} value={data.rules} modelColumns={modelColumns} onChange={(value = []) => {
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
