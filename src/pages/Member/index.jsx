import React from 'react';
import { Row, Col, Card, Avatar, Image, Skeleton, Divider, Typography, Input, Radio, DatePicker } from 'antd';
import { Form, FormItem, FormButtonGroup, Submit } from '@formily/antd';
import moment from 'moment';
import { useRequest } from '@/util/Request';
import store from '@/store';
import { config } from 'ice';
import { userSave } from '@/Config/ApiUrl/system/user';

import { currentUserInfo } from './apiUrl';

import styles from './index.module.scss';

const Member = () => {


  const { data, run: get } = useRequest(currentUserInfo, {
    formatResult: ({ data }) => {
      console.log(data);
      const values = {
        ...data,
        birthday: moment(data.birthday, 'YYYY-MM-DD')
      };
      return values;
    }
  });
  const [userInfo] = store.useModel('user');
  const { run: save, loading } = useRequest(userSave, {
    manual: true,
    onSuccess: () => {
      get();
    }
  });

  return (
    <Row style={{ margin: 16 }}>
      <Col span={12} offset={6}>
        <Row gutter={16}>
          <Col span={8}>
            <Card>
              {data ?
                <>
                  <Typography.Paragraph className={styles.center}>
                    <Avatar
                      size={104}
                      src={`${config.baseURI}${userInfo.avatar}`}

                    />
                    <Typography.Title level={3}>{data.name}</Typography.Title>
                    <Typography.Paragraph>{data.roleName}</Typography.Paragraph>
                    <Typography.Paragraph>{data.deptName}-{data.positionNames}</Typography.Paragraph>
                  </Typography.Paragraph>
                  <Divider/>
                  <Typography.Paragraph className={styles.center}>
                    <Typography.Paragraph>{data.email}</Typography.Paragraph>
                    <Typography.Paragraph>{data.phone}</Typography.Paragraph>
                  </Typography.Paragraph>
                </> :
                <Skeleton/>}

            </Card>
          </Col>
          <Col span={16}>
            <Card title="基本资料">
              {data ? <>
                <Form
                  labelCol={5}
                  wrapperCol={7}
                  initialValues={data}
                  onSubmit={async (values) => {
                    return await save({ data: values });
                  }}>
                  <FormItem component={Input} label="账号" placeholder="请输入账号" name="account" editable={false}/>
                  <FormItem component={Input} label="姓名" required placeholder="请输入姓名" name="name"/>

                  <FormItem label="性别" name="sex" component={Radio.Group} options={[
                    { label: '男', value: 'M' },
                    { label: '女', value: 'F' },
                  ]}/>
                  <FormItem label="生日" name="birthday" component={DatePicker}/>
                  <FormItem component={Input} label="邮箱" required placeholder="请输入邮箱" name="email"/>
                  <FormItem component={Input} label="电话" placeholder="请输入电话" name="phone"/>
                  <FormButtonGroup offset={5}>
                    <Submit showLoading loading={loading}>更新基本信息</Submit>
                  </FormButtonGroup>
                </Form>
              </> : <Skeleton/>}
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Member;
