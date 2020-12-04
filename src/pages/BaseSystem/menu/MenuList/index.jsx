import React, {useRef} from 'react';
import {menuRemove, menuTreeList} from '@/Config/ApiUrl/system/menu';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import {EditOutlined, MenuOutlined} from '@ant-design/icons';
import MenuEdit from '@/pages/BaseSystem/menu/MenuEdit';
import Drawer from "@/components/Drawer";
import AddButton from "@/components/AddButton";


const {Column} = AntTable;

const MenuList = () => {

  const ref = useRef(null);
  const tableRef = useRef(null);

  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }}/>
      </>
    );
  }


  return (
    <>
      <Table
        title={<h2><MenuOutlined/> 菜单管理</h2>}
        api={menuTreeList}
        rowKey="value"
        actions={actions()}
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
              <DelButton api={menuRemove} value={record.id} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑菜单" component={MenuEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default MenuList;
