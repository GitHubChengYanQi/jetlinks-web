/**
 * 清单列表页
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React, {useRef} from 'react';
import {Button} from 'antd';
import {partsOldList} from '@/pages/Erp/parts/PartsUrl';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import Modal from '@/components/Modal';
import ShowBOM from '@/pages/Erp/parts/components/ShowBOM';
import Table from '@/components/Table';
import * as SysField from '@/pages/Erp/parts/PartsField';
import Form from '@/components/Form';
import {createFormActions} from '@formily/antd';

const {Column} = Table;
const {FormItem} = Form;

const formActionsPublic = createFormActions();

const PartsOldList = (props) => {

  const {value, type} = props;

  const ref = useRef();

  const searchForm = () => {

    return (
      <>
        <FormItem
          label="物料"
          placeholder="请选择物料"
          name="skuId"
          value={value}
          component={SysField.SkuId} />
        <FormItem
          hidden
          placeholder="请选择物料"
          name="type"
          value={type}
          component={SysField.PartName} />
      </>
    );
  };


  const table = () => {
    return <Table
      headStyle={{display:'none'}}
      formActions={formActionsPublic}
      contentHeight
      noRowSelection
      api={partsOldList}
      searchForm={searchForm}
      rowKey="partsId"
      pagination={false}
    >
      <Column title="物料" dataIndex="skuResult" render={(value, record) => {
        return (<Button type="link" onClick={() => {
          ref.current.open(record.partsId);
        }}><SkuResultSkuJsons skuResult={value} /></Button>);
      }} />
      <Column title="清单" dataIndex="partName" />
    </Table>;
  };

  return (
    <div style={{padding: 16}}>
      {table()}
      <Modal
        headTitle='物料清单'
        width={1000}
        component={ShowBOM}
        ref={ref}
      />
    </div>
  );
};

export default PartsOldList;
