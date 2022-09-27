import React from 'react';
import {Descriptions, message, Modal} from 'antd';
import {useRequest} from '@/util/Request';
import {customerStart} from '@/pages/systemManage/Tenant/url';
import DownloadFile from '@/components/DownloadFile';

const Info = ({
  data = {},
  visible,
  close = () => {
  },
  success = () => {
  },
}) => {

  const {loading, run} = useRequest(customerStart, {
    manual: true,
    onSuccess: () => {
      message.success('通过成功！');
      success();
    }
  });

  return <>
    <Modal
      width={800}
      onCancel={close}
      title="租户信息确认"
      open={visible}
      okButtonProps={{loading}}
      okText="通过"
      onOk={() => {
        run({data: {customerIds: [data.customerId]}});
      }}>
      <Descriptions column={1} bordered labelStyle={{width: '30%', textAlign: 'center'}}>
        <Descriptions.Item label="企业名称">{data.name}</Descriptions.Item>
        <Descriptions.Item label="统一社会信用代码">{data.code}</Descriptions.Item>
        <Descriptions.Item label="企业经营场所">{data.place}</Descriptions.Item>
        <Descriptions.Item label="管理员姓名">{data.contactName}</Descriptions.Item>
        <Descriptions.Item label="管理员手机号码">{data.contactPhone}</Descriptions.Item>
        <Descriptions.Item label="管理员账号">{data.adminAccount}</Descriptions.Item>
        <Descriptions.Item label="身份证号">{data.legalPersonCard}</Descriptions.Item>
        <Descriptions.Item label="营业执照"><DownloadFile fileId={data.file} fileName={data.fileName}/></Descriptions.Item>
        <Descriptions.Item label="提交时间">{data.createTime}</Descriptions.Item>
      </Descriptions>
    </Modal>
  </>;
};

export default Info;
