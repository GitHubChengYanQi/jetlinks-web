import {Input, Table as AntTable} from 'antd';
import Form from '@/components/Form';
import React, {useRef, useState} from 'react';
import AddButton from '@/components/AddButton';
import * as SysField from '@/pages/DaoXinSTOCK/stock/stockField';
import Table from '@/components/Table';
import {stockDelete, stockList} from '@/pages/DaoXinSTOCK/stock/stockUrl';
import EditButton from '@/components/EditButton';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import StockEdit from '@/pages/DaoXinSTOCK/stock/stockEdit';
import CheckButton from '@/components/CheckButton';
import {stockDetailsList} from '@/pages/DaoXinSTOCK/stockDetails/stockDetailsUrl';

const {Column} = AntTable;
const {FormItem} = Form;

const Res = (props) => {
  const {ckeck} = props;


  const searchForm = () => {
    return (
      <>
        <FormItem label="仓库地点" name="palceId" component={SysField.PalceId}/>
        <FormItem label="物品名称" name="itemId" component={SysField.ItemId}/>
      </>
    );
  };
  const [val,setVal] = useState();

  return (

    <>
      <Input  value={val}/>

    </>
  );
};

export default Res;
