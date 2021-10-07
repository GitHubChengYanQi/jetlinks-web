import React, {useRef, useState} from 'react';
import * as SysField from '@/pages/Erp/instock/InstockField';
import {MegaLayout} from '@formily/antd-components';
import {createFormActions, FormButtonGroup, Submit} from '@formily/antd';
import {SearchOutlined} from '@ant-design/icons';
import {Badge, Button, message, Table as AntTable} from 'antd';
import Icon from '@/components/Icon';
import Table from '@/components/Table';
import Breadcrumb from '@/components/Breadcrumb';
import {instock, instockEdit, instockList, instockOrderList} from '@/pages/Erp/instock/InstockUrl';
import Form from '@/components/Form';
import {useRequest} from '@/util/Request';
import ProCard from '@ant-design/pro-card';
import InstockListTable from '@/pages/Erp/instock/InstockList/components/InstockListTable';

const {Column} = AntTable;
const {FormItem} = Form;

const formActionsPublic = createFormActions();

const Instock = (props) => {


  const {run} = useRequest(instockEdit, {
    manual: true, onSuccess: () => {
      tableRef.current.submit();
      instockRef.current.tableRef.current.submit();
    }
  });

  const tableRef = useRef(null);
  const instockRef = useRef(null);


  const searchForm = () => {

    return (
      <FormItem name="instockOrderId" value={props.value} component={SysField.barcode} />
    );
  };


  return (
    <div style={{padding: 24}}>
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
          getCheckboxProps={(record) => ({
            disabled: record.state === 1, // Column configuration not to be checked
          })}
          searchForm={searchForm}
          ref={tableRef}
        >
          <Column title="仓库名称" fixed dataIndex="storehouseId" render={(text, record) => {
            return (
              <>
                {record.storehouseResult && record.storehouseResult.name}
              </>
            );
          }} sorter />
          <Column title="产品" dataIndex="itemId" render={(text, record) => {
            return (
              <>
                {record.itemsResult && record.itemsResult.name}
              </>
            );
          }} sorter />
          <Column title="品牌" dataIndex="brandId" render={(text, record) => {
            return (
              <>
                {record.brandResult && record.brandResult.brandName}
              </>
            );
          }} sorter />
          <Column title="入库数量" width={120} align="center" dataIndex="number" sorter />
          <Column title="原价" width={120} align="center" dataIndex="costPrice" sorter />
          <Column title="售价" width={120} align="center" dataIndex="sellingPrice" sorter />
          <Column title="操作" width={120} render={(text, record) => {
            return (
              <Button style={{margin: '0 10px'}} onClick={async () => {
                await run(
                  {
                    data: {
                      ...record
                    }
                  }
                );
              }}><Icon type="icon-ruku" />入库</Button>
            );
          }} />
        </Table>
      </ProCard>

      <ProCard className="h2Card" headerBordered title="入库明细">
        <InstockListTable ref={instockRef} value={props.value} />
      </ProCard>
    </div>
  );
};

export default Instock;
