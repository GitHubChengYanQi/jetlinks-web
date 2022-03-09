import React from 'react';
import {Button, Divider, Input, Radio, Select, Space, Tooltip} from 'antd';
import {useBoolean, useSetState} from 'ahooks';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';


const style = {
  margin: 8
};

export const Contacts = ({
  button,
  title,
  setTitle,
  setButton,
  setTable,
}) => {


  const [showTitle, {setTrue, setFalse}] = useBoolean();

  const [showSkuTable, {setTrue: showSku, setFalse: closeSku}] = useBoolean();

  const [skuTable, setSkuTable] = useSetState({
    table: [{
      label: '物料名称',
      value: 'spuName'
    }]
  });

  const disabled = (value) => {
    const skuTableValue = skuTable.table.map((item) => {
      return item.value;
    });
    return skuTableValue.includes(value);
  };

  const skuTableOptions = [
    {
      label: '物料编码',
      value: 'coding',
      disabled: disabled('coding'),
    },
    {
      label: '物料名称',
      value: 'spuName',
      disabled: disabled('spuName'),
    },
    {
      label: '规格 / 型号',
      value: 'skuName',
      disabled: disabled('skuName'),
    },
    {
      label: '分类',
      value: 'skuClass',
      disabled: disabled('skuClass'),
    },
    {
      label: '品牌',
      value: 'brand',
      disabled: disabled('brand'),
    },
    {
      label: '数量',
      value: 'skuNumber',
      disabled: disabled('skuNumber'),
    },
    {
      label: '单价',
      value: 'price',
      disabled: disabled('price'),
    },
    {
      label: '交货日期',
      value: 'deliveryDate',
      disabled: disabled('deliveryDate'),
    },
  ];

  return <>
    <Radio.Group value={button} onChange={(value) => {
      switch (value.target.value) {
        case 'input':
        case 'number':
        case 'date':
          setTrue();
          break;
        case 'skuTable':
          showSku();
          break;
        default:
          closeSku();
          setFalse();
          break;
      }
      setButton(value.target.value);
    }}>
      <Radio.Button value="input" style={style}>文本框</Radio.Button>
      <Radio.Button value="number" style={style}>数字框</Radio.Button>
      <Radio.Button value="date" style={style}>时间框</Radio.Button>
      <Radio.Button value="ACustomer" style={style}>甲方客户</Radio.Button>
      <Radio.Button value="BCustomer" style={style}>乙方客户</Radio.Button>
      <Radio.Button value="Acontacts" style={style}>甲方联系人</Radio.Button>
      <Radio.Button value="Bcontacts" style={style}>乙方联系人</Radio.Button>
      <Radio.Button value="APhone" style={style}>甲方电话</Radio.Button>
      <Radio.Button value="BPhone" style={style}>乙方电话</Radio.Button>
      <Radio.Button value="AAddress" style={style}>甲方地址</Radio.Button>
      <Radio.Button value="BAddress" style={style}>乙方地址</Radio.Button>
      <Radio.Button value="skuTable" style={style}>物料清单</Radio.Button>
    </Radio.Group>
    {showTitle && <>
      <Divider>设置标题</Divider>
      <Input placeholder="请输入标题" value={title} onChange={(value) => {
        setTitle(value.target.value);
      }} />
    </>}

    {showSkuTable && <>
      <Divider>设置物料清单</Divider>
      <div>
        {
          skuTable.table.map((item, index) => {
            return <div key={index} style={{display:'inline-block',margin:'0 8px 8px 0'}}>
              <Tooltip
                placement="top"
                color="#fff"
                title={<Button
                  type="link"
                  disabled={skuTable.table.length === 1}
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    const array = skuTable.table.filter((item, itemIndex) => {
                      return itemIndex !== index;
                    });
                    setTable(array);
                    setSkuTable({table: array});
                  }}
                  danger
                />} key={index}>
                <Select
                  key={index}
                  style={{minWidth: 100}}
                  value={item.value}
                  options={skuTableOptions}
                  onChange={(value, option) => {
                    const array = skuTable.table;
                    array[index] = option;
                    setTable(array);
                    setSkuTable({table: array});
                  }} />
              </Tooltip>
            </div>;
          })
        }
        <Button onClick={() => {
          skuTable.table.push({});
          setSkuTable({...skuTable});
        }}><PlusOutlined /></Button>
      </div>
    </>}
  </>;
};

export const POSITIONS = ({
  button,
  setButton
}) => {
  return <>
    <Radio.Group value={button} onChange={(value) => {
      setButton(value.target.value);
    }}>
      <Radio.Button value="parent" style={style}>上级库位</Radio.Button>
      <Radio.Button value="name" style={style}>库位名称</Radio.Button>
      <Radio.Button value="qrCode" style={style}>二维码</Radio.Button>
    </Radio.Group>
  </>;
};

export const PHYSICALDETAIL = ({
  button,
  setButton
}) => {
  return <>
    <Radio.Group value={button} onChange={(value) => {
      setButton(value.target.value);
    }}>
      <Radio.Button style={style} value="name">物料名称</Radio.Button>
      <Radio.Button style={style} value="brand">供应商(品牌)</Radio.Button>
      <Radio.Button style={style} value="number">数量</Radio.Button>
      <Radio.Button style={style} value="qrCode">二维码</Radio.Button>
      <Radio.Button style={style} value="coding">实物编码</Radio.Button>
      <Radio.Button style={style} value="skuCoding">物料编码</Radio.Button>
    </Radio.Group>
  </>;
};
