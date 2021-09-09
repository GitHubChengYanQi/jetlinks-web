import React, {useRef, useState} from 'react';
import { Comment, Table as AntTable} from 'antd';
import Table from '@/pages/Crm/customer/CustomerDetail/compontents/Table';
import * as SysField from '@/pages/Crm/customer/CustomerField';
import Form from '@/components/Form';

const {Column} = AntTable;
const {FormItem} = Form;


const Track = (props) => {

  const {value} = props;
  const [data, setData] = useState();
  const tableRef = useRef(null);

  const datas = () => {
    return {
      author: data && data.userResult ? data.userResult.name : '--',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: (
        <>
          <div>
            <span style={{color: '#91959e'}}>跟踪类型:</span>
            <p style={{padding: 10}}>{data && data.type}</p>
            <span style={{color: '#91959e'}}>跟踪内容:</span>
            <p style={{padding: 10}}>{data && data.note}</p>
          </div>
          {/*{value.message ? <div>*/}
          {/*  <span style={{color: '#91959e'}}>提醒内容:</span>*/}
          {/*  <p style={{padding: 10}}>{data.message}</p>*/}
          {/*</div> : null}*/}
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
          setData(record);
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
