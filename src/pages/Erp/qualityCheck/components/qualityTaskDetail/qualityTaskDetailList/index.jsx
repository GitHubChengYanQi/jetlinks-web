/**
 * 质检任务详情列表页
 *
 * @author
 * @Date 2021-11-16 09:54:41
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Col, Descriptions, Row, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {qualityTaskDetailDelete, qualityTaskDetailList} from '../qualityTaskDetailUrl';
import QualityTaskDetailEdit from '../qualityTaskDetailEdit';
import * as SysField from '../qualityTaskDetailField';
import ProCard from '@ant-design/pro-card';
import Code from '@/pages/Erp/spu/components/Code';
import Details from '@/pages/Erp/qualityCheck/components/Details';
import {useRequest} from '@/util/Request';
import {qualityTaskBackInkind, qualityTaskList} from '@/pages/Erp/qualityCheck/components/qualityTask/qualityTaskUrl';
import {createFormActions} from '@formily/antd';

const {Column} = AntTable;
const {FormItem} = Form;

const formActionsPublic = createFormActions();

const QualityTaskDetailList = ({value}) => {


  const ref = useRef(null);
  const tableRef = useRef(null);
  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }} />
      </>
    );
  };

  const searchForm = () => {
    return (
      <>
        <FormItem label="主表id" name="qualityTaskId" value={value.qualityTaskId} component={SysField.QualityTaskId} />
      </>
    );
  };


  return (
    <div style={{padding: 24}}>
      <ProCard className="h2Card" title="基本信息" headerBordered>
        <Row gutter={24}>
          <Col span={16}>
            <Descriptions column={1} bordered labelStyle={{width: 120}}>
              <Descriptions.Item label="编号"> {value.coding}</Descriptions.Item>
              <Descriptions.Item label="类型">{value.type}</Descriptions.Item>
              <Descriptions.Item label="负责人">{value.userName}</Descriptions.Item>
              <Descriptions.Item label="备注">{value.remark}</Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={8}>
            <Code source="quality" id={value.qualityTaskId} image codeWidth={210} />
          </Col>
        </Row>
      </ProCard>

      <ProCard className="h2Card" title="质检清单" headerBordered>
        <Table
          formActions={formActionsPublic}
          headStyle={{display: 'none'}}
          api={qualityTaskDetailList}
          rowKey="qualityTaskDetailId"
          contentHeight
          rowSelection
          noPagination
          searchForm={searchForm}
          actions={actions()}
          ref={tableRef}
        >
          <Column title="物料" dataIndex="skuId" render={(value, record) => {

            return <>
              {record.skuResult && record.skuResult.skuName}
              &nbsp;/&nbsp;
              {record.skuResult && record.skuResult.spuResult && record.skuResult.spuResult.name}
              &nbsp;&nbsp;
              <em style={{color: '#c9c8c8', fontSize: 10}}>
                (
                {
                  record.skuResult.skuJsons
                  &&
                  record.skuResult.skuJsons.map((items, index) => {
                    return (
                      <span key={index}>{items.attribute.attribute}：{items.values.attributeValues}</span>
                    );
                  })
                }
                )
              </em>
            </>;

          }} />
          <Column title="供应商 / 品牌" dataIndex="brandId" width={120} render={(value, record) => {
            return <>
              {record.brand && record.brand.brandName}
            </>;
          }} />
          <Column title="质检人" dataIndex="userIds" align="center" render={(value, record) => {
            return <>
              {record.users && record.users.toString()}
            </>;
          }} />
          <Column title="总数量" dataIndex="number" width={100} align="center" />
          <Column title="质检方案" dataIndex="qualityPlanId" render={(value, record) => {
            return <>
              {record.qualityPlanResult && record.qualityPlanResult.planName}
            </>;
          }} />
          <Column />
        </Table>
      </ProCard>

      <ProCard className="h2Card" title="质检详情" headerBordered>
        <Details qualityTaskId={value.qualityTaskId} />
      </ProCard>

      <Drawer width={800} title="编辑" component={QualityTaskDetailEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </div>
  );
};

export default QualityTaskDetailList;
