import React from 'react';
import {Button, Card, Radio, Select, Space, Tooltip, Typography} from 'antd';
import {useBoolean, useSetState} from 'ahooks';
import {CheckOutlined, DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import DefindSelect from '@/components/Editor/components/DefindSelect';


const style = {
  margin: 8,
  width: '22%',
  textAlign: 'center',
  padding: '8px 16px',
};

const buttonStyle = {
  margin: 8,
  width: '17%',
  textAlign: 'center',
};

export const SkuVar = (
  {
    setTable,
    setButton,
    button,
  }
) => {

  const [skuTable, setSkuTable] = useSetState({
    table: []
  });


  const disabled = (value, type) => {
    const skuTableValue = skuTable.table.map((item) => {
      return item.value;
    });
    switch (type) {
      case 'sku':
        return skuTableValue.includes(value);
      default:
        return false;
    }
  };

  const skuTableOptions = [
    {
      label: '序号',
      value: '序号',
      disabled: disabled('序号', 'sku'),
    },
    {
      label: '物料编码',
      value: '物料编码',
      disabled: disabled('物料编码', 'sku'),
    },
    {
      label: '产品名称',
      value: '产品名称',
      disabled: disabled('产品名称', 'sku'),
    },
    {
      label: '型号规格',
      value: '型号规格',
      disabled: disabled('型号规格', 'sku'),
    },
    {
      label: '品牌厂家',
      value: '品牌厂家',
      disabled: disabled('品牌厂家', 'sku'),
    }, {
      label: '单位',
      value: '单位',
      disabled: disabled('单位', 'sku'),
    },
    {
      label: '数量',
      value: '数量',
      disabled: disabled('数量', 'sku'),
    },
    {
      label: '单价',
      value: '单价',
      disabled: disabled('单价', 'sku'),
    },
    {
      label: '交货日期',
      value: '交货日期',
      disabled: disabled('交货日期', 'sku'),
    }, {
      label: '交货周期',
      value: '交货周期',
      disabled: disabled('交货周期', 'sku'),
    },
    {
      label: '产品备注',
      value: '产品备注',
      disabled: disabled('产品备注', 'sku'),
    },
    {
      label: '发票类型',
      value: '发票类型',
      disabled: disabled('发票类型', 'sku'),
    },
  ];


  return <>
    <ProCard
      className="h2Card"
      headerBordered
      title="基本变量"
      bodyStyle={{padding: 0}}
    >
      <Radio.Group value={button} style={{width: '100%'}} onChange={(value) => {
        setButton(value.target.value);
      }}>
        <Radio.Button value="合计金额小写" style={buttonStyle}>合计金额小写</Radio.Button>
        <Radio.Button value="合计金额大写" style={buttonStyle}>合计金额大写</Radio.Button>
        <Radio.Button value="总价" style={buttonStyle}>总价</Radio.Button>
      </Radio.Group>
    </ProCard>
    <ProCard
      className="h2Card"
      headerBordered
      title="标的物变量"
      bodyStyle={{padding: 0}}
    >
      <div>
        {
          skuTable.table.map((item, index) => {
            return <div key={index} style={{display: 'inline-block', ...buttonStyle}}>
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
                    setButton(null);
                    setTable(array);
                    setSkuTable({table: array});
                  }}
                  danger
                />} key={index}>
                <Select
                  key={index}
                  style={{width: '100%'}}
                  value={item.value}
                  options={skuTableOptions}
                  onChange={(value, option) => {
                    const array = skuTable.table;
                    array[index] = option;
                    setButton(null);
                    setTable(array);
                    setSkuTable({table: array});
                  }} />
              </Tooltip>
            </div>;
          })
        }
        <Button style={{margin: 8}} onClick={() => {
          skuTable.table.push({});
          setSkuTable({...skuTable});
        }}><PlusOutlined /></Button>
      </div>
    </ProCard>
  </>;
};

export const PayVar = (
  {
    setTable,
    setButton,
  }
) => {

  const [payTable, setPayTable] = useSetState({
    table: [{
      label: '付款金额',
      value: '付款金额',
    }]
  });

  const disabled = (value, type) => {
    const payTableValue = payTable.table.map((item) => {
      return item.value;
    });
    switch (type) {
      case 'pay':
        return payTableValue.includes(value);
      default:
        return false;
    }
  };

  const payTableOptions = [
    {
      label: '付款金额',
      value: '付款金额',
      disabled: disabled('付款金额', 'pay'),
    }, {
      label: '日期方式',
      value: '日期方式',
      disabled: disabled('日期方式', 'pay'),
    }, {
      label: '付款比例',
      value: '付款比例',
      disabled: disabled('付款比例', 'pay'),
    }, {
      label: '付款日期',
      value: '付款日期',
      disabled: disabled('付款日期', 'pay'),
    },
  ];


  return <>
    <ProCard
      className="h2Card"
      headerBordered
      title="付款计划"
      bodyStyle={{padding: 0}}
    >
      <div>
        {
          payTable.table.map((item, index) => {
            return <div key={index} style={{display: 'inline-block', ...buttonStyle}}>
              <Tooltip
                placement="top"
                color="#fff"
                title={<Button
                  type="link"
                  disabled={payTable.table.length === 1}
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    const array = payTable.table.filter((item, itemIndex) => {
                      return itemIndex !== index;
                    });
                    setButton(null);
                    setTable(array);
                    setPayTable({table: array});
                  }}
                  danger
                />}
                key={index}
              >
                <Select
                  key={index}
                  style={{width: '100%'}}
                  value={item.value}
                  options={payTableOptions}
                  onChange={(value, option) => {
                    const array = payTable.table;
                    array[index] = option;
                    setButton(null);
                    setTable(array);
                    setPayTable({table: array});
                  }} />
              </Tooltip>
            </div>;
          })
        }
        <Button style={{margin: 8}} onClick={() => {
          payTable.table.push({});
          setPayTable({...payTable});
        }}><PlusOutlined /></Button>
      </div>
    </ProCard>
  </>;
};

