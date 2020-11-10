import React, {useRef, useState} from 'react';
import {menuList, menuRemove} from '@/Config/ApiUrl/system/menu';
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

  return (
    <>
      <Table
        title={<h2><MenuOutlined/> 菜单管理</h2>}
        api={menuList}
        rowKey="menuId"
      >
        <Column title="名称" dataIndex="name" width={200}/>
        <Column title="编码" dataIndex="code" width={200}/>
        <Column title="状态" dataIndex="statusName" width={200}/>
        <Column title="请求地址" dataIndex="url" width={300}/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <Button className="button-left-margin" icon={<EditOutlined/>} onClick={() => {
                ref.current.show(record.menuId);
              }}>编辑</Button>
              <DelButton/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer title="编辑菜单" form={MenuEdit} ref={ref}/>
    </>
  );
};

export default MenuList;
