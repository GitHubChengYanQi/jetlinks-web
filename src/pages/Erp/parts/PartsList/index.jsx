/**
 * 清单列表页
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React, {useRef, useState} from 'react';
import {Button, Card, Table} from 'antd';
import ProCard from '@ant-design/pro-card';
import {ClockCircleOutlined} from '@ant-design/icons';
import {backDetails, partsList} from '../PartsUrl';
import Breadcrumb from '@/components/Breadcrumb';
import Modal from '@/components/Modal';
import EditButton from '@/components/EditButton';
import AddButton from '@/components/AddButton';
import {request, useRequest} from '@/util/Request';
import PartsOldList from '@/pages/Erp/parts/components/PartsOldList';
import PartsEdit from '@/pages/Erp/parts/PartsEdit';

const {Column} = Table;

const PartsList = ({spuId, type = 2}) => {

  const refAdd = useRef();
  const formRef = useRef();
  const refOldList = useRef();

  const [dataSource, setDataSource] = useState();

  const [key, setKey] = useState([]);

  const {loading, refresh} = useRequest(partsList, {
    defaultParams: {
      data: {
        spuId,
        type,
      }
    },
    onSuccess: (res) => {
      const data = res && res.length > 0 && res.map((items) => {
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
      loading={loading}
      rowKey="key"
      dataSource={dataSource || []}
      expandable={{
        expandedRowKeys: key,
        onExpand: async (expand, record) => {
          if (expand) {
            const res = await request({...backDetails, params: {id: record.skuId}});

            record.children = res && res.length > 0 && res.map((items, index) => {
              return {
                key: `${items.skuId}_${items.partsId}`,
                ...items,
                children: items.isNull && [],
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
            {record.spuResult && record.spuResult.spuClassificationResult && record.spuResult.spuClassificationResult.name}
            &nbsp;/&nbsp;
            {record.spuResult && record.spuResult.name}
            &nbsp;&nbsp;
            <em style={{color: '#c9c8c8', fontSize: 10}}>
              (
              {
                record.backSkus
                &&
                record.backSkus.map((items, index) => {
                  return <span key={index}>
                    {items.itemAttribute.attribute}：{items.attributeValues.attributeValues}
                  </span>;
                })
              }
              )
            </em>
          </>
        );
      }} />
      {key.length > 0 && <>
        <Column title="数量" dataIndex="number" render={(value) => {
          return <>{value || null}</>;
        }} />
        <Column title="备注" dataIndex="note" />
      </>}
      <Column title="名称" dataIndex="partName" />
      <Column title="创建时间" dataIndex="createTime" render={(value, record) => {
        return !record.partsDetailId && <>{value}</>;
      }} />
      <Column title="创建人" dataIndex="userResult" render={(value) => {
        return <>{value && value.name}</>;
      }} />

      <Column title="操作" fixed="right" align="center" width={100} render={(value, record) => {
        return record.children &&
          <>
            <EditButton onClick={() => {
              refAdd.current.open(record.id || record.partsId);
            }} />
            <Button icon={<ClockCircleOutlined />} type="link" onClick={() => {
              refOldList.current.open(record.skuId);
            }} />
          </>;
      }} />
    </Table>;
  };

  return (
    <>
      {spuId ?
        <ProCard className="h2Card" title="清单列表" headerBordered extra={action()}>
          {table()}
        </ProCard>
        :
        <Card title={<Breadcrumb />} extra={action()}>
          {table()}
        </Card>}
      <Modal
        width={900}
        type={type}
        title="清单"
        compoentRef={formRef}
        component={PartsEdit}
        onSuccess={() => {
          refresh();
          refAdd.current.close();
        }} ref={refAdd}
        spuId={spuId}
        footer={<>
          <Button type="primary" onClick={() => {
            formRef.current.submit();
          }}>保存</Button>
        </>}
      />

      <Modal width={1200} title="清单" component={PartsOldList} onSuccess={() => {
        refresh();
        refOldList.current.close();
      }} ref={refOldList} spuId={spuId} />
    </>
  );
};

export default PartsList;
