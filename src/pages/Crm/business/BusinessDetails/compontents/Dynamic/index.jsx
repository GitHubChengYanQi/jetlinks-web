import React from 'react';
import {Comment, Table as AntTable} from 'antd';
import * as SysField from '@/pages/Crm/customer/CustomerField';
import Form from '@/components/Form';
import Table from '@/components/Table';

const {Column} = AntTable;
const {FormItem} = Form;

const Dynamic = (props) => {


  const {value} = props;



  const datas = (value) => {
    return {
      author: value.userResult ? value.userResult.name : '--',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: (
        <>
          <div>
            <p style={{padding: 10}}>{value.content}</p>
          </div>
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
        <FormItem placeholder="businessId" hidden value={value.businessId} name="businessId"
                  component={SysField.Name} />
      </div>
    );
  };

  return (
    <div>
      <Table
        searchForm={searchForm}
        headStyle={{display:'none'}}
        rowSelection
        bordered={false}
        bodyStyle={{padding:0}}
        selectionType
        showHeader={false}
        dynamic
        showSearchButton={false}
        api={{
          url: '/businessDynamic/list', method: 'POST'
        }}
        rowKey="dynamicId"
      >
        <Column render={(text, record) => {
          return (
            <Comment style={{padding:0}}
              {...datas(record)}
            />
          );
        }} />

      </Table>
    </div>
  );
};

export default Dynamic;
