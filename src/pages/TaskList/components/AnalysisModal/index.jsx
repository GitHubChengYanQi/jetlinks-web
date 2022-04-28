import {Button, Space} from 'antd';
import React, {useState} from 'react';
import {useHistory} from 'ice';
import Modal from '@/components/Modal';
import AnalysisDetail from '@/pages/Erp/Analysis/AnalysisDetail';

const AnalysisModal = ({showRef}) => {

  const [content, seContent] = useState({});

  const history = useHistory();

  return <>
    <Modal
      width="auto"
      headTitle="物料推荐"
      component={AnalysisDetail}
      onSuccess={(res) => {
        seContent(res);
      }}
      footer={<Space>
        <Button onClick={() => {
          showRef.current.close();
        }}>关闭</Button>
        <Button disabled={!Array.isArray(content.owe) || content.owe.length === 0} type="primary" onClick={() => {
          const skus = content.owe.map((item) => {
            return {skuId: item.skuId, applyNumber: item.lackNumber};
          });
          showRef.current.close();
          history.push(`/purchase/purchaseAsk/add?skus=${JSON.stringify(skus)}`);
        }}>发起采购</Button>
      </Space>}
      ref={showRef}
    />
  </>;
};

export default AnalysisModal;
