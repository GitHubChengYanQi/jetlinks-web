import React, {useEffect} from 'react';
import {Avatar, Col, Divider, Row, Space, Statistic} from 'antd';
import styles from '@/pages/Overview/index.module.scss';
import {useRequest} from '@/util/Request';
import ProSkeleton from '@ant-design/pro-skeleton';
import moment from 'moment';

const Head = () => {

  const {loading, data} = useRequest({url: '/rest/system/currentUserInfo', method: 'POST'});
  const date = () => {
    const hours = moment().hours();
    if (hours > 5 && hours < 8){
      return {
        hours:'早安',
        title:'世界那么大,但你依然可以让自己闪闪发光,只要你相信自己可以!'
      };
    }else if (hours < 12){
      return {
        hours:'上午好',
        title:'每天进步一点点，每天创造一点点，每天做事多一点，愿你事事都领先，卓越成绩现眼前，美好生活一天又一天！'
      };
    }else if (hours < 18){
      return {
        hours:'下午好',
        title:'不管忙不忙碌，有牵挂就好，不管联不联系，能想起就好，祝福总是相互的，不管身在何处，照顾好自我就是给对方最大的安慰，愿你的工资天天上升，情绪时时开心。'
      };
    }else if (hours < 22){
      return {
        hours:'晚上好',
        title:'生活总会有酸有甜，能微笑面对便是强者；人生总会有得有失，能平淡看待便是智者；朋友总会有聚有散，能经常联系便是知己。'
      };
    }else {
      return {
        hours:'夜深了，早点休息，晚安~',
        title:'一切问题，都是时间问题，一切烦恼，都是自寻烦恼。心中无尘，心自安。烦恼由心生。'
      };
    }
  };


  if (loading){
    return (<ProSkeleton type="descriptions" />);
  }




  return (
    <Row justify="space-between">
      <Col>
        <Row gutter={24}>
          <Col>
            <Avatar size={64} src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png">头像</Avatar>
          </Col>
          <Col>
            <h3 className={styles.sayHi}>{date().hours}，{data.name}，{date().title}</h3>
            <div>
              <div style={{marginBottom: 10}}>
                <em>{data.roleName}&nbsp;&nbsp;/&nbsp;&nbsp; 道昕智造－{data.deptName}－{data.positionNames}</em>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
      <Col className={styles.statistic}>
        <Space split={<Divider type="vertical" />}>
          <Statistic title="项目数" value={93} suffix="/132" />
          <Statistic title="团队排名" value={3} suffix="/12" />
        </Space>
      </Col>
    </Row>
  );
};

export default Head;
