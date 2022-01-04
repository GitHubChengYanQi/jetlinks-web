import React, {useState} from 'react';
import {AutoComplete, Button, Input, Space} from 'antd';
import {useSetState} from 'ahooks';
import {DeleteOutlined} from '@ant-design/icons';

const SkuConfiguration = ({value, onChange}) => {

  const [datas, setDatas] = useSetState({data: []});
  onChange(datas.data);

  const [visible, setVisible] = useState(-1);

  return <>
    {
      datas.data.map((items, index) => {
        return <div
          key={index}
          onBlur={() => {
          }}
          onFocus={() => {
          }}
          style={{cursor: 'pointer'}}
          onMouseOver={() => {
            setVisible(index);
          }}
          onMouseOut={() => {
            setVisible(-1);
          }}>
          <div style={{backgroundColor: '#f7f8fa', padding: 8}}>
            <Space>
              规格名：
              <AutoComplete
                value={items.label}
                filterOption={(inputValue, option) =>
                  option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                options={[
                  {
                    label: '长',
                    value: '长'
                  },
                  {
                    label: '宽',
                    value: '宽'
                  },
                  {
                    label: '高',
                    value: '高'
                  },
                  {
                    label: '重量',
                    value: '重量'
                  },
                  {
                    label: '体积',
                    value: '体积'
                  },
                ]}
                onChange={(value) => {
                  if (value) {
                    const array = datas.data;
                    array[index] = {...array[index], label: value};
                    setDatas({data: array});
                  } else {
                    const array = datas.data;
                    array[index] = {label: null, value: null};
                    setDatas({data: array});
                  }
                }}
              >
                <Input />
              </AutoComplete>

              <Button type="link" hidden={visible === -1 || visible !== index} style={{padding: 0}} onClick={() => {
                datas.data.splice(index, 1);
                setDatas({data: datas.data});
              }}>
                <DeleteOutlined />
              </Button>
            </Space>
          </div>
          <div style={{padding: 8}}>
            <Space>
              规格值：
              <AutoComplete
                options={[]}
                disabled={!items.label}
                value={items.value}
                onChange={(value) => {
                  const array = datas.data;
                  array[index] = {...array[index], value};
                  setDatas({data: array});
                }}
              >
                <Input />
              </AutoComplete>
            </Space>
          </div>
        </div>;
      })
    }

    <Button onClick={() => {
      const array = datas.data;
      array.push({
        label: null,
        value: null
      });
      setDatas({
        data: array
      });
    }}>添加规格</Button>
  </>;
};

export default SkuConfiguration;
