import React, {useRef, useState} from 'react';
import {Comment, Image, Table as AntTable} from 'antd';
import * as SysField from '@/pages/Crm/customer/CustomerField';
import Form from '@/components/Form';
import Table from '@/components/Table';

const {Column} = AntTable;
const {FormItem} = Form;


const Track = (props) => {

  const {value} = props;
  // const [data, setData] = useState();
  const tableRef = useRef(null);

  const datas = (data) => {
    return {
      author: data && data.userResult ? data.userResult.name : '--',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: (
        <>
          <div>
            <span style={{color: '#91959e'}}>跟进类型:</span>
            <p style={{padding: 10}}>{data && data.type}</p>
            {data && data.image ? <div>
              <p style={{color: '#91959e'}}>图片:</p>
              <Image style={{marginLeft: 10}} width={100} height={50} src={data && data.image} />
            </div> : null}

          </div>
          {data && data.note ? <div>
            <span style={{color: '#91959e'}}>跟进内容:</span>
            <p style={{padding: 10}}>{data.note}</p>
          </div> : null}
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
        headStyle={{display:'none'}}
        rowSelection
        bordered={false}
        bodyStyle={{padding:0}}
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
          // setData(record);
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
