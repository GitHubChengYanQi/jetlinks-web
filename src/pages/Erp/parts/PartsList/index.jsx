/**
 * 清单列表页
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React, {useRef, useState} from 'react';
import {backDetails, partsDelete, partsList} from '../PartsUrl';
import Breadcrumb from '@/components/Breadcrumb';
import DelButton from '@/components/DelButton';
import Modal from '@/components/Modal';
import Parts from '@/pages/Erp/parts/PartsEdit/components/Parts';
import EditButton from '@/components/EditButton';
import AddButton from '@/components/AddButton';
import {Card, Table} from 'antd';
import {request, useRequest} from '@/util/Request';

const {Column} = Table;

const PartsList = () => {

  const refAdd = useRef();

  const [dataSource, setDataSource] = useState();

  const [key, setKey] = useState();

  const {refresh} = useRequest(partsList, {
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


  return (
    <Card title={<Breadcrumb />} extra={action()}>
      <Table
        rowKey="key"
        dataSource={dataSource || []}
        expandable={{
          expandedRowKeys: key,
          onExpand: async (expand, record) => {
            if (expand) {
              const res = await request({...backDetails, params: {id: record.skuId}});

              record.children = res && res.map((items, index) => {
                return {
                  key: `${items.skuId}_${items.partsId}`,
                  ...items,
                  children: [],
                };
              });
              if (key){
                setKey([...key,`${record.skuId}_${record.partsId}`]);
              }else {
                setKey([`${record.skuId}_${record.partsId}`]);
              }

            }else {
              const array = key && key.filter((value)=>{
                return value !== `${record.skuId}_${record.partsId}`;
              });
              setKey(array);
            }
          }
        }}
      >
        <Column title="物料" dataIndex="skuId" render={(value, record) => {
          return (
            <>
              {record.spuResult && record.spuResult.name}
              {
                record.backSkus && record.backSkus.map((items, index) => {
                  return <em key={index}>
                    {
                      items.itemAttribute.attribute
                    }
                    :
                    {
                      items.attributeValues.attributeValues
                    }
                  </em>;
                })
              }
            </>
          );
        }} />
        <Column title="清单" dataIndex="partName" />
        <Column title="操作" fixed="right" align="center" width={100} render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                refAdd.current.open(record.partsId);
              }} />
              <DelButton api={partsDelete} value={record.partsId} onSuccess={() => {
                refresh();
              }} />
            </>
          );
        }} />
      </Table>
      <Modal width={1200} title="清单" component={Parts} onSuccess={() => {
        refresh();
        refAdd.current.close();
      }} ref={refAdd} />
    </Card>
  );
};

export default PartsList;
