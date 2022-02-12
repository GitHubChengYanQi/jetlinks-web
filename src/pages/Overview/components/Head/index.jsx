import React from 'react';
import {Avatar, Col, Empty, Row} from 'antd';
import ProSkeleton from '@ant-design/pro-skeleton';
import moment from 'moment';
import styles from '@/pages/Overview/index.module.scss';
import {useRequest} from '@/util/Request';
import BusinessNumber from '@/pages/Overview/components/BusinessNumber';
import store from '@/store';

const Head = () => {

  const [userInfo] = store.useModel('user');

  if (!window.sessionStorage.getItem('num')) {
    window.sessionStorage.setItem('num', 0);
  }
  window.onbeforeunload = () => {
    // eslint-disable-next-line radix
    if (parseInt(window.sessionStorage.getItem('num')) < 3) {
      // eslint-disable-next-line radix
      window.sessionStorage.setItem('num', parseInt(window.sessionStorage.getItem('num')) + 1);
    } else {
      window.sessionStorage.setItem('num', 0);
    }

  };

  const num = window.sessionStorage.getItem('num');

  const morning = [
    '认真到底 终有回响',
    '人生无常，心安便是归处',
    '不管天气怎样，给自己的世界一片晴朗',
    '惜时光，演绎精彩生活',
  ];

  const onMorning = [
    '用心每一天，不忘初心，方能走远',
    ' 最困难的时刻，也许就是拐点的开始',
    '认真到底 终有回响',
    '惜时光，演绎精彩生活',
  ];
  const underMorning = [
    '下午的时光是幸福的，每一步都走得浪漫',
    '平常心看世界，花开花落皆是风景',
    '天道酬勤，小憩更佳',
    '偷偷挤进一缕斜阳，送来满满幸福',
  ];
  const evening = [
    '快乐的人生，不在遥远的未来，在当下获得',
    '在醒着的时间里，追求你认为最有意义的',
    '惜时光，演绎精彩生活',
    '天道酬勤，小憩更佳',
  ];
  const night = [
    '依心而行，无憾今生',
    '有事做有所期待，日子就是幸福的',
    '人生无常，心安便是归处',
    '惜时光，演绎精彩生活',
  ];

  const {loading, data} = useRequest({url: '/rest/system/currentUserInfo', method: 'POST'});

  const date = () => {
    const hours = moment().hours();
    if (hours > 5 && hours < 8) {
      return {
        hours: '早安',
        title: morning[num]
      };
    } else if (hours < 12) {
      return {
        hours: '上午好',
        title: onMorning[num]
      };
    } else if (hours < 18) {
      return {
        hours: '下午好',
        title: underMorning[num]
      };
    } else if (hours < 22) {
      return {
        hours: '晚上好',
        title: evening[num]
      };
    } else {
      return {
        hours: '夜深了，早点休息，晚安~',
        title: night[num]
      };
    }
  };

  if (!data) {
    return <Empty />;
  }

  if (loading) {
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
                <em>{data.roleName}&nbsp;&nbsp;/&nbsp;&nbsp; {userInfo.customerName}－{data.deptName}－{data.positionNames}</em>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
      <Col className={styles.statistic}>
        <BusinessNumber />
      </Col>
    </Row>
  );
};

export default Head;
