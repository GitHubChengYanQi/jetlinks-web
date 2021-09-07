import React, {useRef} from 'react';
import {EditOutlined} from '@ant-design/icons';
import Modal2 from '@/components/Modal';
import {Button, Comment, List, Table as AntTable} from 'antd';
import CrmBusinessTrackEdit from '@/pages/Crm/business/crmBusinessTrack/crmBusinessTrackEdit';
import {useRequest} from '@/util/Request';
import Table from '@/pages/Crm/customer/CustomerDetail/compontents/Table';
import * as SysField from '@/pages/Crm/customer/CustomerField';
import Form from '@/components/Form';

const {Column} = AntTable;
const {FormItem} = Form;


const Track = (props) => {

  const {value} = props;

  const ref = useRef(null);
  const tableRef = useRef(null);


  const datas = (value) => {
    return {
      actions: [<span onClick={() => {
        ref.current.open(value.trackId);
      }}>编辑</span>],
      author: value.user.name ? value.user.name : '--',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: (
        <>
          <p>
            <p style={{color: '#91959e'}}>记录内容</p>
            <p style={{padding: 10}}>{value.note}</p>
          </p>
          {value.type ? <p>
            <span style={{color: '#91959e'}}>跟进类型：{value.type}</span>
          </p> : null}
          <p>
            <span style={{color: '#91959e'}}>是否报价：{value.offer === 0 ? '是' : '否'}</span>
          </p>
          {value.money ? <p>
            <span style={{color: '#91959e'}}>报价金额：{value.money}</span>
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
      <Button style={{width: '100%'}} onClick={() => {
        ref.current.open(false);
      }} className="button-left-margin" icon={<EditOutlined />}>添加跟踪</Button>
      <Table
        searchForm={searchForm}
        selectionType
        showHeader={false}
        dynamic
        ref={tableRef}
        showSearchButton={false}
        api={{
          url: '/crmBusinessTrack/list', method: 'POST'
        }}
        rowKey="trackId"
      >
        <Column render={(text, record) => {
          return (
            <Comment
              {...datas(record)}
            />
          );
        }} />

      </Table>
      <Modal2 width={1000} component={CrmBusinessTrackEdit} onSuccess={() => {
        ref.current.close();
        tableRef.current.refresh();
      }} ref={ref} val={value} />
    </div>
  );
};

export default Track;
