import React, {useRef} from 'react';
import Table from '@/components/Table';
import {alarmRecordList} from '@/pages/alarm/url';
import Render from '@/components/Render';
import Box from '@/pages/statistical/components/Tenant/components/Box';
import styles from './index.module.less';

const AlarmRecord = () => {

  const ref = useRef();

  const columns = [
    {title: '报警时间', dataIndex: 'alarmTime', align: 'center', render: (text) => <Render width={150} text={text}/>},
    {
      title: '终端备注',
      dataIndex: 'remarks',
      align: 'center',
      render: (text) => <Render text={text}/>
    },
    {title: '登记名称', dataIndex: 'name', align: 'center', render: (text) => <Render text={text}/>},
    {
      title: '报警内容', dataIndex: 'alarmField', align: 'center',
      render: (text) => {
        return <Render>{text || '-'}</Render>;
      }
    }
  ];

  return <Box>
    <div style={{padding: '12px 12px 0'}}>
      <div className={styles.title}>
        设备报警数据
      </div>
      <Table
        ref={ref}
        maxHeight={140}
        // size='small'
        pageSize={50}
        noPagination
        headStyle={{display: 'none'}}
        noRowSelection
        noFooter
        tableTotalClassName={styles.tableTotalClassName}
        tableClassName={styles.tableClassName}
        cardStyle={{
          backgroundColor: 'transparent'
        }}
        bodyStyle={{
          padding: 0,
          backgroundColor: ''
        }}
        format={(data) => {
          const tableBodys = document.getElementsByClassName('ant-table-body');
          if (tableBodys && tableBodys[0]) {
            const tableBody = tableBodys[0];
            const interval = setInterval(() => {
              if (tableBody.scrollTop >= tableBody.scrollHeight - tableBody.clientHeight) {
                clearInterval(interval);
                ref.current?.refresh();
                tableBody.scrollTop = 0;
              } else {
                tableBody.scrollTop = 50 + tableBody.scrollTop;
              }
            }, 1000);
          }
          return data.map((item, index) => ({...item, key: index}));
        }}
        tableKey="record"
        api={alarmRecordList}
        columns={columns}
        rowKey="key"
        noAction
      />
    </div>
  </Box>;
};

export default AlarmRecord;
