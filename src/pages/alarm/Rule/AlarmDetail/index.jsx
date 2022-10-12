import React, {useState} from 'react';
import PageSkeleton from '@ant-design/pro-skeleton';
import {Card, Descriptions, Empty} from 'antd';
import {useRequest} from '@/util/Request';
import {alarmDetail} from '@/pages/alarm/url';
import styles from '@/pages/alarm/Rule/Save/index.module.less';
import Config from '@/pages/monitor/components/Config';
import AddContacts from '@/pages/alarm/Rule/Save/components/AddContacts';
import {getColumnByModelId} from '@/pages/monitor/url';
import {isArray} from '@/util/Tools';

const AlarmDetail = ({
  alarmId,
}) => {

  const [modelColumns, setModelColumns] = useState([]);

  const {loading: getColumnsLoaing, run: getColumns} = useRequest(getColumnByModelId, {
    manual: true,
    onSuccess: (res) => {
      const array = [];
      isArray(res).forEach(item => {
        if (isArray(item.children).length > 0) {
          item.children.map(childrenItem => array.push({label: childrenItem.title, value: childrenItem.dataIndex}));
        } else {
          array.push({label: item.title, value: item.key});
        }
      });
      setModelColumns(array);
    },
  });

  const {loading, data = {}} = useRequest({...alarmDetail, data: {alarmId}}, {
    onSuccess: (res) => {
      getColumns({data: {modelId: res.modelId}});
    }
  });

  if (loading || getColumnsLoaing) {
    return <PageSkeleton/>;
  }

  if (!data) {
    return <Empty/>;
  }


  return <>
    <Card className={styles.card} title={<div className={styles.title}>基本信息</div>} bordered={false}>
      <Descriptions
        column={2}
        bordered
      >
        <Descriptions.Item label="规则名称">{data.name}</Descriptions.Item>
        <Descriptions.Item label="设备型号">{data.modelName}</Descriptions.Item>
      </Descriptions>
    </Card>

    <Card
      className={styles.card}
      title={<div className={styles.title}>报警配置</div>}
      bordered={false}
    >
      <Config show modelColumns={modelColumns} value={data.rulesResults}/>
    </Card>
    <Card className={styles.card} title={<div className={styles.title}>报警人员</div>} bordered={false}>
      <AddContacts show value={data.contacts}/>
    </Card>
  </>;
};

export default AlarmDetail;
