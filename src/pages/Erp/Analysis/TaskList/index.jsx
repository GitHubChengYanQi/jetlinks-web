import React, {useRef, useState} from 'react';
import {Button, List as AntList, Popover, Progress, Space, Spin,} from 'antd';
import {UnorderedListOutlined} from "@ant-design/icons";
import {useRequest} from '@/util/Request';
import Modal from '@/components/Modal';
import AnalysisDetail from '@/pages/Erp/Analysis/AnalysisDetail';
import PurchaseAsk from "@/pages/Erp/Analysis/TaskList/components/PurchaseAsk";

const TaskList = () => {

  const [visible, setVisible] = useState();

  const [content, seContent] = useState({});

  const showRef = useRef();

  const purchaskAskRef = useRef();

  const {loading, data: List} = useRequest({
    url: '/asynTask/list',
    method: 'POST'
  }, {
    pollingInterval: 5000,
  });

  const taskList = () => {
    return <div style={{minWidth: 500, maxHeight: '50vh', overflow: 'auto'}}>
      <Spin spinning={!List && loading}>
        <AntList
          dataSource={List || []}
          renderItem={item => {
            return <AntList.Item
              extra={
                <Space>
                  <div style={{width: 200}}>
                    <Progress
                      strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                      }}
                      percent={(Math.floor((item.count / item.allCount) * 100))}
                    />
                  </div>

                  <Button type='link' onClick={() => {
                    switch (item.type) {
                      case '物料分析':
                        setVisible(false);
                        showRef.current.open(item.taskId);
                        break;
                      default:
                        break;
                    }
                  }}>查看</Button>
                </Space>
              }
            >
              <AntList.Item.Meta
                title={item.type}
                description={item.createTime}/>
            </AntList.Item>;

          }}
        />
      </Spin>
    </div>;
  };

  return <>
    <Popover
      visible={visible}
      placement="bottomRight"
      onVisibleChange={setVisible}
      title='任务列表'
      content={taskList}
      trigger="click"
    >
      <Button style={{color: '#fff'}} type='text' onClick={() => {
        setVisible(true);
      }}>
        <UnorderedListOutlined/>
      </Button>
    </Popover>

    <Modal
      width='auto'
      headTitle='物料推荐'
      component={AnalysisDetail}
      onSuccess={(res) => {
        seContent(res);
      }}
      footer={<Space>
        <Button onClick={() => {
          showRef.current.close();
        }}>关闭</Button>
        <Button disabled={!Array.isArray(content.owe) || content.owe.length === 0} type='primary' onClick={() => {
          purchaskAskRef.current.open(true);
        }}>发起采购</Button>
      </Space>}
      ref={showRef}
    />

    <PurchaseAsk skus={content.owe} ref={purchaskAskRef}/>

  </>;
};

export default TaskList;
