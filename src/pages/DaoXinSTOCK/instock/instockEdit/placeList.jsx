import React, {useRef, useState} from 'react';
import * as SysField from '@/pages/DaoXinSTOCK/place/placeField';
import Table from '@/components/Table';
import {placeDelete, placeList} from '@/pages/DaoXinSTOCK/place/placeUrl';
import {FormItem} from '@formily/antd';
import {Input, Table as AntTable} from 'antd';
import CheckButton from '@/components/CheckButton';
import {places} from '@/pages/DaoXinSTOCK/stock/stockUrl';
import Drawer from '@/components/Drawer';
import ItemsEdit from '@/pages/DaoxinBOM/items/itemsEdit';
import EditButton from '@/components/EditButton';

const {Column} = AntTable;




const StockPlaceList = (props) => {

  const {ckeck} = props;


  const ref = useRef(null);
  const tableRef = useRef(null);
  const actions = () => {
    return (
      <>

      </>
    );
  };


  const searchForm = () => {
    return (
      <>
        <FormItem label="仓库名称" name="name" component={SysField.Name}/>
      </>
    );
  };



  const [val,setVal] = useState();

  return (
    <>
      <Input  value={val}/>
      <Table
        api={places}
        rowKey="palceId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="仓库名称" dataIndex="name"/>
        <Column title="仓库地点" dataIndex="palce"/>
        <Column title="经度" dataIndex="longitude"/>
        <Column title="纬度" dataIndex="latitude"/>
        <Column title="仓库面积" dataIndex="measure"/>
        <Column title="仓库容量" dataIndex="capacity"/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <CheckButton onClick={() => {
                setVal(record.palceId);
                ckeck(record.palceId);
              }}
              />
            </>
          );
        }}/>


      </Table>

    </>
  );
};

export default StockPlaceList;