export const Contacts = (
  {
    button,
    setButton,
  }) => {

  const grid = (text) => {
    return <Card.Grid style={style}>
      <Typography.Text
        copyable={{
          icon: [<div style={{color: '#000'}}>{text}</div>, <Space>已复制 <CheckOutlined /></Space>],
          text: `\${{${text}}}`,
          tooltips: false,
        }}
        level={5}
        style={{margin: 0}} />
    </Card.Grid>;
  };

  return <div style={{height: '100%'}}>
    <ProCard className="h2Card" title="合同模板变量">
      <Space direction="vertical">
        <ProCard className="h3Card" title="合同关联变量" headerBordered bodyStyle={{padding: 0}}>
          {grid('采购合同编号')}
          {grid('合同签订地点')}
          {grid('合同签订时间')}
          {grid('需方公司名称')}
          {grid('供方公司名称')}
          {grid('提取(交付)地点')}
          {grid('接货人员')}
          {grid('接货人电话')}
        </ProCard>
        <ProCard className="h3Card" title="需方基础变量" headerBordered bodyStyle={{padding: 0}}>
          {grid('需方公司地址')}
          {grid('需方公司电话')}
          {grid('需方公司传真')}
          {grid('需方法人代表')}
          {grid('需方法人电话')}
          {grid('需方委托代表')}
          {grid('需方代表电话')}
          {grid('需方银行账号')}
          {grid('需方开户行号')}
          {grid('需方邮政编码')}
          {grid('需方公司电邮')}
          {grid('需方开户行号')}
          {grid('需方税号')}
          {grid('交货地址')}
          {grid('供货人及电话')}
        </ProCard>
        <ProCard className="h3Card" title="供方基础变量" headerBordered bodyStyle={{padding: 0}}>
          {grid('供方公司地址')}
          {grid('供方公司电话')}
          {grid('供方公司传真')}
          {grid('供方法人代表')}
          {grid('供方法人电话')}
          {grid('供方委托代表')}
          {grid('供方代表电话')}
          {grid('供方开户银行')}
          {grid('供方开户行号')}
          {grid('供方银行账号')}
          {grid('供方邮政编码')}
          {grid('供方公司电邮')}
          {grid('供方税号')}
        </ProCard>

        <DefindSelect setButton={setButton} button={button} grid={grid} />
      </Space>
    </ProCard>
  </div>;
};

export const POSITIONS = ({
  button,
  setButton,
  setTable
}) => {

  const [skuTable, setSkuTable] = useSetState({
    table: [{
      label: '序号',
      value: '序号'
    }]
  });

  const [showSkuTable, {setTrue: showSku, setFalse: closeSku}] = useBoolean();

  const disabled = (value, type) => {
    const skuTableValue = skuTable.table.map((item) => {
      return item.value;
    });
    switch (type) {
      case 'sku':
        return skuTableValue.includes(value);
      default:
        return false;
    }
  };

  const skuTableOptions = [
    {
      label: '序号',
      value: '序号',
      disabled: disabled('序号', 'sku'),
    },
    {
      label: '物料编码',
      value: '物料编码',
      disabled: disabled('物料编码', 'sku'),
    },
    {
      label: '产品名称',
      value: '产品名称',
      disabled: disabled('产品名称', 'sku'),
    },
    {
      label: '型号',
      value: '型号',
      disabled: disabled('型号', 'sku'),
    },
    {
      label: '规格',
      value: '规格',
      disabled: disabled('规格', 'sku'),
    },
  ];

  return <>
    <Radio.Group style={{width: '100%'}} value={button} onChange={(value) => {
      switch (value.target.value) {
        case 'skuTable':
          showSku();
          break;
        default:
          closeSku();
          break;
      }
      setButton(value.target.value);
    }}>
      <ProCard className="h2Card" title="基础变量" bodyStyle={{padding: 0}} headerBordered>
        <Radio.Button value="parent" style={style}>上级库位</Radio.Button>
        <Radio.Button value="name" style={style}>库位名称</Radio.Button>
        <Radio.Button value="qrCode" style={style}>二维码</Radio.Button>
      </ProCard>
      <ProCard
        className="h2Card"
        title="绑定物料"
        headerBordered
        bodyStyle={{padding: 0}}
        extra={<Radio.Button value="skuTable"><Space><PlusOutlined />编辑绑定物料</Space></Radio.Button>}
      >
        {showSkuTable && <div>
          {
            skuTable.table.map((item, index) => {
              return <div key={index} style={{display: 'inline-block', ...style}}>
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
                    style={{width: '100%'}}
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
          <Button style={{marginLeft: 8}} onClick={() => {
            skuTable.table.push({});
            setSkuTable({...skuTable});
          }}><PlusOutlined /></Button>
        </div>}
      </ProCard>
    </Radio.Group>
  </>;
};

export const PHYSICALDETAIL = (
  {
    button,
    setButton
  }) => {
  return <>
    <Radio.Group style={{width: '100%'}} value={button} onChange={(value) => {
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
