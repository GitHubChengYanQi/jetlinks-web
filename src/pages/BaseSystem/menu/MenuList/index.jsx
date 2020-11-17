import React, {useRef, useState} from 'react';
import {menuList, menuRemove, menuTree, menuTreeList} from '@/Config/ApiUrl/system/menu';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import {EditOutlined, MenuOutlined} from '@ant-design/icons';
import MenuEdit from '@/pages/BaseSystem/menu/MenuEdit';
import Drawer from "@/components/Drawer";

const ApiConfig = {
  listApi: menuList,
  delApi: menuRemove,
};

const {Column} = AntTable;

const MenuList = () => {

  const ref = useRef();
  const tableRef = useRef();

  return (
    <>
      <Table
        title={<h2><MenuOutlined/> 菜单管理</h2>}
        api={menuTreeList}
        rowKey="value"
        ref={tableRef}
      >
        <Column title="名称" dataIndex="label" width={200}/>
        <Column title="编码" dataIndex="value" width={200}/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <Button className="button-left-margin" icon={<EditOutlined/>} onClick={() => {
                ref.current.open(record.id);
              }}>编辑</Button>
              <DelButton/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑菜单" component={MenuEdit} onSuccess={()=>{
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default MenuList;
