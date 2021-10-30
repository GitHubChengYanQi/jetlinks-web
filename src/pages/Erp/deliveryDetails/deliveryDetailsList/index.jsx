/**
 * 列表页
 *
 * @author
 * @Date 2021-08-20 13:14:51
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Button, Modal, notification, Table as AntTable} from 'antd';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {deliveryDetailsDelete, deliveryDetailsEdit, deliveryDetailsList} from '../deliveryDetailsUrl';
import DeliveryDetailsEdit from '../deliveryDetailsEdit';
import * as SysField from '../deliveryDetailsField';
import Breadcrumb from '@/components/Breadcrumb';
import {useParams} from 'ice';
import Icon from '@/components/Icon';
import {useRequest} from '@/util/Request';
import Modal2 from '@/components/Modal';
import {BrandId} from '../deliveryDetailsField';

const {Column} = AntTable;
const {FormItem} = Form;

const DeliveryDetailsList = () => {
  const ref = useRef(null);
  const params = useParams();
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

  const {run} = useRequest(deliveryDetailsEdit, {
    manual: true, onSuccess: () => {
      openNotificationWithIcon('success');
      tableRef.current.refresh();
    }
  });

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: type === 'success' ? '发货成功！' : '请输入详细信息！！！！',
    });
  };

  function confirmOk(record) {
    Modal.confirm({
      title: '发货',
      centered: true,
      content: `请确认是否执行发货操作!注意：发货之后不可修改。`,
      style: {margin: 'auto'},
      cancelText: '取消',
      onOk: async () => {
        if(record.customerId && record.adressId && record.contactsId && record.phoneId){
          record.stage = 1;
          await run(
            {
              data: record
            }
          );
        }else {
          openNotificationWithIcon('error');
        }

      }
    });
  }

  const searchForm = () => {
    return (
      <>
        <FormItem label="产品" name="itemId" component={SysField.ItemId} />
        <FormItem label="品牌" name="brandId" component={SysField.BrandId} />
        <FormItem hidden value={params ? params.cid : null} name="deliveryId" component={SysField.DeliveryId} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={deliveryDetailsList}
        rowKey="deliveryDetailsId"
        isModal={false}
        searchForm={searchForm}
        // actions={actions()}
        ref={tableRef}
      >
        <Column title="产品编号" dataIndex="stockItemId" />
        <Column title="产品" render={(text, record) => {
          return (
            <>
              {record.spuResult && record.spuResult.name}
              &nbsp;&nbsp;
              &lt;
              {
                record.backSkus && record.backSkus.map((items, index) => {
                  if (index === record.backSkus.length - 1) {
                    return <span key={index}>{items.attributeValues && items.attributeValues.attributeValues}</span>;
                  } else {
                    return <span
                      key={index}>{items.attributeValues && items.attributeValues.attributeValues}&nbsp;&nbsp;，</span>;
                  }

                })
              }
              &gt;
            </>
          );

        }} sorter />
        <Column title="品牌" dataIndex="brandId" render={(value,record)=>{
          return (
            <>
              {
                record.brandResult ? record.brandResult.name : value
              }
            </>
          );
        }} />
        <Column />
      </Table>
      <Modal2 width={800} title="编辑" component={DeliveryDetailsEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default DeliveryDetailsList;
