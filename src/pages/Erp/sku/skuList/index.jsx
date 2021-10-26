/**
 * sku表列表页
 *
 * @author
 * @Date 2021-10-18 14:14:21
 */

import React, {useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {skuDelete, skuDetail, skuList} from '../skuUrl';
import SkuEdit from '../skuEdit';
import * as SysField from '../skuField';
import {useRequest} from '@/util/Request';
import {customerDetail} from '@/pages/Crm/customer/CustomerUrl';
import {logger, useParams} from 'ice';
import ProSkeleton from '@ant-design/pro-skeleton';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';
import Modal from '@/components/Modal';
import CheckButton from '@/components/CheckButton';
import {partsEdit} from '@/pages/Erp/parts/PartsUrl';
import {createFormActions} from '@formily/antd';

const {Column} = AntTable;
const {FormItem} = Form;

const formActionsPublic = createFormActions()

const SkuList = ({spuId,...props}) => {

  const {value} = props;

  const {run} = useRequest(partsEdit, {
    manual: true,
    onSuccess:()=>{

    }
  });

  const [ids,setIds] = useState();

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

  const footer = () => {
    return <CheckButton style={{padding:0}} onClick={()=>{
      run({
        data:{
          partsId:value,
          skuIds:ids,
        }
      });
    }}>选择</CheckButton>;
  };

  const searchForm = () => {
    return (
      <>
        <FormItem label="sku名字" name="skuName" component={SysField.SkuName} />
        <FormItem label="spuId" name="spuId" value={spuId} component={SysField.SpuId} />
      </>
    );
  };
  return (
    <>
      <Table
        headStyle={{display: 'none'}}
        api={skuList}
        rowKey="skuId"
        searchForm={searchForm}
        formActions={formActionsPublic}
        actions={actions()}
        contentHeight
        getCheckboxProps={(record) => ({
          disabled: true, // Column configuration not to be checked
        })}
        bordered={false}
        ref={tableRef}
        footer={footer}
        onChange={(value)=>{
          setIds(value);
        }}
      >
        <Column title="属性" render={(value, record) => {
          return (
            <>
              {
                record.skuJsons
                &&
                record.skuJsons.map((items, index) => {
                  if (index === record.skuJsons.length - 1) {
                    return (
                      <span key={index}>{items.values && items.values.attributeValues}</span>
                    );
                  } else {
                    return (
                      <span key={index}>{items.values && items.values.attributeValues}&nbsp;,&nbsp;</span>
                    );
                  }
                })
              }
            </>
          );
        }
        } />
      </Table>
    </>
  );
};

export default SkuList;
