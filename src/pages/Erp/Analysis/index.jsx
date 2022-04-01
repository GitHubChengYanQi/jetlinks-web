import React, {useRef} from 'react';
import {Button, Space} from 'antd';
import Modal from '@/components/Modal';
import SkuList from '@/pages/Erp/Analysis/SkuList';
import {useRequest} from '@/util/Request';
import Message from '@/components/Message';

const Analysis = ({type}) => {

  const skuRef = useRef();

  const ref = useRef();


  const {loading, run} = useRequest({
    url: '/mes/analysis',
    method: 'POST',
  }, {
    manual: true,
    onSuccess: () => {
      Message.success('分析成功，请在任务列表查看！');
    },
    onError: () => {
      Message.error('分析失败!');
    },
  });


  return (
    <div>

      <Button type={type} onClick={() => {
        ref.current.open(true);
      }}>物料分析</Button>

      <Modal
        width={500}
        headTitle='物料分析'
        ref={ref}
        footer={<Space>
          <Button onClick={() => {
            ref.current.close();
          }}>关闭</Button>
          <Button
            loading={loading}
            type='primary'
            onClick={() => {
              const skuList = skuRef.current.skuList;
              console.log(skuList);
              run({
                data: {
                  skuIds: skuList.map((item) => {
                    return {
                      skuId: item.skuId,
                      num: item.num,
                      fixed: item.fixed,
                    };
                  })
                }
              });
            }}
          >开始分析</Button>
        </Space>}
      >
        <SkuList ref={skuRef}/>
      </Modal>

    </div>
  );
};

export default Analysis;
