/**
 * 清单列表页
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React, {useRef, useState} from 'react';
import AddButton from '@/components/AddButton';
import {Button, Card, Table} from 'antd';
import {request, useRequest} from '@/util/Request';
import {backDetails, oldBackDetails, partsOldList} from '@/pages/Erp/parts/PartsUrl';

const {Column} = Table;

const PartsOldList = (props) => {

  const {value} = props;

  const refAdd = useRef();

  const [dataSource, setDataSource] = useState();

  const [key, setKey] = useState([]);

  const {refresh} = useRequest(partsOldList, {
    defaultParams: {
      data: {
        skuId:value,
      }
    },
    onSuccess: (res) => {
      const data = res && res.map((items, index) => {
        return {
          key: `${items.skuId}_${items.partsId}`,
          ...items,
          children: []
        };
      });
      setDataSource(data);
    }
  });


  const action = () => {

    return (
      <AddButton onClick={() => {
        refAdd.current.open(false);
      }} />
    );
  };

  const table = () => {
    return <Table
      rowKey="key"
      dataSource={dataSource || []}
      expandable={{
        expandedRowKeys: key,
        onExpand: async (expand, record) => {
          if (expand) {
            const res = await request({...oldBackDetails, params: {id: record.skuId,partsId:record.partsId}});

            record.children = res && res.map((items, index) => {
              return {
                key: `${items.skuId}_${items.partsId}`,
                ...items,
                children: [],
              };
            });
            setKey([...key, `${record.skuId}_${record.partsId}`]);

          } else {
            const array = [];
            for (let i = 0; i < key.length; i++) {
              if (key[i] !== `${record.skuId}_${record.partsId}`) {
                array.push(key[i]);
              } else {
                break;
              }
            }

            setKey(array);
          }
        }
      }}
    >
      <Column title="物料" dataIndex="skuId" render={(value, record) => {
        return (
          <>
            {record.spuResult && record.spuResult.name}
            &nbsp;&nbsp;
            (
            {
              record.backSkus
              &&
              record.backSkus.map((items, index) => {
                return <em key={index}>
                  {
                    items.itemAttribute.attribute
                  }
                  ：
                  {
                    items.attributeValues.attributeValues
                  }
                </em>;
              })
            }
            )
          </>
        );
      }} />
      {key.length > 0 && <>
        <Column title="数量" dataIndex="number" render={(value) => {
          return <>{value || null}</>;
        }} />
        <Column title="备注" dataIndex="note" />
      </>}
      <Column title="清单" dataIndex="partName" />
      {/*<Column title="操作" fixed="right" align="center" width={100} render={(value, record) => {*/}
      {/*  return (*/}
      {/*    <>*/}
      {/*      <Button icon={<ClockCircleOutlined />} type="link" />*/}
      {/*    </>*/}
      {/*  );*/}
      {/*}} />*/}
    </Table>;
  };

  return (
    <div style={{padding:16}}>
      {table()}
    </div>
  );
};

export default PartsOldList;
