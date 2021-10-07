import React from 'react';
import {Avatar, Comment, Table as AntTable} from 'antd';
import * as SysField from '@/pages/Crm/customer/CustomerField';
import Form from '@/components/Form';
import Table from '@/components/Table';

const {Column} = AntTable;

const Dynamic = (props) => {


  const {value} = props;
  const {FormItem} = Form;

  if (!value){
    return null;
  }

  const datas = (value) => {
    return {
      author: value.userResult ? value.userResult.name : '--',
      avatar: <Avatar>{value.userResult && value.userResult.name && value.userResult.name.substring(0,1)}</Avatar>,
      content: (
        <>
          <p style={{padding: 10}}>{value.content}</p>
        </>
      ),
      datetime: (
        <span>{value.createTime}</span>
      ),
    };
  };

  const searchForm = () => {

    return (
      <div style={{maxWidth: 800}}>
        <FormItem
          placeholder="customerId"
          hidden
          value={value.customerId}
          name="customerId"
          component={SysField.Name} />
      </div>
    );
  };


  return (
    <div>
      <Table
        headStyle={{display:'none'}}
        searchForm={searchForm}
        selectionType
        rowSelection
        bodyStyle={{padding:0}}
        bordered={false}
        showHeader={false}
        dynamic
        showSearchButton={false}
        api={{
          url: '/customerDynamic/list', method: 'POST'
        }}
        rowKey="dynamicId"
      >
        <Column render={(text, record) => {
          return (
            <Comment
              style={{padding:0}}
              {...datas(record)}
            />
          );
        }} />
      </Table>
    </div>
  );
};

export default Dynamic;
