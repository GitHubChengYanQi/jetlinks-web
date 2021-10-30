/**
 * 仓库总表列表页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {useEffect, useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, Modal as AntModal, Table as AntTable} from 'antd';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import {MegaLayout} from '@formily/antd-components';
import {createFormActions, FormButtonGroup, Submit} from '@formily/antd';
import {QrcodeOutlined, ScanOutlined, SearchOutlined, SelectOutlined} from '@ant-design/icons';
import Icon from '@/components/Icon';
import CheckButton from '@/components/CheckButton';
import {useBoolean} from 'ahooks';
import {useHistory} from 'ice';
import SelButton from '@/components/SelButton';
import {stockList} from '../../StockUrl';
import * as SysField from '../../StockField';
import Modal from '@/components/Modal';
import DeliveryDetailsList from '@/pages/Erp/deliveryDetails/deliveryDetailsList';
import Code from '@/pages/Erp/spu/components/Code';


const {Column} = AntTable;
const {FormItem} = Form;
const formActionsPublic = createFormActions();
const StockTable = (props) => {

  const {choose, state, ...other} = props;
  const tableRef = useRef(null);
  const history = useHistory();

  const [search, {toggle}] = useBoolean(false);

  useEffect(() => {
    if (state) {
      tableRef.current.formActions.setFieldValue('storehouseId', state ? state[0] : null);
      tableRef.current.submit();
    }
  }, [state]);

  const searchForm = () => {
    const formItem = () => {
      return (
        <>
          {/*<FormItem mega-props={{span: 1}} placeholder="产品名称" name="itemId" component={SysField.ItemId} />*/}
        </>
      );
    };

    return (
      <div style={{maxWidth: 800}}>
        <MegaLayout
          responsive={{s: 1, m: 2, lg: 2}}
          labelAlign="left"
          layoutProps={{wrapperWidth: 200}}
          grid={search}
          columns={4} full autoRow>

          <div style={{display:'inline-block',width:!search && 200}}>
            <FormItem
              mega-props={{span: 1}}
              placeholder="品牌"
              name="brandId"
              component={SysField.BrandId}
            />
          </div>

          {search ? formItem() : null}
        </MegaLayout>
      </div>
    );
  };

  const Search = () => {
    return (
      <>
        <MegaLayout>
          <FormButtonGroup>
            <Submit><SearchOutlined />查询</Submit>
            <Button type="link" title={search ? '收起高级搜索' : '展开高级搜索'} onClick={() => {
              toggle();
            }}> <Icon type={search ? 'icon-shouqi' : 'icon-gaojisousuo'} />{search ? '收起' : '高级'}</Button>
            <MegaLayout inline>
              <FormItem hidden name="storehouseId" value={state} component={SysField.Storehouse} />
            </MegaLayout>
          </FormButtonGroup>
        </MegaLayout>
      </>
    );
  };


  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={stockList}
        isModal={false}
        formActions={formActionsPublic}
        SearchButton={Search()}
        layout={search}
        rowKey="stockId"
        searchForm={searchForm}
        ref={tableRef}
        rowSelection
        {...other}
      >
        <Column title={<ScanOutlined />} align='center' width={20} render={(value,record)=>{
          return (<Code type='stock' id={record.stockId} />);
        }} />
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
        <Column title="品牌" width={200} render={(text, record) => {
          return (
            <>
              {record.brandResult && record.brandResult.brandName}
            </>
          );
        }} />
        <Column title="仓库名称" render={(text, record) => {
          return (
            <>
              {record.storehouseResult && record.storehouseResult.name}
            </>
          );
        }} />
        <Column title="数量" width={120} align="center" sorter dataIndex="inventory" />
        <Column title="操作" fixed="right" align="center" width={100} render={(value, record) => {
          return <Button type="link" onClick={() => {
            history.push(`/ERP/stock/detail?storehouseId=${record.storehouseId}&brandId=${record.brandId}&skuId=${record.skuId}`);
          }}>查看</Button>;
        }} />

      </Table>
    </>
  );
};

export default StockTable;
