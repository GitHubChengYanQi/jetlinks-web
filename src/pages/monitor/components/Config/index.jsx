import React, {useState} from 'react';
import {Input, Table, Select, Button} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import style from '@/components/Table/index.module.less';
import Section from '@/pages/monitor/components/Config/components/Section';
import {PrimaryButton} from '@/components/Button';
import Warning from '@/components/Warning';

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
      render: (text, record) => {
        return <Select
          placeholder="请选择属性字段"
          style={{width: 200}}
          bordered={!show}
          open={show ? false : undefined}
          suffixIcon={show && null}
          value={text}
          options={modelColumns.map(item => {
            const disabled = dataSource.some(dataItem => dataItem.field === item.value);
            return {...item, disabled};
          })}
          onChange={(field, option) => {
            dataSourceChange({field, title: option?.label}, record.key);
          }} />;
      }
    }, {
      title: '报警条件',
      dataIndex: 'alarmCondition',
      align: 'center',
      render: (text, record) => {
        const options = [
          {label: '=', value: '1'},
          {label: '>=', value: '2'},
          {label: '<=', value: '3'},
          {label: '>', value: '4'},
          {label: '<', value: '5'},
          {label: '<>', value: '6'},
        ];
        return <Select
          bordered={!show}
          open={show ? false : undefined}
          suffixIcon={show && null}
          placeholder="请选择条件"
          style={{width: 100}}
          value={text}
          options={options}
          onChange={(alarmCondition) => {
            dataSourceChange({alarmCondition}, record.key);
          }} />;
      }
    }, {
      title: '报警值',
      dataIndex: 'value',
      align: 'center',
      render: (text, record) => {
        if (record.alarmCondition === 6) {
          return show ? <>{text && text.split(',').join('——')}</> :
            <Section value={text ? text.split(',') : []} onChange={(value = []) => {
              dataSourceChange({value: value.join(',')}, record.key);
            }} />;
        }
        return show ? text : <Input
          style={{width: 230}}
          value={text}
          placeholder="请输入报警值"
          onChange={({target: {value}}) => {
            dataSourceChange({value}, record.key);
          }}
        />;
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
        }}>
          <Button type="link" danger style={{padding: 0}}><DeleteOutlined /></Button>
        </Warning>;
      }
    });
  }

  return <>
    <Table
      sticky
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
