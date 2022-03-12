import React from 'react';
import {Button, Divider, Input, Radio, Select, Tooltip} from 'antd';
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

  const [showPayTable, {setTrue: showPay, setFalse: closePay}] = useBoolean();

  const [skuTable, setSkuTable] = useSetState({
    table: [{
      label: '物料名称',
      value: 'spuName'
    }]
  });

  const [payTable, setPayTable] = useSetState({
    table: [{
      label: '付款金额',
      value: 'detailMoney'
    }]
  });

  const disabled = (value, type) => {
    const skuTableValue = skuTable.table.map((item) => {
      return item.value;
    });
    const payTableValue = payTable.table.map((item) => {
      return item.value;
    });
    switch (type) {
      case 'sku':
        return skuTableValue.includes(value);
      case 'pay':
        return payTableValue.includes(value);
      default:
        return false;
    }
  };

  const skuTableOptions = [
    {
      label: '物料编码',
      value: 'coding',
      disabled: disabled('coding', 'sku'),
    },
    {
      label: '物料名称',
      value: 'spuName',
      disabled: disabled('spuName', 'sku'),
    },
    {
      label: '规格 / 型号',
      value: 'skuName',
      disabled: disabled('skuName', 'sku'),
    },
    {
      label: '分类',
      value: 'skuClass',
      disabled: disabled('skuClass', 'sku'),
    },
    {
      label: '品牌',
      value: 'brand',
      disabled: disabled('brand', 'sku'),
    }, {
      label: '单位',
      value: 'unit',
      disabled: disabled('unit', 'sku'),
    }, {
      label: '总价',
      value: 'totalPrice',
      disabled: disabled('totalPrice', 'sku'),
    },
    {
      label: '数量',
      value: 'skuNumber',
      disabled: disabled('skuNumber', 'sku'),
    },
    {
      label: '单价',
      value: 'price',
      disabled: disabled('price', 'sku'),
    },
    {
      label: '交货日期',
      value: 'deliveryDate',
      disabled: disabled('deliveryDate', 'sku'),
    },
    {
      label: '预购数量',
      value: 'preOrder',
      disabled: disabled('preOrder', 'sku'),
    },
    {
      label: '税率',
      value: 'rate',
      disabled: disabled('rate', 'sku'),
    },
    {
      label: '票据类型',
      value: 'paperType',
      disabled: disabled('rate', 'sku'),
    },
  ];

  const payTableOptions = [
    {
      label: '付款金额',
      value: 'detailMoney',
      disabled: disabled('detailMoney', 'pay'),
    }, {
      label: '日期方式',
      value: 'detailDateWay',
      disabled: disabled('detailDateWay', 'pay'),
    }, {
      label: '付款比例',
      value: 'percentum',
      disabled: disabled('percentum', 'pay'),
    }, {
      label: '款项说明',
      value: 'DetailPayRemark',
      disabled: disabled('DetailPayRemark', 'pay'),
    }, {
      label: '付款日期',
      value: 'DetailPayDate',
      disabled: disabled('DetailPayDate', 'pay'),
    },
  ];

  return <>
    <Radio.Group value={button} onChange={(value) => {
      switch (value.target.value) {
        case 'input':
        case 'number':
        case 'date':
          closeSku();
          setFalse();
          closePay();
          setTrue();
          break;
        case 'skuTable':
          showSku();
          closePay();
          setFalse();
          setTable([{
            label: '物料名称',
            value: 'spuName'
          }]);
          break;
        case 'payTable':
          showPay();
          closeSku();
          setFalse();
          setTable([{
            label: '付款金额',
            value: 'detailMoney'
          }]);
          break;
        default:
          closeSku();
          setFalse();
          closePay();
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
      <Radio.Button value="ABank" style={style}>甲方银行</Radio.Button>
      <Radio.Button value="BBank" style={style}>乙方银行</Radio.Button>
      <Radio.Button value="AAccount" style={style}>甲方银行账号</Radio.Button>
      <Radio.Button value="BAccount" style={style}>乙方银行账号</Radio.Button>
      <Radio.Button value="askCoding" style={style}>采购编号</Radio.Button>
      <Radio.Button value="askDate" style={style}>采购日期</Radio.Button>
      <Radio.Button value="askRemake" style={style}>采购备注</Radio.Button>
      <Radio.Button value="Alegal" style={style}>甲方法定代表人</Radio.Button>
      <Radio.Button value="Blegal" style={style}>乙方法定代表人</Radio.Button>
      <Radio.Button value="ABankNo" style={style}>甲方开户行号</Radio.Button>
      <Radio.Button value="BBankNo" style={style}>乙方开户行号</Radio.Button>
      <Radio.Button value="AFax" style={style}>甲方传真</Radio.Button>
      <Radio.Button value="BFax" style={style}>乙方传真</Radio.Button>
      <Radio.Button value="AZipCOde" style={style}>甲方邮编</Radio.Button>
      <Radio.Button value="BZipCOde" style={style}>乙方传真</Radio.Button>
      <Radio.Button value="ACompanyPhone" style={style}>甲方公司电话</Radio.Button>
      <Radio.Button value="BCompanyPhone" style={style}>乙方公司电话</Radio.Button>
      <Radio.Button value="freight" style={style}>是否含运费</Radio.Button>
      <Radio.Button value="payMethod" style={style}>结算方式</Radio.Button>
      <Radio.Button value="deliveryWay" style={style}>交货方式</Radio.Button>
      <Radio.Button value="deliveryAddress" style={style}>交货地址</Radio.Button>
      {/* <Radio.Button value="payPlan" style={style}>付款计划</Radio.Button> */}
      <Radio.Button value="PaymentRemark" style={style}>财务备注</Radio.Button>
      <Radio.Button value="skuTable" style={style}>物料清单</Radio.Button>
      <Radio.Button value="amount" style={style}>总计</Radio.Button>
      <Radio.Button value="amountStr" style={style}>总计汉字</Radio.Button>
      <Radio.Button value="payTable" style={style}>付款详情</Radio.Button>
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
            return <div key={index} style={{display: 'inline-block', margin: '0 8px 8px 0'}}>
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

    {showPayTable && <>
      <Divider>设置付款详情</Divider>
      <div>
        {
          payTable.table.map((item, index) => {
            return <div key={index} style={{display: 'inline-block', margin: '0 8px 8px 0'}}>
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
                    setTable(array);
                    setPayTable({table: array});
                  }}
                  danger
                />} key={index}>
                <Select
                  key={index}
                  style={{minWidth: 100}}
                  value={item.value}
                  options={payTableOptions}
                  onChange={(value, option) => {
                    const array = payTable.table;
                    array[index] = option;
                    setTable(array);
                    setPayTable({table: array});
                  }} />
              </Tooltip>
            </div>;
          })
        }
        <Button onClick={() => {
          payTable.table.push({});
          setPayTable({...payTable});
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
