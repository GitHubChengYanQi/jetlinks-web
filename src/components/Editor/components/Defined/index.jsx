import React, {useState} from 'react';
import {Button, Checkbox, Col, Divider, Input, Radio, Row, Space} from 'antd';
import {DeleteOutlined, PlusCircleOutlined} from '@ant-design/icons';
import {useSetState} from 'ahooks';


const definedStyle = {
  margin: 8,
  width: '17%',
  textAlign: 'center'
};

const Defined = ({
  setDefinedInput = () => {
  },
}) => {

  const [values, setValues] = useSetState({array: []});

  const [type, setType] = useState('input');

  const [title, setTitle] = useState();

  const [showTitle, setShowTitle] = useState(false);

  const onChange = () => {
    const array = values.array.filter((item) => {
      return item.defaultValue;
    });
    const defaultValue = array && array[0] && array[0].value;
    const inputTitle = showTitle ? title : '';
    switch (type) {
      case 'input':
        return `${inputTitle} <input type="text" value='${defaultValue || ''}' placeholder='${values.array.map((item) => {
          return item.value;
        }).toString()}' data-title=${title || '文本框'} />`;
      case 'number':
        return `${inputTitle} <input type="number" data-title=${title || '数字框'} />`;
      case 'date':
        return `${inputTitle} <input type="date" data-title=${title || '时间框'} />`;
      case 'img':
        return `${inputTitle} <input type="file" data-title=${title || '图片框'} />`;
      case 'editor':
        return `${inputTitle} <textarea data-title=${title || '编辑器'} ></textarea>`;
      default:
        break;
    }
  };

  const onValuesChange = (index, data) => {
    const array = values.array;
    array[index] = {...array[index], ...data};
    setValues({array});
  };

  setTimeout(() => {
    setDefinedInput(onChange());
  }, 0);


  const show = () => {
    switch (type) {
      case 'input':
        return <>
          <Divider orientation="center">设置标题对应值</Divider>
          {
            values.array.map((item, index) => {
              return <Row key={index} style={{marginBottom: 8}} gutter={24}>
                <Col span={19}>
                  <Input value={item.value} placeholder="请输入标题对应值" onChange={(value) => {
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
                    <Button type="link" danger style={{padding: 0}} onClick={() => {
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
        </>;
      case 'number':
        return <>
          <Divider orientation="center">样式示例</Divider>
        </>;
      case 'date':
        return <>
          <Divider orientation="center">样式示例</Divider>
        </>;
      case 'img':
        return <>
          <Divider orientation="center">样式示例</Divider>
        </>;
      case 'editor':
        return <>
          <Divider orientation="center">样式示例</Divider>
        </>;
      default:
        break;
    }
  };

  return <>
    <div>
      <Radio.Group value={type} style={{width: '100%'}} onChange={(value) => {
        setType(value.target.value);
      }}>
        <Radio.Button value="input" style={definedStyle}>文本框</Radio.Button>
        <Radio.Button value="number" style={definedStyle}>数字框</Radio.Button>
        <Radio.Button value="date" style={definedStyle}>时间框</Radio.Button>
        <Radio.Button value="img" style={definedStyle}>图片框</Radio.Button>
        <Radio.Button value="editor" style={definedStyle}>编辑器</Radio.Button>
      </Radio.Group>
      <Divider orientation="center">设置标题</Divider>
      <Row gutter={24}>
        <Col span={19}>
          <Input value={title} onChange={(value) => {
            setTitle(value.target.value);
          }} placeholder="请输入标题" />
        </Col>
        <Col span={5} style={{padding: 4}}>
          <Space>
            <Checkbox onChange={(value) => {
              setShowTitle(value.target.checked);
            }}>显示标题</Checkbox>
          </Space>
        </Col>
      </Row>
      {show()}
    </div>
  </>;
};

export default Defined;
