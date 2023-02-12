import React, {useEffect, useRef} from 'react';
import {Tooltip} from 'antd';
import {EllipsisOutlined} from '@ant-design/icons';
import Table from '@/components/Table';
import {isArray} from '@/util/Tools';
import {alarmRecordList} from '@/pages/alarm/url';
import Render from '@/components/Render';
import Box from '@/pages/statistical/components/Tenant/components/Box';
import styles from './index.module.less';

const AlarmRecord = () => {

  const ref = useRef();

  const ruleTypes = (ruleConditionJson, max) => {
    return isArray(ruleConditionJson).map((item, index) => {
      if (max) {
        if (index > 2) {
          return <div key={index}/>;
        } else if (index === 2) {
          return <div key={index}>
            <Tooltip color="#fff" title={() => {
              return ruleTypes(ruleConditionJson);
            }}>
              <EllipsisOutlined/>
            </Tooltip>
          </div>;
        }
      }
      let alarmCondition = '';
      switch (item.alarmCondition) {
        case '1':
          alarmCondition = '=';
          break;
        case '2':
          alarmCondition = '>=';
          break;
        case '3':
          alarmCondition = '<=';
          break;
        case '4':
          alarmCondition = '>';
          break;
        case '5':
          alarmCondition = '<';
          break;
        case '6':
          alarmCondition = '';
          break;
        case '7':
          alarmCondition = '=';
          break;
        default:
          break;
      }

      return <div key={index} hidden={!item.protocolValue}>
        <Render className="green" key={index}>
          {/*
          {item.title} {alarmCondition} {item.ruleValue}
          <span hidden={item.alarmCondition === '7'}>,当前值：{item.protocolValue}</span>
          */}
          {item.title}故障
        </Render>
      </div>;
    });
  };

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
      title: '报警内容', dataIndex: 'ruleConditionJson', align: 'center',
      render: (text, record) => {
        let ruleConditionJson = [];
        try {
          ruleConditionJson = JSON.parse(record.ruleConditionJson);
        } catch (e) {
          console.log(e);
        }

        return <Render>{ruleTypes(ruleConditionJson, true)}</Render>;
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
