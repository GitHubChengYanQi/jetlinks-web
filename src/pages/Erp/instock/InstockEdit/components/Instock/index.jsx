import React, {useRef, useState} from 'react';
import * as SysField from '@/pages/Erp/instock/InstockField';
import {createFormActions} from '@formily/antd';
import {Button, Col, Descriptions, message, Modal, Row, Space, Table as AntTable} from 'antd';
import Icon from '@/components/Icon';
import Table from '@/components/Table';
import Breadcrumb from '@/components/Breadcrumb';
import {instock, instockEdit} from '@/pages/Erp/instock/InstockUrl';
import Form from '@/components/Form';
import {useRequest} from '@/util/Request';
import ProCard from '@ant-design/pro-card';
import InstockListTable from '@/pages/Erp/instock/InstockList/components/InstockListTable';
import Cascader from '@/components/Cascader';
import {storehousePositionsTreeView} from '@/pages/Erp/storehouse/components/storehousePositions/storehousePositionsUrl';
import Code from '@/pages/Erp/spu/components/Code';

const {Column} = AntTable;
const {FormItem} = Form;

const formActionsPublic = createFormActions();

const Instock = (props) => {

  const {value} = props;

  const [show, setShow] = useState();

  const [position, setPosition] = useState();

  const tableRef = useRef(null);
  const instockRef = useRef(null);

  const [items, setItems] = useState();

  const {run} = useRequest(instockEdit, {
    manual: true, onSuccess: () => {
      setShow(false);
      tableRef.current.submit();
      instockRef.current.tableRef.current.submit();
    }
  });

  const searchForm = () => {

    return (
      <FormItem name="instockOrderId" value={value.instockOrderId} component={SysField.barcode} />
    );
  };


  return (
    <div style={{padding: 24}}>
      <ProCard className="h2Card" title="入库信息" headerBordered>
        <Row gutter={24}>
          <Col span={16}>
            <Descriptions column={1} bordered labelStyle={{width: 120}}>
              <Descriptions.Item label="入库单号"> {value.coding}</Descriptions.Item>
              <Descriptions.Item
                label="入库仓库"> {value.storehouseResult && value.storehouseResult.name}</Descriptions.Item>
              <Descriptions.Item label="负责人">{value.userResult && value.userResult.name}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{value.createTime}</Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={8}>
            <Code source="instock" id={value.instockOrderId} image codeWidth={210} />
          </Col>
        </Row>
      </ProCard>
      <ProCard className="h2Card" headerBordered title="入库清单">
        <Table
          title={<Breadcrumb />}
          api={instock}
          formActions={formActionsPublic}
          headStyle={{display: 'none'}}
          rowKey="instockListId"
          contentHeight
          rowSelection
          isModal={false}
          searchForm={searchForm}
          ref={tableRef}
        >
          <Column title="物料" render={(text, record) => {
            return (
              <>
                {record.sku && `${record.sku.skuName}  /  `}
                {record.spuResult && record.spuResult.name}
                &nbsp;&nbsp;
                {record.backSkus && record.backSkus.length > 0 && <em style={{color: '#c9c8c8', fontSize: 10}}>
                  (
                  {
                    record.backSkus.map((items, index) => {
                      return <span key={index}>{items.itemAttribute.attribute}
                        ：
                        {items.attributeValues.attributeValues}</span>;
                    })
                  }
                  )
                </em>}
              </>
            );

          }} sorter />
          <Column title="供应商(品牌)" dataIndex="brandId" width={200} render={(text, record) => {
            return (
              <>
                {record.brandResult && record.brandResult.brandName}
              </>
            );
          }} sorter />
          <Column title="总数量" width={120} align="center" dataIndex="instockNumber" sorter />
          <Column title="剩余数量" width={120} align="center" dataIndex="number" sorter />
          <Column title="总价" width={120} align="center" dataIndex="costPrice" sorter />
          <Column title="单价" width={120} align="center" dataIndex="sellingPrice" sorter />
        </Table>
      </ProCard>

      <Modal
        visible={show}
        title="选择库位"
        onCancel={() => {
          setShow(false);
        }}
        onOk={async () => {
          if (position) {
            await run({
              data: {
                ...items,
                storehousePositionsId: position,
              }
            });
          } else {
            message.error('请选择库位！');
          }
        }}
      >
        <Cascader
          width="100%"
          defaultParams={{params: {ids: items && items.storeHouseId}}}
          api={storehousePositionsTreeView}
          onChange={(value) => {
            setPosition(value);
          }} value={position} />
      </Modal>
      <ProCard className="h2Card" headerBordered title="入库明细">
        <InstockListTable ref={instockRef} value={value.instockOrderId} />
      </ProCard>
    </div>
  );
};

export default Instock;
