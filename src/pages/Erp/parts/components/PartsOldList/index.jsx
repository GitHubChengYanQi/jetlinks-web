/**
 * 清单列表页
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React, {useState} from 'react';
import { Table} from 'antd';
import {request, useRequest} from '@/util/Request';
import {backDetails, partsOldList} from '@/pages/Erp/parts/PartsUrl';
import BackSkus from '@/pages/Erp/sku/components/BackSkus';

const {Column} = Table;

const PartsOldList = (props) => {

  const {value,type} = props;

  const [dataSource, setDataSource] = useState();

  const [key, setKey] = useState([]);

  useRequest(partsOldList, {
    defaultParams: {
      data: {
        skuId:value,
        type,
      }
    },
    onSuccess: (res) => {
      const data = res && res.length > 0 && res.map((items) => {
        return {
          key: `${items.skuId}_${items.partsId}`,
          ...items,
          children: [],
        };
      });
      setDataSource(data);
    }
  });


  const table = () => {
    return <Table
      rowKey="key"
      dataSource={dataSource || []}
      pagination={false}
      expandable={{
        expandedRowKeys: key,
        onExpand: async (expand, record) => {
          if (expand) {
            const res = await request({...backDetails, params: {id: record.skuId,partsId:record.id ||record.partsId, type}});

            record.children = res && res.length > 0 && res.map((items) => {
              return {
                key: `${record.partsId}_${items.skuId}_${items.partsId}`,
                ...items,
                children: items.isNull && [],
              };
            });

            if (record.partsDetailId) {
              setKey([...key, `${record.partsId}_${record.skuId}_${record.partsId}`]);
            } else {
              setKey([...key, `${record.skuId}_${record.partsId}`]);
            }

          } else {
            const array = key.filter((item) => {
              if (record.partsDetailId) {
                return item !== `${record.partsId}_${record.skuId}_${record.partsId}`;
              } else {
                return item !== `${record.skuId}_${record.partsId}` && item.indexOf(record.partsId) === -1;
              }
            });
            setKey(array);
          }
        }
      }}
    >
      <Column title="物料" dataIndex="skuId" render={(value, record) => {
        return (<BackSkus record={record} />);
      }} />
      {key.length > 0 && <>
        <Column title="数量" dataIndex="number" render={(value) => {
          return <>{value || null}</>;
        }} />
        <Column title="备注" dataIndex="note" />
      </>}
      <Column title="清单" dataIndex="partName" />
    </Table>;
  };

  return (
    <div style={{padding:16}}>
      {table()}
    </div>
  );
};

export default PartsOldList;
