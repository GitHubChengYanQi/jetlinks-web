import React, {useImperativeHandle, useRef, useState} from 'react';
import ProSkeleton from '@ant-design/pro-skeleton';
import Modal from '@/components/Modal';
import Message from '@/components/Message';
import ProcessSteps from '@/pages/Process/Action/components/ProcessSteps';
import {useRequest} from '@/util/Request';
import {actionPurchaseAsk, createPurcaseAsk} from '@/pages/Workflow/Documents/components/Module/purchaseAsk';
import {actionInstockAsk, createInstockAsk} from '@/pages/Workflow/Documents/components/Module/instock';
import Comments from '@/pages/Workflow/Documents/components/Comments';

const getTaskIdApi = {url: '/activitiProcessTask/getTaskIdByFromId', method: 'GET'};
const auditDetail = {url: '/audit/detail', method: 'GET'};

const Documents = ({...props}, ref) => {

  // ref
  // 单据弹窗Ref
  const modalRef = useRef();
  // 采购申请ref
  const purchaseAskAddRef = useRef();

  // state
  // 单据内容
  const [document, setDocument] = useState();
  // 单据创建loading
  const [addLoading, setAddLoading] = useState();
  // 单据弹窗loading
  const [modalProps, setModalProps] = useState({width: 500, title: '创建单据', footer: []});
  // 审批流程组件props
  const [processProps, setProcessProps] = useState({data: null, createName: '', type: '', card: false});
  // 是否是创建单据
  const [createDocument, setCreateDocument] = useState(true);

  // request
  // 通过formId获取taskId
  const {run: getTaskId} = useRequest(getTaskIdApi, {manual: true});
  // 审批详情接口
  const {loading, data, run, refresh} = useRequest(
    auditDetail,
    {
      manual: true,
      onSuccess: (res) => {
        if (!res) {
          return Message.error('参数错误！');
        }

        switch (res.type) {
          case 'purchaseAsk':
            actionPurchaseAsk({setDocument, setModalProps, res, run, modalRef});
            break;
          case 'createInstock':
            actionInstockAsk({setDocument, setModalProps, res, run, modalRef});
            break;
          default:
            break;
        }
        setProcessProps({data: res.stepsResult, createName: res.createName, card: true});
        setCreateDocument(false);
        modalRef.current.open(true);
      }
    },
  );


  // 创建单据
  const create = (type, value) => {
    switch (type) {
      case 'purchaseAsk':
        createPurcaseAsk({
          setModalProps,
          setDocument,
          addLoading,
          type,
          purchaseAskAddRef,
          modalRef,
          setAddLoading,
          value
        });
        break;
      case 'instockAsk':
        createInstockAsk({
          setModalProps,
          setDocument,
          addLoading,
          type,
          purchaseAskAddRef,
          modalRef,
          setAddLoading,
          value
        });
        break;
      default:
        break;
    }
    setProcessProps({type, card: true});
    setCreateDocument(true);
    modalRef.current.open(true);
  };

  // 单据操作
  const action = async (id, formId, type) => {
    if (!(id || (formId && type))) {
      return Message.warning('参数不正确！');
    }
    if (formId) {
      const taskId = await getTaskId({params: {formId, type}});
      if (!taskId) {
        return Message.warning('参数不正确！');
      }
      run({params: {taskId}});
    } else {
      run({params: {taskId: id,}});
    }
  };

  useImperativeHandle(ref, () => ({
    create,
    action,
  }));

  return <>
    <Modal
      width={modalProps.width}
      headTitle={modalProps.title}
      ref={modalRef}
      footer={modalProps.footer}
    >
      {
        loading ?
          <ProSkeleton type="descriptions" />
          :
          <div style={{padding: 24}}>
            {document}
            <ProcessSteps {...processProps} />
            {!createDocument && data &&
            <Comments
              taskId={data.processTaskId}
              data={data.remarks}
              refresh={refresh}
            />}
          </div>
      }

    </Modal>

  </>;
};

export default React.forwardRef(Documents);
