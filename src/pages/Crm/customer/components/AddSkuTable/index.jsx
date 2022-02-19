import React, {useImperativeHandle, useState} from 'react';
import {Button, Table} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {BrandId} from '@/pages/Crm/supply/supplyField';

const AddSkuTable = ({
  onChange = () => {
  }
}, ref) => {

  const [keys, setKeys] = useState([]);

  const [dataSource, setDataSource] = useState([]);

  const dataSources = dataSource.map((item, index) => {
    return {
      ...item,
      key: index
    };
  });

  onChange(dataSources);

  const addDataSource = (data) => {
    setDataSource([...dataSource, ...data]);
  };

  const getDataSource = () => {
    return dataSource;
  };

  useImperativeHandle(ref, () => ({
    addDataSource,
    getDataSource,
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
              const array = dataSource.filter((item) => {
                return !ids.includes(item.skuId);
              });
              setDataSource(array);
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
      <Table.Column title="序号" width={70} align="center" dataIndex="key" />
      <Table.Column title="物料编号" width={200} dataIndex="coding" />
      <Table.Column title="物料" width={800} dataIndex="skuResult" />
      <Table.Column title="品牌" width={400} dataIndex="skuId" render={(skuId, record, index) => {
        return <>
          <BrandId
            value={dataSources.filter((item) => {
              return item.key === index;
            })[0].brandIds}
            onChange={(value) => {
              const array = dataSources.map((item) => {
                if (item.key === index) {
                  return {
                    ...item,
                    brandIds: value
                  };
                } else {
                  return item;
                }
              });
              setDataSource(array);
            }} />
        </>;
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
            setDataSource(array);
          }}
          danger
        /></>;
      }} />

    </Table>
  </>;
};

export default React.forwardRef(AddSkuTable);
