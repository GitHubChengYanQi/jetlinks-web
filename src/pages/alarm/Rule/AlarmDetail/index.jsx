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
import {AlarmDetailFormat} from '@/pages/alarm/Rule/Save';

const AlarmDetail = ({
  alarmId,
}) => {

  const [modelColumns, setModelColumns] = useState([]);

  const [data, setData] = useState();

  const {loading: getColumnsLoaing, run: getColumns} = useRequest(getColumnByModelId, {
    manual: true,
    onSuccess: (res) => {
      setModelColumns(isArray(res));
    },
  });

  const {loading} = useRequest({...alarmDetail, data: {alarmId}}, {
    onSuccess: async (res) => {
      let fileds = [];
      if (res.modelId) {
        fileds = await getColumns({data: {modelId: res.modelId}});
      }
      const newData = await AlarmDetailFormat(res, fileds);
      setData(newData);
    },
  });

  if (loading || getColumnsLoaing) {
    return <PageSkeleton />;
  }

  if (!data) {
    return <Empty />;
  }

  return <>
    <Card className={styles.card} title={<div className={styles.title}>基本信息</div>} bordered={false}>
      <Descriptions
        column={3}
        bordered
      >
        <Descriptions.Item label="规则名称">{data.name}</Descriptions.Item>
        <Descriptions.Item label="设备型号">{data.modelName}</Descriptions.Item>
        <Descriptions.Item label="报警条件">{data.andOr ? '全部条件满足' : '任意条件满足'}</Descriptions.Item>
      </Descriptions>
    </Card>

    <Card
      className={styles.card}
      title={<div className={styles.title}>报警配置</div>}
      bordered={false}
    >
      <Config
        show
        modelColumns={modelColumns}
        value={data.rules}
      />
    </Card>
    <Card className={styles.card} title={<div className={styles.title}>报警人员</div>} bordered={false}>
      <AddContacts show value={data.contacts} />
    </Card>
  </>;
};

export default AlarmDetail;
