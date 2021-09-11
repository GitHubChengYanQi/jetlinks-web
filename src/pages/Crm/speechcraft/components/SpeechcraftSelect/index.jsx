import React, {useState} from 'react';
import {Divider, Typography, List, Input} from 'antd';
import {useRequest} from '@/util/Request';
import {speechcraftList} from '@/pages/Crm/speechcraft/speechcraftUrl';

const SpeechcraftSelect = () => {

  const {data: speechcraft, run} = useRequest(speechcraftList);

  const [value, setValue] = useState();

  const data = speechcraft && speechcraft.length > 0 ? speechcraft.map((items, index) => {
    return {items};
  }) : [];


  return (
    <div style={{padding:200}}>
      <Divider orientation="center">
        <Input.Search
          style={{width: 500}}
          enterButton
          placeholder="输入关键字搜索"
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
