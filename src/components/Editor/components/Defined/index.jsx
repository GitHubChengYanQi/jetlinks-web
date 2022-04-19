import React, {useImperativeHandle, useState} from 'react';
import {Button, Checkbox, Col, Divider, Input, Radio, Row, Space} from 'antd';
import {DeleteOutlined, PlusCircleOutlined} from '@ant-design/icons';
import {useSetState} from 'ahooks';
import Editor from '@/components/Editor';


const definedStyle = {
  margin: 8,
  width: '17%',
  textAlign: 'center'
};

const Defined = ({value}, ref) => {

  const [values, setValues] = useSetState({
    array: value.detailResults && value.detailResults.map((item) => {
      return {
        value: item.value,
        isDefault: !!item.isDefault
      };
    }) || []
  });

  const [type, setType] = useState(value.type || 'input');

  const [title, setTitle] = useState(value.name);

  const [showTitle, setShowTitle] = useState(!!value.isHidden);

  const onChange = () => {
    return {
      contractTemplateId: value.contractTemplateId,
      type,
      isHidden: showTitle ? 1 : 0,
      name: title,
      detailParams: values.array.map((item) => {
        return {
          value: item.value,
          isDefault: item.isDefault ? 1 : 0
        };
      })
    };
  };


  const onValuesChange = (index, data) => {
    const array = values.array;
    array[index] = {...array[index], ...data};
    setValues({array});
  };

  useImperativeHandle(ref, () => ({
    save: onChange
  }));


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
                    <Checkbox checked={item.isDefault} onChange={(value) => {
                      const array = values.array.map((item) => {
                        return {
                          ...item,
                          isDefault: false,
                        };
                      });
                      array[index] = {...array[index], isDefault: value.target.checked};
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
              values.array.push({isDefault: values.array.length === 0});
              setValues(values);
            }}
            type="link"
            icon={<PlusCircleOutlined />}>
            增加值
          </Button>
        </>;
      case 'sku':
      case 'pay':
        return <>
          {type === 'sku' && <div>
            <Divider orientation="center">设置合同标的物</Divider>
            <Editor
              change
              value={value.detailResults && value.detailResults[0].value}
              module="contacts"
              onChange={(value) => {
                onValuesChange(0, {value,});
              }} />
          </div>}
          {type === 'pay' && <div>
            <Divider orientation="center">设置付款计划</Divider>
            <Editor
              change
              module="pay"
              value={value.detailResults && value.detailResults[0].value}
              onChange={(value) => {
                onValuesChange(0, {value,});
              }} />
          </div>}
        </>;
      default:
        break;
    }
  };

  return <>
    <div style={{padding: 16}}>
      <Radio.Group value={type} style={{width: '100%'}} onChange={(value) => {
        setType(value.target.value);
      }}>
        <Radio.Button value="input" style={definedStyle}>文本框</Radio.Button>
        <Radio.Button value="number" style={definedStyle}>数字框</Radio.Button>
        <Radio.Button value="date" style={definedStyle}>时间框</Radio.Button>
        <Radio.Button value="img" style={definedStyle}>图片框</Radio.Button>
        <Radio.Button value="editor" style={definedStyle}>编辑器</Radio.Button>
        <Radio.Button value="sku" style={definedStyle}>合同标的物</Radio.Button>
        <Radio.Button value="pay" style={definedStyle}>付款计划</Radio.Button>
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
            <Checkbox checked={showTitle} onChange={(value) => {
              setShowTitle(value.target.checked);
            }}>显示标题</Checkbox>
          </Space>
        </Col>
      </Row>
      {show()}
    </div>
  </>;
};

export default React.forwardRef(Defined);
