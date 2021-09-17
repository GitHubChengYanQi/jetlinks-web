import React, {useEffect, useRef} from 'react';
import {Comment, Image, Table as AntTable} from 'antd';
import * as SysField from '@/pages/Crm/customer/CustomerField';
import Form from '@/components/Form';
import Table from '@/components/Table';
import {useRequest} from '@/util/Request';

const {Column} = AntTable;
const {FormItem} = Form;


const Track = ({classify, classifyId, customerId}) => {


  const tableRef = useRef(null);

  const {data} = useRequest({url: '/trackMessage/listAll', method: 'POST', data: {customerId}});

  const trackMessageIds = data ? data.map((items, index) => {
    return items.trackMessageId;
  }) : [];


  useEffect(()=>{
    console.log(trackMessageIds);
    if (trackMessageIds.length > 0){
      tableRef.current.formActions.setFieldValue('trackMessageIds', trackMessageIds);
      tableRef.current.submit();
    }
  },[trackMessageIds]);

  if (!customerId) {
    return '暂无客户';
  }






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
        <span>{data.createTime}</span>
      ),
    };
  };

  const searchForm = () => {
    return (
      <div>
        <FormItem
          placeholder="trackMessageId"
          hidden
          value={trackMessageIds}
          name="trackMessageIds"
          component={SysField.Name}
        />
        {/*<FormItem*/}
        {/*  placeholder="classify"*/}
        {/*  hidden*/}
        {/*  value={classify || ' '}*/}
        {/*  name="classify"*/}
        {/*  component={SysField.Name} />*/}
        {/*<FormItem*/}
        {/*  placeholder="classifyId"*/}
        {/*  hidden*/}
        {/*  value={classifyId || ' '}*/}
        {/*  name="classifyId"*/}
        {/*  component={SysField.Name}*/}
        {/*/>*/}
      </div>
    );
  };

  return (
    <div>
      <Table
        searchForm={searchForm}
        headStyle={{display: 'none'}}
        rowSelection
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
