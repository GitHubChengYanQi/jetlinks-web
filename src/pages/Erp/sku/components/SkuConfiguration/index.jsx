import React, {useState} from 'react';
import {AutoComplete, Button, Input, Space} from 'antd';
import {useSetState} from 'ahooks';
import {DeleteOutlined} from '@ant-design/icons';

const SkuConfiguration = ({value, onChange, details}) => {

  const [datas, setDatas] = useSetState({data: value || []});
  onChange(datas.data);

  const [visible, setVisible] = useState(-1);

  const optionsValue = (items) => {
    if (!(details && details.tree))
      return [];

    const values = details.tree.filter((item) => {
      return item.k === items.label;
    });
    if (values && values.length > 0) {
      return details.tree && details.tree.filter((item) => {
        return item.k === items.label;
      })[0].v.map((item) => {
        return {
          label: item.name,
          value: item.name,
        };
      });
    } else {
      return [];
    }
  };

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
              名称：
              <AutoComplete
                value={items.label}
                disabled={items.disabled}
                filterOption={(inputValue, option) =>
                  option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                options={[
                  {
                    label: '材质',
                    value: '材质',
                    disabled: datas.data.filter((item) => {
                      return item.label === '材质';
                    }).length > 0
                  },
                  {
                    label: '长',
                    value: '长',
                    disabled: datas.data.filter((item) => {
                      return item.label === '长';
                    }).length > 0
                  },
                  {
                    label: '宽',
                    value: '宽',
                    disabled: datas.data.filter((item) => {
                      return item.label === '宽';
                    }).length > 0
                  },
                  {
                    label: '高',
                    value: '高',
                    disabled: datas.data.filter((item) => {
                      return item.label === '高';
                    }).length > 0
                  },
                  {
                    label: '重量',
                    value: '重量',
                    disabled: datas.data.filter((item) => {
                      return item.label === '重量';
                    }).length > 0
                  },
                  {
                    label: '体积',
                    value: '体积',
                    disabled: datas.data.filter((item) => {
                      return item.label === '体积';
                    }).length > 0
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
              内容：
              <AutoComplete
                options={optionsValue(items)}
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
        value: null,
      });
      setDatas({
        data: array
      });
    }}>添加描述</Button>
  </>;
};

export default SkuConfiguration;
