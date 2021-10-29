import React, {useRef} from 'react';
import {menuRemove, menuTreeList} from '@/Config/ApiUrl/system/menu';
import {Card, Table, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import {MenuOutlined} from '@ant-design/icons';
import MenuEdit from '@/pages/BaseSystem/menu/MenuEdit';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Breadcrumb from '@/components/Breadcrumb';
import {useRequest} from '@/util/Request';


const {Column} = AntTable;

const MenuList = () => {
  const ref = useRef(null);
  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }}/>
      </>
    );
  };

  const {data,refresh} = useRequest(menuTreeList);

  return (
    <Card title={<Breadcrumb />} extra={actions()}>
      <Table
        dataSource={data || []}
      >
        <Column title="名称" dataIndex="label" width={200}/>
        <Column title="编码" dataIndex="value" width={200}/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.id);
              }}/>
              <DelButton api={menuRemove} value={record.id} onSuccess={()=>{
                refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑菜单" component={MenuEdit} onSuccess={() => {
        refresh();
        ref.current.close();
      }} ref={ref}/>
    </Card>
  );
};

export default MenuList;
