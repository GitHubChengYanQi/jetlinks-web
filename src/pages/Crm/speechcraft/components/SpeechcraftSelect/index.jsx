import React, {useState} from 'react';
import {Divider, Typography, List, Input, Spin} from 'antd';
import {useRequest} from '@/util/Request';
import {speechcraftList} from '@/pages/Crm/speechcraft/speechcraftUrl';

const SpeechcraftSelect = ({...props}) => {

  const {loading,data: speechcraft, run} = useRequest(speechcraftList);

  const [value, setValue] = useState();

  const data = speechcraft && speechcraft.length > 0 ? speechcraft.map((items, index) => {
    return {items};
  }) : [];


  return (
    <div style={{padding:200,backgroundColor:'#fff',height:'100%'}}>
      <Divider orientation="center">
        <Input.Search
          style={{width: 500}}
          enterButton
          placeholder="输入关键字搜索"
          onChange={async (value)=>{
            setValue(value.target.value);
            await run({
              data: {
                speechcraftKey: value.target.value
              }
            });
          }}
          onSearch={async (value) => {
            setValue(value);
            await run({
              data: {
                speechcraftKey: value
              }
            });
          }} />
      </Divider>
      <List
        header={<div>关键字：{value || '暂无'}</div>}
        footer={<div>已查出{data && data.length}条</div>}
        bordered
        dataSource={data}
        renderItem={item => {
          if (loading){
            return  <div style={{textAlign:'center',marginTop:50}}> <Spin size="large" /></div>;
          }
          return (
            <List.Item>
              <Typography.Text mark>[标题:{item.items.speechcraftTitle}]</Typography.Text> {item.items.speechcraftDetails}
            </List.Item>
          );

        }

        }
      />
    </div>
  );
};
export default SpeechcraftSelect;
