/**
 * 清单列表页
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React, {useEffect, useRef} from 'react';
import {Button, Card, Descriptions, Divider, notification, Table as AntTable} from 'antd';
import Form from '@/components/Form';
import {useHistory, useParams} from 'ice';
import {partsAdd, partsDelete, partsDetail, partsEdit, partsList} from '../PartsUrl';
import {useRequest} from '@/util/Request';
import {InternalFieldList as FieldList} from '@formily/antd';
import {DeleteOutlined, PlusOutlined, ScanOutlined} from '@ant-design/icons';
import styled from 'styled-components';
import {spuDelete, spuDetail, spuList} from '@/pages/Erp/spu/spuUrl';
import SpuList from '@/pages/Erp/parts/components/SpuList';
import ProSkeleton from '@ant-design/pro-skeleton';
import {useBoolean} from 'ahooks';
import Table from '@/components/Table';
import Breadcrumb from '@/components/Breadcrumb';
import * as SysField from '@/pages/Erp/spu/spuField';
import ProCard from '@ant-design/pro-card';
import DelButton from '@/components/DelButton';
import Modal from '@/components/Modal';
import PartsEdit from '@/pages/Erp/parts/PartsEdit';
import Drawer from '@/components/Drawer';
import Parts from '@/pages/Erp/parts/PartsEdit/components/Parts';
import SkuList from '@/pages/Erp/sku/skuList';
import EditButton from '@/components/EditButton';
import Code from '@/pages/Erp/spu/components/Code';
import AddButton from '@/components/AddButton';

const {Column} = AntTable;
const {FormItem} = Form;

const PartsList = () => {

  const params = useParams();

  const history = useHistory();

  const ref = useRef();

  const refAdd = useRef();

  const refSku = useRef();

  const tableRef = useRef();

  const {loading, data} = useRequest(spuDetail, {
    manual: !params.cid,
    defaultParams: {
      data: {
        spuId: params.cid
      }
    }
  });

  if (loading) {
    return (<ProSkeleton type="descriptions" />);
  }


  const Type = () => {
    switch (data.productionType) {
      case 0:
        return '自制件';
      case 1:
        return '委派件';
      case 2:
        return '外购件';
      default:
        break;
    }
  };

  const searchForm = () => {
    return (
      <>
        {params.cid && <FormItem name="spu_id" value={params.cid || 111} component={SysField.Name} />}
        <FormItem label='清单名称' name="partName" component={SysField.Name} />
      </>
    );
  };

  const action = () => {

    return (
      <AddButton onClick={()=>{
        refAdd.current.open(false);
      }} />
    );
  };

  const table = () => {
    return <Table
      title={<Breadcrumb />}
      api={partsList}
      bordered={false}
      rowKey="partsId"
      contentHeight
      searchForm={searchForm}
      rowSelection
      actions={action()}
      headStyle={{display: data && 'none'}}
      ref={tableRef}
    >
      <Column title="清单名称" dataIndex="partName" />
      <Column title="操作" fixed="right" align="center" width={270} render={(value, record) => {
        return (
          <>
            <Button type="link" onClick={() => {
              ref.current.open(record.partsId);
            }}>
              查看详情
            </Button>
            <Button type="link" onClick={() => {
              refSku.current.open(record);
            }}>
              关联sku
            </Button>
            <EditButton onClick={() => {
              refAdd.current.open(record.partsId);
            }} />
            <DelButton api={partsDelete} value={record.partsId} onSuccess={() => {
              tableRef.current.refresh();
            }} />
          </>
        );
      }} />
    </Table>;
  };

  return (
    <>
      {data ? <Card title="物料详情" extra={<Button onClick={() => {
        history.goBack();
      }}>返回</Button>}>
        <div style={{maxWidth: 1220, margin: 'auto'}}>
          <ProCard className="h2Card" title="详细信息" headerBordered>
            <Descriptions column={1} bordered labelStyle={{width: 170, textAlign: 'right', backgroundColor: '#fff'}}>
              <Descriptions.Item label={<ScanOutlined />}>
                <Code source="spu" id={data.spuId} />
              </Descriptions.Item>
              <Descriptions.Item label="物料种类名称">
                {data.name}
              </Descriptions.Item>
              <Descriptions.Item label="类目">{data.category ? data.category.categoryName : '--'}</Descriptions.Item>
              <Descriptions.Item label="分类"> {data.spuClassificationResult ? data.spuClassificationResult.name : '--'}</Descriptions.Item>
              <Descriptions.Item label="单位"> {data.unitResult ? data.unitResult.unitName : '--'}</Descriptions.Item>
              <Descriptions.Item label="养护周期"> {data.curingCycle ? `${data.curingCycle}天` : '--'}</Descriptions.Item>
              <Descriptions.Item label="生产类型">{Type()}</Descriptions.Item>
              <Descriptions.Item label="重要程度" width={120}>{data.important || '--'}</Descriptions.Item>
              <Descriptions.Item label="产品重量" width={120}>{data.weight || '--'}</Descriptions.Item>
              <Descriptions.Item label="材质" width={150}>{data.material ? data.material.name : '--'}</Descriptions.Item>
              <Descriptions.Item label="成本">{data.cost || '--'}</Descriptions.Item>
              <Descriptions.Item label="易损">{data.vulnerability === 0 ? '易损' : '不易损'}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
            </Descriptions>
          </ProCard>
          <ProCard className="h2Card" title="清单列表" headerBordered extra={<Button type="primary" onClick={() => {
            refAdd.current.open(false);
          }}>添加清单</Button>}>
            {table()}
          </ProCard>
        </div>
      </Card> : table()}
      <Modal width={1300} title="编辑" component={PartsEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
      <Drawer width={800} title="编辑" component={Parts} onSuccess={() => {
        tableRef.current.refresh();
        refAdd.current.close();
      }} ref={refAdd} spuId={params.cid} />
      <Modal width={800} title="编辑" component={SkuList} onSuccess={() => {
        tableRef.current.refresh();
        refSku.current.close();
      }} ref={refSku} />
    </>
  );
};

export default PartsList;
