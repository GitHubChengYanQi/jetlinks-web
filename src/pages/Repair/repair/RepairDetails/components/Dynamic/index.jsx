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
        <FormItem placeholder="repairId" hidden value={value.repairId} name="repairId"
                  component={SysField.Name} />
      </div>
    );
  };

  return (
    <div>
      <Table
        headStyle={{display: 'none'}}
        bordered={false}
        noRowSelection
        searchForm={searchForm}
        bodyStyle={{padding: 0}}
        selectionType
        showHeader={false}
        dynamic
        showSearchButton={false}
        api={{
          url: '/repairDynamic/list', method: 'POST'
        }}
        rowKey="dynamicId"
      >
        <Column render={(text, record) => {
          return (
            <Comment
              style={{padding: 0}}
              {...datas(record)}
            />
          );
        }} />

      </Table>
    </div>
  );
};

export default Dynamic;
