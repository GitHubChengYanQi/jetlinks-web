import React, {useState} from 'react';
import {Button, Modal, Result} from 'antd';
import {useRequest} from '@/util/Request';
import {businessDetail} from '@/pages/Crm/business/BusinessUrl';
import Description from '@/pages/Crm/business/BusinessDetails/compontents/Description';
import TableDetail from '@/pages/Crm/business/BusinessEdit/components/TableDetail';
import {useHistory} from 'ice';

const BusinessComplete = (props) => {
  const {result, disabled} = props;
  const [visi, setVisi] = useState(false);
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState(false);
  const history = useHistory();

  const {run} = useRequest(businessDetail, {
    manual: true,
    onSuccess: (res) => {
      setData(res);
      setVisi(true);
    }
  });


  return (
    <>
      <Result
        status="success"
        title="Successfully Purchased Cloud Server ECS!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button type="primary" style={disabled === false ? {'display' : 'none'} :  null } key="console" onClick={() => {
            props.onChange(1);
          }}>
            再加一条
          </Button>,

          <Button key="2" onClick={() => {
            setDetail(true);
          }}>
            完善明细
          </Button>,
          <Button  key="1" type="link" onClick={() => {
            history.push(`/CRM/business/${result}`);
          }}>查看详情</Button>,
          // <Button key="1" onClick={() => {
          //
          //   run({data: {
          //     businessId: result
          //   }});
          //
          // }}>
          //   查看详情
          // </Button>,
            }});
        ]}

      />
      <Modal title='项目详情' visible={visi} width={800} onCancel={() => {
        setVisi(false);
      }} onOk={() => {
        setVisi(false);
      }}>
        <Description data={data || null} />
      </Modal>
      <Modal title='创建结果' visible={detail} width={900} onCancel={() => {
        setDetail(false);
      }} onOk={() => {
        setDetail(false);
      }}>
        <TableDetail value={result} />
      </Modal>
    </>
  );
};
export default  React.forwardRef(BusinessComplete);
