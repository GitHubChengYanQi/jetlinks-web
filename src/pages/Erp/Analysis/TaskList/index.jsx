import React, {useEffect, useRef} from 'react';
import {Button, List as AntList, Popover, Progress, Space, Spin,} from 'antd';
import {UnorderedListOutlined} from '@ant-design/icons';
import cookie from 'js-cookie';
import {useRequest} from '@/util/Request';
import store from '@/store';
import AnalysisModal from '@/pages/Erp/Analysis/TaskList/components/AnalysisModal';
import SkuImport from '@/pages/Erp/Analysis/TaskList/components/SkuImport';
import SpuImport from '@/pages/Erp/Analysis/TaskList/components/SpuImport';


const TaskList = () => {

  const [state, dataDispatchers] = store.useModel('dataSource');

  const showRef = useRef();
  const skuImportRef = useRef();
  const spuImportRef = useRef();

  const {loading, cancel, data: List, run} = useRequest({
    url: '/asynTask/list',
    method: 'POST'
  }, {
    manual: true,
    pollingInterval: 2000,
  });

  useEffect(() => {
    if (state.showTaskList) {
      run();
    } else if (List) {
      cancel();
    }
  }, [state.showTaskList]);

  const taskList = () => {
    return <div style={{minWidth: 500, maxHeight: '50vh', overflow: 'auto'}}>
      <Spin spinning={!List && loading} tip="加载中...">
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

                  <Button type="link" onClick={() => {
                    switch (item.type) {
                      case '物料分析':
                        showRef.current.open(item.taskId);
                        break;
                      case '物料导入':
                        skuImportRef.current.open(item.taskId);
                        break;
                      case '产品导入':
                        spuImportRef.current.open(item.taskId);
                        break;
                      default:
                        break;
                    }
                    dataDispatchers.opentaskList(false);
                  }}>查看</Button>
                </Space>
              }
            >
              <AntList.Item.Meta
                title={item.type}
                description={item.createTime}
              />
            </AntList.Item>;

          }}
        />
      </Spin>

    </div>;
  };

  return <>
    <Popover
      visible={state.showTaskList}
      placement="bottomRight"
      onVisibleChange={dataDispatchers.opentaskList}
      title="任务列表"
      content={taskList}
      trigger="click"
    >
      <Button style={{color: '#fff'}} type="text" onClick={() => {
        dataDispatchers.opentaskList(true);
      }}>
        <UnorderedListOutlined />
      </Button>
    </Popover>

    <AnalysisModal showRef={showRef} />

    <SkuImport ref={skuImportRef} />

    <SpuImport ref={spuImportRef} />

  </>;
};

export default TaskList;
