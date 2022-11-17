import React, {useState} from 'react';
import {Table, Select, Button, Space, InputNumber} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import style from '@/components/Table/index.module.less';
import Section from '@/pages/monitor/components/Config/components/Section';
import {PrimaryButton} from '@/components/Button';
import Warning from '@/components/Warning';
import Render from '@/components/Render';
import {isArray} from '@/util/Tools';

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

  const getBoolean = (field) => {
    let trueText;
    let falseText;
    let trueValue;
    let falseValue;
    const boolean = isArray(field).find(fieldItem => {
      let type;
      modelColumns.find(item => {
        const object = item.find(item => {
          return item.key === fieldItem;
        });
        if (object?.conditionType) {
          type = object.conditionType;
          trueText = object.trueText;
          falseText = object.falseText;
          trueValue = object.trueValue;
          falseValue = object.falseValue;
          return true;
        }
        return false;
      });
      return type === 'boolean';
    });
    return {
      boolean,
      trueText: trueText || '真',
      falseText: falseText || '假',
      trueValue,
      falseValue,
    };
  };

  const columns = [
    {
      title: '属性字段',
      dataIndex: 'field',
      align: 'center',
      render: (text = [], record) => {
        return <Render>
          <Space>
            {
              modelColumns.map((item, index) => {
                const options = item || [];
                let width = 0;
                switch (modelColumns.length) {
                  case 1:
                    width = 300;
                    break;
                  case 2:
                    width = 200;
                    break;
                  case 3:
                    width = 100;
                    break;
                  default:
                    break;
                }
                return <Select
                  key={index}
                  placeholder="请选择"
                  style={{width}}
                  bordered={!show}
                  open={show ? false : undefined}
                  suffixIcon={show && null}
                  value={text[index]}
                  options={options.map(item => {
                    return {label: item.title, value: item.key};
                  })}
                  onChange={(field, option) => {
                    const title = record.title && record.title.split(' ') || [];
                    const newFild = new Array(modelColumns.length).fill('').map((filedItem, filedIndex) => {
                      if (filedIndex === index) {
                        title[filedIndex] = option.label;
                        return field;
                      }
                      return text[filedIndex];
                    });
                    const {boolean} = getBoolean(newFild);
                    dataSourceChange({
                      field: newFild,
                      title: title.join(' '),
                      booleanType: boolean,
                      alarmCondition: boolean ? '7' : '1',
                      value: undefined,
                    }, record.key);
                  }} />;
              })
            }
          </Space>
        </Render>;
      }
    }, {
      title: '报警条件',
      dataIndex: 'alarmCondition',
      align: 'center',
      width: 150,
      render: (text, record) => {
        const {boolean} = getBoolean(record.field);
        const options = boolean ? [
          {label: '=', value: '7'}
        ] : [
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
            switch (alarmCondition) {
              case '7':
                dataSourceChange({alarmCondition, value: 1}, record.key);
                break;
              default:
                dataSourceChange({alarmCondition,}, record.key);
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
        const {trueText, falseText, trueValue, falseValue} = getBoolean(record.field);
        const showText = (text === trueValue ? trueText : falseText);
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
          case '6':
            return show ? <>{[record.minNum, record.maxNum].join('~')}</> :
              <Section value={[record.minNum, record.maxNum]} onChange={(value = []) => {
                dataSourceChange({minNum: value[0], maxNum: value[1]}, record.key);
              }} />;
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
