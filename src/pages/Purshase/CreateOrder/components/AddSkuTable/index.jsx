import React, {useImperativeHandle, useState} from 'react';
import {Button, InputNumber, Table, Select as AntSelect, Space} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {useRequest} from '@/util/Request';
import {brandIdSelect} from '@/pages/Erp/stock/StockUrl';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import Select from '@/components/Select';
import {unitListSelect} from '@/pages/Erp/spu/spuUrl';

const AddSkuTable = ({
  onChange = () => {
  },
  value,
  onAddSku = () => {
  }
}, ref) => {

  const [keys, setKeys] = useState([]);

  const [dataSource, setDataSource] = useState(value && value.map((item) => {
    return {
      ...item,
      skuResult: <SkuResultSkuJsons skuResult={item.skuResult} />,
      coding: item.skuResult && item.skuResult.standard
    };
  }) || []);

  const {data: brandData} = useRequest(brandIdSelect);

  const dataSources = dataSource.map((item, index) => {
    return {
      ...item,
      key: index
    };
  });

  const addDataSource = (data) => {
    onChange([...data]);
    setDataSource([...data]);
  };

  const getDataSource = () => {
    return dataSource;
  };

  useImperativeHandle(ref, () => ({
    addDataSource,
    getDataSource,
  }));

  const getValue = (index) => {
    return dataSources.filter((item) => {
      return item.key === index;
    })[0];
  };

  const setValue = (data, index) => {
    const array = dataSources.map((item) => {
      if (item.key === index) {
        return {
          ...item,
          ...data
        };
      } else {
        return item;
      }
    });
    onChange(array);
    setDataSource(array);
  };


  return <>
    <Table
      dataSource={dataSources}
      pagination={false}
      rowKey="key"
      scroll={{x: 'max-content'}}
      footer={() => {
        return <Space>
          <Button
            onClick={() => {
              onAddSku('sku');
            }}
          >
            添加物料
          </Button>
          <Button
            onClick={() => {
              onAddSku('supplySku');
            }}
          >
            添加供应商关联物料
          </Button>
          <Button
            type="link"
            disabled={keys.length === 0}
            icon={<DeleteOutlined />}
            onClick={() => {
              const ids = keys.map((item) => {
                return item.skuId;
              });
              const array = dataSource.filter((item) => {
                return !ids.includes(item.skuId);
              });
              onChange(array);
              setDataSource(array);
              setKeys([]);
            }}
            danger
          >
            批量删除
          </Button>
        </Space>;
      }}
      rowSelection={{
        selectedRowKeys: keys.map((item) => {
          return item.key;
        }),
        onChange: (keys, record) => {
          setKeys(record);
        }
      }}
    >
      <Table.Column title="序号" width={100} fixed="left" align="center" dataIndex="key" render={(value) => {
        return value + 1;
      }} />
      <Table.Column title="物料编码" width={200} dataIndex="coding" />
      <Table.Column title="物料" dataIndex="skuResult" />
      <Table.Column title="品牌 / 厂家" width={400} dataIndex="defaultBrandResult" render={(value, record, index) => {
        return value
          ||
          <Select placeholder="请选择品牌/厂家" options={brandData || []} value={record.brandId} onChange={(value, option) => {
            setValue({brandId: value, brandResult: option.label}, index);
          }} />;
      }} />
      <Table.Column title="预购数量" width={100} dataIndex="preordeNumber" render={(value) => {
        return value || 0;
      }} />
      <Table.Column title="采购数量" width={120} dataIndex="purchaseNumber" render={(value, record, index) => {
        return <InputNumber
          placeholder="请输入采购数量"
          value={value}
          min={0}
          onChange={(value) => {
            setValue({purchaseNumber: value}, index);
          }}
        />;
      }} />
      <Table.Column title="单位" width={120} dataIndex="unitId" render={(value, record, index) => {
        return <Select
          placeholder="请选择单位"
          api={unitListSelect}
          value={value}
          onChange={(value) => {
            setValue({unitId: value}, index);
          }}
        />;
      }} />
      <Table.Column title="单价" width={120} dataIndex="onePrice" render={(value, record, index) => {
        return <InputNumber
          placeholder="请输入单价"
          precision={2}
          min={0}
          value={value}
          onChange={(value) => {
            setValue({onePrice: value, totalPrice: record.purchaseNumber && (value * record.purchaseNumber)}, index);
          }}
        />;
      }} />
      <Table.Column title="总价" width={120} dataIndex="totalPrice" render={(value, record, index) => {
        return <InputNumber
          placeholder="请输入总价"
          precision={2}
          min={1}
          value={value}
          onChange={(value) => {
            setValue({totalPrice: value, onePrice: record.purchaseNumber && (value / record.purchaseNumber)}, index);
          }}
        />;
      }} />
      <Table.Column title="票据类型" width={120} dataIndex="paperType" render={(value, record, index) => {
        return <AntSelect
          placeholder="请选择票据类型"
          value={value}
          options={[{label: '普票', value: '0'}, {label: '专票', value: '1'}]}
          onChange={(value) => {
            setValue({paperType: value,}, index);
          }}
        />;
      }} />
      <Table.Column title="税率" width={120} dataIndex="rate" render={(value, record, index) => {
        return <InputNumber
          min={1}
          addonAfter="%"
          placeholder="请输入税率"
          max={100}
          value={value}
          onChange={(value) => {
            setValue({rate: value}, index);
          }}
        />;
      }} />
      <Table.Column title="交货期" width={100} dataIndex="deliveryDate" render={(value, record, index) => {
        return <InputNumber
          min={1}
          value={value}
          onChange={(value) => {
            setValue({deliveryDate: value}, index);
          }}
        />;
      }} />

      <Table.Column />
      <Table.Column
        title="操作"
        fixed="right"
        dataIndex="skuId"
        align="center"
        width={100}
        render={(value, record, index) => {
          return <><Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => {
              const array = dataSources.filter((item) => {
                return item.key !== index;
              });
              onChange(array);
              setDataSource(array);
            }}
            danger
          /></>;
        }} />

    </Table>
  </>;
};

export default React.forwardRef(AddSkuTable);
