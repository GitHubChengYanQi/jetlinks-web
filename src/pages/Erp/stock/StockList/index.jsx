/**
 * 仓库总表列表页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, Divider, Table as AntTable, Tree} from 'antd';
import DelButton from '@/components/DelButton';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import {customerBatchDelete} from '@/pages/Crm/customer/CustomerUrl';
import {MegaLayout} from '@formily/antd-components';
import {FormButtonGroup, Submit} from '@formily/antd';
import {SearchOutlined} from '@ant-design/icons';
import Icon from '@/components/Icon';
import CheckButton from '@/components/CheckButton';
import {stockList} from '../StockUrl';
import * as SysField from '../StockField';
import {useRequest} from "@/util/Request";
import ListLayout from "@/layouts/ListLayout";
import CustomerTable from "@/pages/Crm/customer/components/CustomerTable";
import StockTable from "@/pages/Erp/stock/components/StockTable";

const {Column} = AntTable;
const {FormItem} = Form;

const StockList = (props) => {

//   const {choose} = props;
//   const ref = useRef(null);
//   const tableRef = useRef(null);
//
//   const [search, setSearch] = useState(false);
//
//   const searchForm = () => {
//
//     const formItem = () => {
//       return (
//         <>
//           <FormItem mega-props={{span: 1}} placeholder="产品名称" name="itemId" component={SysField.ItemId} />
//           <FormItem mega-props={{span: 1}} placeholder="品牌" name="brandId" component={SysField.BrandId} />
//           <FormItem mega-props={{span: 1}} placeholder="数量" name="inventory" component={SysField.Inventory} />
//         </>
//       );
//     };
//
//
//     return (
//       <div style={{maxWidth: 800}}>
//         <MegaLayout responsive={{s: 1, m: 2, lg: 2}} labelAlign="left" layoutProps={{wrapperWidth: 200}} grid={search}
//           columns={4} full autoRow>
//           <FormItem mega-props={{span: 1}} placeholder="仓库名称" name="storehouseId" component={SysField.Storehouse} />
//           {search ? formItem() : null}
//         </MegaLayout>
//       </div>
//     );
//   };
//
//   const Search = () => {
//     return (
//       <>
//         <MegaLayout>
//           <FormButtonGroup>
//             <Submit><SearchOutlined />查询</Submit>
//             <Button title={search ? '收起高级搜索' : '展开高级搜索'} onClick={() => {
//               if (search) {
//                 setSearch(false);
//               } else {
//                 setSearch(true);
//               }
//             }}> <Icon type={search ? 'icon-shouqi' : 'icon-gaojisousuo'} />{search ? '收起' : '高级'}</Button>
//           </FormButtonGroup>
//         </MegaLayout>
//       </>
//     );
//   };
//
//   const [ids, setIds] = useState([]);
//
//   const footer = () => {
//     /**
//      * 批量删除例子，根据实际情况修改接口地址
//      */
//     return (<DelButton api={{
//       ...customerBatchDelete
//     }} onSuccess={() => {
//       tableRef.current.refresh();
//     }} value={ids}>批量删除</DelButton>);
//   };
//
//
//   return (
//     <>
//       <Table
//         title={<Breadcrumb />}
//         api={stockList}
//         SearchButton={Search()}
//         layout={search}
//         rowKey="stockId"
//         searchForm={searchForm}
//         ref={tableRef}
//         footer={footer}
//         onChange={(keys) => {
//           setIds(keys);
//         }}
//       >
//         <Column title="仓库名称" dataIndex="pname" render={(text, record) => {
//           return (
//             <>
//               {record.storehouseResult.name}
//             </>
//           );
//         }} sorter />
//         <Column title="产品名称" dataIndex="iname" render={(text, record) => {
//           return (
//             <>
//               {record.itemsResult.name}
//             </>
//           );
//         }} sorter />
//         <Column title="品牌" dataIndex="bname" render={(text, record) => {
//           return (
//             <>
//               {record.brandResult.brandName}
//             </>
//           );
//         }} sorter />
//         <Column title="数量" dataIndex="inventory" />
//         <Column />
//         {choose ? <Column title="操作" align="right" render={(value, record) => {
//           return (
//             <>
//               <CheckButton onClick={() => {
//                 choose(record);
//                 props.onSuccess();
//               }} />
//             </>
//           );
//         }} width={300} /> : null}
//       </Table>
//     </>
//   );
// };
  const {loading, data} = useRequest({ url: '/storehouse/listSelect',method: 'POST'});

  const crmStocklist = data ? data.map((values)=>{
    return {
      title: values.label,
      key: values.value,
    };
  }) : [];

  const [state, setState] = useState();

  const Left = () => {
    return (
      <>
        <Tree
          showLine
          onSelect={(value) => {
            setState(value);
          }}
          defaultExpandedKeys={['']}
          treeData={[
            {
              title: '所有仓库',
              key: '',
              children: crmStocklist
            },
          ]}
        />
      </>);
  };
  return (
    <ListLayout left={Left()}>
      <StockTable state={state}/>
    </ListLayout>
  );
};

export default StockList;
