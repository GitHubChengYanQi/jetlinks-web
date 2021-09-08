import React from 'react';
import {Descriptions, Image} from 'antd';

const Desc = (props) => {

  const {data} = props;
  if (data) {

    const banners = data.bannerResult ? data.bannerResult.map((items,index)=>{
      return <div key={index} style={{marginRight:20,maxWidth:200}}><Image   src={items.imgUrl} /></div>;
    }) : undefined;

    return (
      <>
        <Descriptions>
          <Descriptions.Item label="报修设备">{data.deliveryDetailsResult ? data.deliveryDetailsResult.itemId : '未填写'  }</Descriptions.Item>
          <Descriptions.Item label="产品品牌">{data.deliveryDetailsResult ?  '未填写' : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="需求类型">{data.serviceType ? data.serviceType : '未填写'}</Descriptions.Item>

          <Descriptions.Item label="报修时间">{data.createTime ? data.createTime : '未填写'  }</Descriptions.Item>
          <Descriptions.Item label="维保金额">{data.money ? `￥${data.money}` : '未填写'}</Descriptions.Item>
          <Descriptions.Item label="问题描述">{data.comment ? data.comment : '未填写'}</Descriptions.Item>

          <Descriptions.Item label="报修照片">
            {banners || null}
          </Descriptions.Item>
        </Descriptions>
      </>
    );
  }else {
    return null;
  }

};

export default Desc;
