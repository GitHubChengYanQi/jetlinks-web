import React, {useImperativeHandle, useState} from 'react';
import {Button, Table} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import InputNumber from '@/components/InputNumber';

const AddSkuTable = ({
  value = [],
  onChange = () => {
  }
}, ref) => {

  console.log(value);

  const [keys, setKeys] = useState([]);

  const dataSources = value.map((item, index) => {
    return {
      ...item,
      key: index
    };
  });


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

  const addDataSource = (data) => {
    onChange([...value, ...data]);
  };

  useImperativeHandle(ref, () => ({
    addDataSource,
  }));


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
      <Table.Column title="序号" width={70} align="center" dataIndex="key" render={(value) => {
        return value + 1;
      }} />
      <Table.Column title="物料编号" width={200} dataIndex="coding" />
      <Table.Column title="物料" dataIndex="skuResult" render={(value) => {
        return <SkuResultSkuJsons skuResult={value} />;
      }} />
      <Table.Column title="数量" width={100} dataIndex="number" render={(value,record,index) => {
        return <InputNumber value={value} onChange={(value) => {
          setValue({number:value},index);
        }} />;
      }} />
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

export default React.forwardRef(AddSkuTable);
