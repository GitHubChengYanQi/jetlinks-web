/**
 * 清单列表页
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React, {useRef} from 'react';
import Form from '@/components/Form';
import {partsDelete, partsList} from '../PartsUrl';
import Breadcrumb from '@/components/Breadcrumb';
import * as SysField from '@/pages/Erp/spu/spuField';
import DelButton from '@/components/DelButton';
import Modal from '@/components/Modal';
import Parts from '@/pages/Erp/parts/PartsEdit/components/Parts';
import EditButton from '@/components/EditButton';
import AddButton from '@/components/AddButton';
import {Card, Table} from 'antd';
import {useRequest} from '@/util/Request';

const {Column} = Table;
const {FormItem} = Form;

const PartsList = () => {

  const refAdd = useRef();
  const tableRef = useRef();

  const searchForm = () => {
    return (
      <>
        <FormItem label="清单名称" name="partName" component={SysField.Name} />
      </>
    );
  };

  const {data} = useRequest(partsList);

  const dataSource = data && data.map((items,index) => {
    return {
      key:index,
      ...items,
    };
  });


  const action = () => {

    return (
      <AddButton onClick={() => {
        refAdd.current.open(false);
      }} />
    );
  };

  // const data = [
  //   {
  //     key: 1,
  //     name: '1.',
  //     age: 60,
  //     address: 'New York No. 1 Lake Park',
  //     children: [
  //       {
  //         key: 11,
  //         name: '11',
  //         age: 42,
  //         address: 'New York No. 2 Lake Park',
  //       },
  //       {
  //         key: 12,
  //         name: '22',
  //         age: 30,
  //         address: 'New York No. 3 Lake Park',
  //         children: [
  //           {
  //             key: 121,
  //             name: '222',
  //             age: 16,
  //             address: 'New York No. 3 Lake Park',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     key: 2,
  //     name: '2',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //   },
  // ];

  return (
    <Card title={<Breadcrumb />} extra={action()}>
      <Table
        rowKey="key"
        dataSource={dataSource || []}
        expandable={{
          onExpand:(expandable,record)=>{
            console.log(expandable,record);
          }
        }}
      >
        <Column title="清单名称" dataIndex="partName" />
        <Column title="物料" dataIndex="skuId" />
        <Column title="操作" fixed="right" align="center" width={100} render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                refAdd.current.open(record.partsId);
              }} />
              <DelButton api={partsDelete} value={record.partsId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} />
      </Table>
      <Modal width={1200} title="清单" component={Parts} onSuccess={() => {
        tableRef.current.refresh();
        refAdd.current.close();
      }} ref={refAdd} />
    </Card>
  );
};

export default PartsList;
