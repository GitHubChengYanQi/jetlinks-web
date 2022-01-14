import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';


import {Draggable} from './Draggable';
import {Button, Col, message, Modal, Row, Table, Upload} from 'antd';
import cookie from 'js-cookie';
import Icon from '@/components/Icon';
import {config} from 'ice';

const {baseURI} = config;

const App = () => {

  const [filelist, setFilelist] = useState([]);

  const importErrData = (errData)=>{
    const data = errData.map((item,index)=>{
      return {
        key:index,
        sku:item.产品,
        class:item.分类,
        unit:item.单位,
        name:item.型号,
        coding:item.成品码,
        batch:item.是否批量,
        attributes:item.attributes && item.attributes.map((item)=>{
          return item;
        }).toString()
      };
    });
    Modal.error({
      width:1000,
      title: '异常数据',
      content: <Table rowKey='key' dataSource={data || []}>
        <Table.Column title='产品' dataIndex='sku' />
        <Table.Column title='分类' dataIndex='class' />
        <Table.Column title='单位' dataIndex='unit' />
        <Table.Column title='型号' dataIndex='name' />
        <Table.Column title='成品码' dataIndex='coding' />
        <Table.Column title='是否批量' dataIndex='batch' />
        <Table.Column title='参数配置' dataIndex='attributes' />
      </Table>
    });
  };

  return <><Upload
    fileList={filelist}
    action={`${baseURI}Excel/importSku`}
    headers={
      {Authorization: cookie.get('tianpeng-token')}
    }
    name="file"
    beforeUpload={() => {
      message.loading({
        content: '导入中，请稍后...',
        key: 1,
        style: {
          marginTop: '20vh',
        },
      });
      return true;
    }}
    onChange={async ({file, fileList, event}) => {
      setFilelist(fileList);
      if (file.status === 'done') {
        setFilelist([]);
        if (file.response.data && file.response.data.length > 0){
          importErrData(file.response.data);
        }
        message.success({
          content: '导入成功！',
          key: 1,
          duration: 2,
          style: {
            marginTop: '20vh',
          },
        });
      }
    }}
  >
    <Button icon={<Icon type="icon-daoru" />}>导入物料</Button>
  </Upload>
  </>;
};

export default App;
