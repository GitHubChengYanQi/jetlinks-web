import React from 'react';
import {Comment, Table as AntTable} from 'antd';
import * as SysField from '@/pages/Crm/customer/CustomerField';
import Form from '@/components/Form';
import Table from '@/pages/Crm/customer/CustomerDetail/compontents/Table';

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
          <p>
            <p style={{padding: 10}}>{value.content}</p>
          </p>
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
            <Comment style={{margin:-20}}
              {...datas(record)}
            />
          );
        }} />

      </Table>
    </div>
  );
};

export default Dynamic;