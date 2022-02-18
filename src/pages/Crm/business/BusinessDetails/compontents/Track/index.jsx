import React, {useEffect, useRef} from 'react';
import {Avatar, Comment, Image, Spin, Table as AntTable} from 'antd';
import * as SysField from '@/pages/Crm/customer/CustomerField';
import Form from '@/components/Form';
import Table from '@/components/Table';
import {useRequest} from '@/util/Request';

const {Column} = AntTable;
const {FormItem} = Form;


const Track = (props) => {


  const {value, number, trackMessageId} = props;
  const tableRef = useRef(null);

  const {loading,data} = useRequest({url: '/trackMessage/list', method: 'POST', data: {customerId: trackMessageId}});

  const trackMessageIds = data && data.map((items, index) => {
    return items.trackMessageId;
  });


  const datas = (data) => {
    return {
      author: data && data.userResult ? data.userResult.name : '--',
      avatar: <Avatar>{data.userResult && data.userResult.name && data.userResult.name.substring(0,1)}</Avatar>,
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
        <span>{data.createTime}</span>
      ),
    };
  };

  if (loading){
    return <div style={{textAlign:'center',margin:64}}><Spin size="large" /></div>;
  }

  const searchForm = () => {
    return (
      <>
        <FormItem placeholder="classifyId" hidden value={value} name="classifyId" component={SysField.Name} />
        <FormItem placeholder="classify" hidden value={number} name="classify" component={SysField.Name} />
        <FormItem placeholder="trackMessageIds" hidden value={trackMessageIds} name="trackMessageIds" component={SysField.Name} />
      </>);
  };

  return (
    <div>
      <Table
        searchForm={searchForm}
        headStyle={{display: 'none'}}
        noRowSelection
        noSort
        bordered={false}
        bodyStyle={{padding: 0}}
        selectionType
        showHeader={false}
        dynamic
        ref={tableRef}
        showSearchButton={false}
        api={{
          url: '/businessTrack/list', method: 'POST'
        }}
        rowKey="trackId"
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
