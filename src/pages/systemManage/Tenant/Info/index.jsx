import React, {useEffect, useRef} from 'react';
import {Button, Descriptions, message, Spin} from 'antd';
import {useRequest} from '@/util/Request';
import {customerDetail, customerEdit, customerStart} from '@/pages/systemManage/Tenant/url';
import DownloadFile from '@/components/DownloadFile';
import Password from '@/pages/Login/AccountAsk/components/Password';
import {PrimaryButton} from '@/components/Button';
import Modal from '@/components/Modal';

const Info = ({
  customerId,
  visible,
  detail,
  close = () => {
  },
  success = () => {
  },
}) => {
  const ref = useRef();

  const {loading, run} = useRequest(customerStart, {
    manual: true,
    onSuccess: () => {
      message.success('通过成功！');
      success();
    }
  });

  const {loading: detailLoading, data = {}, run: getDetail} = useRequest(customerDetail, {manual: true});

  useEffect(() => {
    if (visible) {
      ref.current.open(false);
    } else {
      ref.current.close();
    }
    if (customerId) {
      getDetail({data: {customerId}});
    }
  }, [visible]);

  const {loading: editLoading, run: edit} = useRequest(customerEdit, {
    manual: true,
    response: true,
    onSuccess: () => {
      message.success('重置密码成功!');
    }
  });

  return <>
    <Modal
      ref={ref}
      width={800}
      headTitle={data.detail ? '租户详情' : '租户信息确认'}
      footer={data.detail ? null : [
        <Button key={0} onClick={close}>取消</Button>,
        <PrimaryButton loading={loading} key={1} onClick={() => {
          run({data: {customerIds: [data.customerId]}});
        }}>通过</PrimaryButton>
      ]}
    >
      <Spin spinning={detailLoading}>
        <Descriptions column={1} bordered labelStyle={{width: '30%', textAlign: 'center'}}>
          <Descriptions.Item label="企业名称">{data.name}</Descriptions.Item>
          <Descriptions.Item label="统一社会信用代码">{data.code}</Descriptions.Item>
          <Descriptions.Item label="企业经营场所">{data.place}</Descriptions.Item>
          <Descriptions.Item label="可用短信条数">{data.total || 0}</Descriptions.Item>
          <Descriptions.Item label="管理员姓名">{data.contactName}</Descriptions.Item>
          <Descriptions.Item label="管理员手机号码">{data.contactPhone}</Descriptions.Item>
          <Descriptions.Item label="管理员账号">{data.adminAccount}</Descriptions.Item>
          {(detail && data.customerId) && <Descriptions.Item label="管理员密码">
            <Password
              loading={editLoading}
              reset
              content="您确定要重置密码么？重置后默认初始密码为【opt123】"
              initPassword={() => {
                return 'opt123';
              }}
              show
              placeholder="请输入企业管理员账号密码"
              onChange={(adminPassword) => {
                edit({data: {customerId: data.customerId, adminPassword}});
              }}
            />
          </Descriptions.Item>}
          <Descriptions.Item label="身份证号">{data.legalPersonCard}</Descriptions.Item>
          <Descriptions.Item label="营业执照">
            <DownloadFile fileId={data.file} fileName={data.fileName} />
          </Descriptions.Item>
          <Descriptions.Item label="提交时间">{data.createTime}</Descriptions.Item>
        </Descriptions>
      </Spin>
    </Modal>
  </>;
};

export default Info;
