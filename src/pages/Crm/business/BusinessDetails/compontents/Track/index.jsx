import React, {useRef} from 'react';
import { Comment, Table as AntTable} from 'antd';
import Table from '@/pages/Crm/customer/CustomerDetail/compontents/Table';
import * as SysField from '@/pages/Crm/customer/CustomerField';
import Form from '@/components/Form';

const {Column} = AntTable;
const {FormItem} = Form;


const Track = (props) => {

  const {value} = props;

  const tableRef = useRef(null);


  const datas = (value) => {
    return {
      // author: value.user.name ? value.user.name : '--'
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: (
        <>
          <p>
            <p style={{color: '#91959e'}}>记录内容</p>
            <p style={{padding: 10}}>{value.note}</p>
          </p>
          {value.message ? <p>
            <span style={{color: '#91959e'}}>{value.message}</span>
          </p> : null}
          <p>
            {/*<span style={{color: '#91959e'}}>是否报价：{value.offer === 0 ? '是' : '否'}</span>*/}
          </p>
          {value.money ? <p>
            {/*<span style={{color: '#91959e'}}>报价金额：{value.money}</span>*/}
          </p> : null}
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
        <FormItem placeholder="businessId" hidden value={value.businessId} name="businessId" component={SysField.Name} />
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
        ref={tableRef}
        showSearchButton={false}
        api={{
          url: '/trackMessage/list', method: 'POST'
        }}
        rowKey="trackMessageId"
      >
        <Column render={(text, record) => {
          return (
            <Comment
              {...datas(record)}
            />
          );
        }} />

      </Table>
    </div>
  );
};

export default Track;
