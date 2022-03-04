import React, {useState} from 'react';
import {Button, Table} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {ApplyNumber, BrandId, Date, Note, Time} from '@/pages/Purshase/purchaseAsk/purchaseAskField';
import {useRequest} from '@/util/Request';
import {brandIdSelect} from '@/pages/Erp/stock/StockUrl';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';

const AddSkuTable = ({
  onChange = () => {
  },
  value = [],
}) => {

  const [keys, setKeys] = useState([]);

  const {data} = useRequest(brandIdSelect);

  const dataSources = value.map((item, index) => {
    return {
      ...item,
      key: index
    };
  });


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
  };


  return <>
    <Table
      dataSource={dataSources}
      pagination={false}
      rowKey="key"
      footer={() => {
        return <>
          <Button
            type="link"
            disabled={keys.length === 0}
            icon={<DeleteOutlined />}
            onClick={() => {
              const ids = keys.map((item) => {
                return item.skuId;
              });
              const array = value.filter((item) => {
                return !ids.includes(item.skuId);
              });
              onChange(array);
              setKeys([]);
            }}
            danger
          >
            批量删除
          </Button>
        </>;
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
      <Table.Column title="序号" width={80} align="center" dataIndex="key" render={(value) => {
        return value + 1;
      }} />
      <Table.Column title="物料编号" width={200} dataIndex="coding" />
      <Table.Column title="物料" width={600} dataIndex="skuResult" render={(value) => {
        return <SkuResultSkuJsons skuResult={value} />;
      }} />
      <Table.Column title="品牌" width={300} dataIndex="skuId" render={(skuId, record, index) => {
        return <>
          <BrandId
            data={data}
            value={getValue(index).brandId || 0}
            onChange={(value) => {
              setValue({brandId: value}, index);
            }} />
        </>;
      }} />
      <Table.Column title="申请数量" width={100} dataIndex="applyNumber" render={(value, record, index) => {
        return <ApplyNumber
          value={value}
          onChange={(value) => {
            setValue({applyNumber: value}, index);
          }}
        />;
      }} />
      <Table.Column title="交付日期" width={200} dataIndex="deliveryDate" render={(value, record, index) => {
        return <Date
          value={value}
          onChange={(value) => {
            setValue({deliveryDate: value}, index);
          }}
        />;
      }} />
      <Table.Column title="交付时间" width={200} dataIndex="deliveryTime" render={(value, record, index) => {
        return <Time
          value={value}
          onChange={(value) => {
            setValue({deliveryTime: value}, index);
          }}
        />;
      }} />
      <Table.Column title="备注" width={500} dataIndex="note" render={(value, record, index) => {
        return <Note
          value={getValue(index).note}
          onChange={(value) => {
            setValue({note: value.target.value}, index);
          }}
        />;
      }} />

      <Table.Column />
      <Table.Column title="操作" dataIndex="skuId" align="center" width={100} render={(value, record, index) => {
        return <><Button
          type="link"
          icon={<DeleteOutlined />}
          onClick={() => {
            const array = dataSources.filter((item) => {
              return item.key !== index;
            });
            onChange(array);
          }}
          danger
        /></>;
      }} />

    </Table>
  </>;
};

export default AddSkuTable;
