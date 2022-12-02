import React, {useState} from 'react';
import {Table, Select, Button, InputNumber} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import style from '@/components/Table/index.module.less';
import Section from '@/pages/monitor/components/Config/components/Section';
import {PrimaryButton} from '@/components/Button';
import Warning from '@/components/Warning';
import {isArray} from '@/util/Tools';
import Fileds from '@/pages/monitor/components/Config/components/Fileds';

const Config = ({
  show,
  modelColumns = [],
  value,
  onChange = () => {
  },
}) => {

  const [dataSource, setDataSource] = useState(value || []);

  const dataSourceChange = (newData = {}, key) => {
    const newDataSource = dataSource.map((item, index) => {
      if (index === key) {
        return {...item, ...newData};
      }
      return item;
    });
    onChange(newDataSource);
    setDataSource(newDataSource);
  };

  const columns = [
    {
      title: '属性字段',
      dataIndex: 'field',
      align: 'center',
      render: (text = [], record) => {
        return <Fileds
          show={show}
          value={text}
          array={isArray(record.infoModelColumns).length > 0 ? record.infoModelColumns : [modelColumns]}
          onChange={(fileds, option) => {
            const boolean = option.conditionType === 'boolean';
            dataSourceChange({
              field: fileds,
              ...option,
              children: null,
              alarmCondition: boolean ? '7' : null,
              value: null
            }, record.key);
          }}
        />;
      }
    }, {
      title: '报警条件',
      dataIndex: 'alarmCondition',
      align: 'center',
      width: 150,
      render: (text, record) => {
        const boolean = record.conditionType === 'boolean';
        if (!boolean && isArray(record.conditions).length === 0) {
          return '暂无条件';
        }

        const options = boolean ? [
          {label: '=', value: '7'}
        ] : record.conditions.map(item => ({label: item.symbol, value: item.condition, title: item.title}));

        return <Select
          bordered={!show}
          open={show ? false : undefined}
          suffixIcon={show && null}
          placeholder="请选择条件"
          style={{width: 100}}
          value={text}
          options={options}
          onChange={(alarmCondition, option) => {
            switch (alarmCondition) {
              case '7':
                dataSourceChange({alarmCondition, alarmConditionName: option.label, value: null}, record.key);
                break;
              default:
                dataSourceChange({alarmCondition, alarmConditionName: option.label, value: null}, record.key);
                break;
            }
          }} />;
      }
    }, {
      title: '报警值',
      dataIndex: 'value',
      align: 'center',
      width: 350,
      render: (text, record) => {
        if (!record.alarmCondition) {
          return '请选择条件';
        }
        const {trueText, falseText, trueValue, falseValue} = record;
        const showText = (text === trueValue ? trueText : falseText);
        if (record.alarmConditionName === '~') {
          return show ? <>{[record.minNum, record.maxNum].join('~')}</> :
            <Section value={[record.minNum, record.maxNum]} onChange={(value = []) => {
              dataSourceChange({minNum: value[0], maxNum: value[1]}, record.key);
            }} />;
        }
        switch (record.alarmCondition) {
          case '7':
            return show ? showText : <Select
              bordered={!show}
              open={show ? false : undefined}
              suffixIcon={show && null}
              placeholder="请选择对应值"
              value={text}
              style={{width: 100}}
              options={[{label: trueText, value: trueValue}, {label: falseText, value: falseValue}]}
              onChange={(value) => {
                dataSourceChange({value}, record.key);
              }}
            />;
          default:
            return show ? text : <InputNumber
              style={{width: 230}}
              value={text}
              placeholder="请输入报警值"
              onChange={(value) => {
                dataSourceChange({value}, record.key);
              }}
            />;
        }
      }
    },
  ];

  if (!show) {
    columns.push({
      align: 'center',
      width: 50,
      render: (text, record) => {
        return <Warning onOk={() => {
          const newData = dataSource.filter((item, index) => record.key !== index);
          setDataSource(newData);
          onChange(newData);
        }}>
          <Button type="link" danger style={{padding: 0}}><DeleteOutlined /></Button>
        </Warning>;
      }
    });
  }

  return <>
    <Table
      pagination={false}
      bordered
      onHeaderRow={() => {
        return {
          className: style.headerRow
        };
      }}
      columns={columns}
      dataSource={dataSource.map((item, index) => ({...item, key: index}))}
      rowKey="key"
      footer={show ? null : () => {
        return <PrimaryButton ghost onClick={() => {
          setDataSource([...dataSource, {}]);
        }}>增加报警配置</PrimaryButton>;
      }}
    />
  </>;
};

export default Config;
