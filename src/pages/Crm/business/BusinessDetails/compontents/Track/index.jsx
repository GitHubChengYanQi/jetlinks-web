import React, {useRef} from 'react';
import {EditOutlined} from '@ant-design/icons';
import Modal2 from '@/components/Modal';
import {Button, Comment, List} from 'antd';
import CrmBusinessTrackEdit from '@/pages/Crm/business/crmBusinessTrack/crmBusinessTrackEdit';
import {useRequest} from '@/util/Request';


const Track = (props) => {

  const {value} = props;

  const ref = useRef(null);

  const {data, run} = useRequest({url: '/crmBusinessTrack/list', method: 'POST', data: {businessId: value.businessId}});

  const datas = data ? data.map((value, index) => {
    return {
      actions: [<span onClick={()=>{ref.current.open(value.trackId);}}>编辑</span>],
      author: value.user.account ? value.user.account : '--',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: (
        <>
          <p>
            <p style={{color:'#91959e'}}>记录内容</p>
            <p style={{padding:10}}>{value.note}</p>
          </p>
          {value.type ?<p>
            <span style={{color:'#91959e'}}>跟进类型：{value.type}</span>
          </p> : null}
        </>
      ),
      datetime: (
        <span>{value.createTime}</span>
      ),
    };
  }) : [];

  return (
    <div>
      <Button style={{width: '100%'}} onClick={() => {
        ref.current.open(false);
      }} className="button-left-margin" icon={<EditOutlined />}>添加跟踪</Button>
      <List
        header={`${datas.length} 条跟踪`}
        itemLayout="horizontal"
        dataSource={datas}
        renderItem={item => (
          <li>
            <Comment
              actions={item.actions}
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            />
          </li>
        )}
      />,
      <Modal2 width={800} title="编辑" component={CrmBusinessTrackEdit} onSuccess={() => {
        run();
        ref.current.close();
      }} ref={ref} val={value} />
    </div>
  );
};

export default Track;
