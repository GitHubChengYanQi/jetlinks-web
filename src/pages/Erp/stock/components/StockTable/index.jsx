/**
 * 仓库总表列表页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {useEffect, useRef,} from 'react';
import {Button,  Table as AntTable} from 'antd';
import {MegaLayout} from '@formily/antd-components';
import {createFormActions, FormButtonGroup, Submit} from '@formily/antd';
import {SearchOutlined} from '@ant-design/icons';
import {useBoolean} from 'ahooks';
import {useHistory} from 'ice';
import Icon from '@/components/Icon';
import Breadcrumb from '@/components/Breadcrumb';
import Form from '@/components/Form';
import Table from '@/components/Table';
import {stockList} from '../../StockUrl';
import * as SysField from '../../StockField';


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

          <div style={{display: 'inline-block', width: !search && 200}}>
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
              <FormItem hidden name="stockNumber" component={SysField.Storehouse} />
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
        actions={<Button onClick={()=>{
          tableRef.current.formActions.setFieldValue('stockNumber', 0);
          tableRef.current.submit();
        }}>
          查看所有库存
        </Button>}
        rowSelection
        {...other}
      >
        <Column title="物料" render={(text, record) => {
          return (
            <>
              {record.sku && `${record.sku.skuName  }  /  `}
              {record.spuResult && record.spuResult.name}
              &nbsp;&nbsp;
              { record.backSkus && record.backSkus.length>0 && <em style={{color: '#c9c8c8', fontSize: 10}}>
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
        <Column title="供应商(品牌)" width={200} render={(text, record) => {
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
            history.push(`/ERP/stock/detail?stockId=${record.stockId}`);
          }}>查看库存详情</Button>;
        }} />

      </Table>
    </>
  );
};

export default StockTable;
