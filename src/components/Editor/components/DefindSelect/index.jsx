import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Col, Divider, Input, Modal, Radio, Row, Space} from 'antd';
import {DeleteOutlined, PlusCircleOutlined} from '@ant-design/icons';
import {useSetState} from 'ahooks';
import EditButton from '@/components/EditButton';
import styles from '../Module/index.module.less';

const style = {
  margin: 8,
  width: '17%',
  textAlign: 'center'
};


const DefindSelect = ({
  setButton,
  button,
  setDefinedInput = () => {
  },
}) => {

  const [radio, setRadio] = useState();

  const [visible, setVisible] = useState();

  const [values, setValues] = useSetState({array: []});

  const onChange = () => {
    switch (radio) {
      case '运费承担':
      case '运输方式':
      case '提取(交付)地点':
      case '质量标准':
      case '质量要求':
      case '质保起始方式':
        return `<select>${values.array.map((item, index) => {
          return `<option selected='${item.defaultValue}' value='${item.value}' key={index}>${item.value}</option>`;
        })}</select>`;
      case '接货人员':
        return '';
      case '接货人电话':
        return '';
      case '质保周期':
        return <>
        </>;
      case '其他约定事项':
        return '';
      default:
        return null;
    }
  };

  setTimeout(() => {
    setDefinedInput(onChange());
  }, 0);

  useEffect(() => {
    if (button !== 'defindSelect') {
      setRadio(null);
    }
  }, [button]);

  const type = () => {
    switch (radio) {
      case '运费承担':
      case '运输方式':
      case '提取(交付)地点':
      case '质量标准':
      case '质量要求':
      case '质保起始方式':
        return <div style={{minWidth: 700}}>
          <div>
            变量选项
            <EditButton
              style={{float: 'right'}}
              onClick={() => {
                setVisible(true);
              }} />
          </div>
          <Divider style={{margin: 4}} />
          {
            values.array.map((item, index) => {
              return <div key={index} style={{color: item.defaultValue && 'blue'}}>
                {index + 1}. {item.value}
              </div>;
            })
          }
        </div>;
      case '接货人员':
        return '';
      case '接货人电话':
        return '';
      case '质保周期':
        return <>
        </>;
      case '其他约定事项':
        return '';
      default:
        return null;
    }
  };

  const onValuesChange = (index, data) => {
    const array = values.array;
    array[index] = {...array[index], ...data};
    setValues({array});
  };

  return <div>
    <Radio.Group value={radio} onChange={(value) => {
      if (value.target.value !== 'all') {
        setRadio(value.target.value);
        setButton('defindSelect');
        switch (value.target.value) {
          case '运费承担':
            setValues({array: [{value: '供方承担', disabled: true}, {value: '需方自提', disabled: true}]});
            break;
          case '提取(交付)地点':
            setValues({array: []});
            break;
          case '运输方式':
            setValues({
              array: [{value: '汽车运输', disabled: true}, {value: '海路运输', disabled: true}, {
                value: '航空运输',
                disabled: true
              }, {value: '铁路运输', disabled: true}]
            });
            break;
          case '接货人员':
            return '';
          case '接货人电话':
            return '';
          case '质量标准':
            setValues({array: [{value: '按国家标准执行', disabled: true}]});
            break;
          case '质量要求':
            setValues({array: [{value: '供方执行三包', disabled: true}]});
            break;
          case '质保起始方式':
            setValues({
              array: [{value: '无特殊约定', disabled: true}, {value: '产品安装调试后', disabled: true}, {
                value: '产品验收完成后',
                disabled: true
              }]
            });
            break;
          case '质保周期':
            return <>
            </>;
          case '其他约定事项':
            return '<textarea data-title=\'其他约定项目\' ></textarea>';
          default:
            return null;
        }
      }
    }}>
      <Radio.Button value="运费承担" style={style}>运费承担</Radio.Button>
      <Radio.Button value="提取(交付)地点" style={style}>提取(交付)地点</Radio.Button>
      <Radio.Button value="运输方式" style={style}>运输方式</Radio.Button>
      <Radio.Button value="提货人员" style={style}>提货人员</Radio.Button>
      <Radio.Button value="接货人电话" style={style}>接货人电话</Radio.Button>
      <Radio.Button value="质量标准" style={style}>质量标准</Radio.Button>
      <Radio.Button value="质量要求" style={style}>质量要求</Radio.Button>
      <Radio.Button value="质保起始方式" style={style}>质保起始方式</Radio.Button>
      <Radio.Button value="质保周期" style={style}>质保周期</Radio.Button>
      <Radio.Button value="其他约定事项" style={style}>其他约定事项</Radio.Button>
      <Radio className={styles.noRadio} value="all" style={{
        width: '100%',
        margin: 8,
        display: button !== 'defindSelect' && 'none'
      }}>{button === 'defindSelect' && type()}</Radio>
    </Radio.Group>

    <Modal
      width={800}
      visible={visible}
      onOk={() => {
        setVisible(false);
      }}
      onCancel={() => {
        setVisible(false);
      }}
    >
      {
        values.array.map((item, index) => {
          return <Row key={index} style={{marginBottom: 8}} gutter={24}>
            <Col span={19}>
              <Input value={item.value} placeholder="请输入变量" onChange={(value) => {
                onValuesChange(index, {value: value.target.value});
              }} />
            </Col>
            <Col span={5} style={{padding: 4}}>
              <Space>
                <Checkbox checked={item.defaultValue} onChange={(value) => {
                  const array = values.array.map((item) => {
                    return {
                      ...item,
                      defaultValue: false,
                    };
                  });
                  array[index] = {...array[index], defaultValue: value.target.checked};
                  setValues({array});
                }}>
                  默认选项
                </Checkbox>
                <Button disabled={item.disabled} type="link" danger style={{padding: 0}} onClick={() => {
                  const array = values.array.filter((item, itemIndex) => {
                    return itemIndex !== index;
                  });
                  setValues({array});
                }}><DeleteOutlined /></Button>
              </Space>
            </Col>
          </Row>;
        })
      }
      <Button
        onClick={() => {
          values.array.push({defaultValue: values.array.length === 0});
          setValues(values);
        }}
        type="link"
        icon={<PlusCircleOutlined />}>
        增加值
      </Button>
    </Modal>
  </div>;
};

export default DefindSelect;
