import React, {useRef} from 'react';
import {EditOutlined} from '@ant-design/icons';
import Modal2 from '@/components/Modal';
import {Button, Comment, List} from 'antd';
import CrmBusinessTrackEdit from '@/pages/Crm/crmBusinessTrack/crmBusinessTrackEdit';
import {useRequest} from '@/util/Request';
import styles from './index.module.scss';


const Track = (props) => {

  const {value} = props;

  const ref = useRef(null);

  const {data, run} = useRequest({url: '/crmBusinessTrack/list', method: 'POST', data: {businessId: value.businessId}});

  const datas = data ? data.map((value, index) => {
    return {
      actions: [<span onClick={()=>{ref.current.open(value.trackId);}}>编辑</span>],
      author: value.user[0] ? value.user[0].account : '--',
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
    <div style={{overflowY:'auto',height:700,overflowX:'hidden',position:'relative'}}>
      <Button style={{width: '100%',position:'absolute',top:0,left:0}} onClick={() => {
        ref.current.open(false);
      }} className="button-left-margin" icon={<EditOutlined />}>添加跟踪</Button>
      <List
        className={styles.list}
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
