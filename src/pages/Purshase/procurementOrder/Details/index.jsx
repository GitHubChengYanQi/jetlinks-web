import {useHistory, useParams} from 'ice';
import React, {useState} from 'react';
import ProSkeleton from '@ant-design/pro-skeleton';
import {Badge, Button, Card, Descriptions, Empty, Modal, Space} from 'antd';
import {useRequest} from '@/util/Request';
import styles from '@/pages/Crm/customer/CustomerDetail/index.module.scss';
import Breadcrumb from '@/components/Breadcrumb';
import {procurementOrderDetail} from '@/pages/Purshase/procurementOrder/procurementOrderUrl';
import ProcurementOrderDetailList
  from '@/pages/Purshase/procurementOrder/components/procurementOrderDetail/procurementOrderDetailList';
import {contractList} from '@/pages/Crm/contract/ContractUrl';

const Detail = () => {

  const params = useParams();

  const history = useHistory();

  const [contracts, setContracts] = useState();

  const {loading, data} = useRequest(procurementOrderDetail, {
    defaultParams: {
      data: {
        procurementOrderId: params.cid
      }
    }
  });

  const gridStyle = {
    width: '100%',
    textAlign: 'center',
    cursor:'pointer',
  };

  const {run} = useRequest(contractList, {
    manual: true,
    onSuccess: (res) => {
      if (res && res.length > 0) {
        setContracts(res);
      }
    }
  });

  if (loading) {
    return (<ProSkeleton type="descriptions" />);
  }

  if (!data) {
    return <Empty />;
  }

  const status = (value) => {
    switch (value) {
      case 0:
        return <Badge text="审批中" color="yellow" />;
      case 97:
        return <Badge text="已拒绝" color="red" />;
      case 99:
        return <Badge text="已同意" color="green" />;
      default:
        break;
    }
  };

  return (
    <div className={styles.detail} style={{overflowX: 'hidden'}}>
      <Card title={<Breadcrumb />} extra={<Space>
        <Button onClick={() => {
          run({
            data: {
              source: '采购单',
              sourceId: data.procurementOrderId
            }
          });
        }}>查看合同</Button>
        <Button onClick={() => {
          history.push('/purchase/procurementOrder');
        }}>返回</Button>
      </Space>} />
      <div className={styles.main}>
        <Card title="基本信息">
          <Descriptions>
            <Descriptions.Item label="采购单">{data.procurementOrderId}</Descriptions.Item>
            <Descriptions.Item label="创建人">{data.user && data.user.name}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
            <Descriptions.Item label="状态">{status(data.status)}</Descriptions.Item>
          </Descriptions>
        </Card>
      </div>

      <div
        className={styles.main}>
        <Card title="物料信息" bodyStyle={{padding: 0}}>
          <ProcurementOrderDetailList value={data.procurementOrderId} />
        </Card>
      </div>

      <Modal
        title={<div style={{textAlign:'center'}}>选择合同</div>}
        visible={contracts}
        footer={null}
        closable={false}
        centered
        onCancel={()=>setContracts(false)}
      >
        <Card>
          {
            contracts && contracts.map((item, index) => {
              return <Card.Grid
                key={index}
                style={gridStyle}
                onClick={()=>{
                  history.push(`/CRM/contract/${item.contractId}`);
                }}
              >
                {item.name}
              </Card.Grid>;
            })
          }
        </Card>
      </Modal>
    </div>
  );
};

export default Detail;
