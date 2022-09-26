import React, {useState} from 'react';
import {Alert, Card, Col, Form, Input, message, Row, Spin} from 'antd';
import styles from './index.module.less';
import Config from '@/pages/monitor/components/Config';
import {useRequest} from '@/util/Request';
import {alarmAdd, alarmEdit} from '@/pages/alarm/url';
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
    visible,
  }
) => {

  const [data, setData] = useState({});

  const [modelColumns, setModelColumns] = useState([]);

  // const {loading, run} = useRequest(alarmAdd, {
  //   manual: true,
  //   onSuccess: () => {
  //     message.success('保存成功！');
  //     success();
  //   },
  //   onError: () => message.error('保存失败！')
  // });
  //
  // run({
  //   data: {
  //     modelId: data.modelId,
  //     name: data.name,
  //     rules: data.rules,
  //     contactIds: data.contacts.map(item => item.contactId)
  //   }
  // });

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

  return (
    <AntForm
      width="50vw"
      apis={{
        add: alarmAdd,
        edit: alarmEdit,
      }}
      title="报警联系人"
      initialValues={data}
      rowKey="contactId"
      success={success}
      visible={visible}
      close={close}
    >
      <Card className={styles.card} title={<div className={styles.title}>基本信息</div>} bordered={false}>
        <Row>
          <Col span={12}>
            <Form.Item
              initialValue={data?.name}
              key="name"
              label="姓名"
              name="name"
              rules={[
                {required: true, message: '请输入规则名称'},
              ]}
            >
              <Input placeholder="请输入规则名称" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              initialValue={data?.modelId}
              key="modelId"
              label="姓名"
              name="modelId"
              rules={[
                {required: true, message: '请选择设备型号'},
              ]}
            >
              <Select api={deviceModelListSelect} placeholder="请选择设备型号" onChange={(value) => {
                if (value) {
                  getColumns({data: {modelId: value}});
                }
                setData({...data, modelId: value});
              }} />
            </Form.Item>
          </Col>
        </Row>
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
        }} />
      </Card>}
      <Card className={styles.card} title={<div className={styles.title}>报警人员</div>} bordered={false}>
        <AddContacts value={data.contacts} onChange={(contacts) => {
          setData({...data, contacts});
        }} />
      </Card>
    </AntForm>
  );
};

export default Save;
