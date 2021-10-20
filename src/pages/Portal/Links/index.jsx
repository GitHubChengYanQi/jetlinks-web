import React from 'react';
import {Select} from 'antd';

const Links = (props) => {

  const {value, onChange} = props;

  return (
    <>
      <Select
        value={value}
        options={
          [
            {
              value: '/pages/index/index',
              label: '首页',
            },
            {
              value: '/pages/classification/index',
              label: '分类'
            },
            {
              value: '/pages/cart/index',
              label: '购物车'
            },
            {
              value: '/pages/goodsDetails/index',
              label: '商品详情'
            },
            {
              value: '/pages/myLike/index',
              label: '我的收藏'
            },
            {
              value: '/pages/my/index',
              label: '个人中心'
            },
            {
              value: '/pages/myAddress/index',
              label: '地址列表'
            },
            {
              value: '/pages/addAddress/index',
              label: '添加地址'
            },
            {
              value: '/pages/myOrder/index',
              label: '我的货单'
            },
            {
              value: '/pages/confirmOrder/index',
              label: '确认货单'
            },
            {
              value: '/pages/orderDetailed/index',
              label: '货单详情'
            },
            {
              value: '/pages/logistics/index',
              label: '查看物流'
            },
            {
              value: '/pages/afterSalesList/index',
              label: '退款列表'
            },
            {
              value: '/pages/afterSales/index',
              label: '申请售后'
            },
            {
              value: '/pages/search/index',
              label: '搜索'
            },
            {
              value: '/pages/refundDetails/index',
              label: '退款详情'
            },
            {
              value: '/pages/refundLogistics/index',
              label: '填写退货物流'
            },
            {
              value: '/pages/goodslist/index',
              label: '商品列表'
            },
            {
              value: '/pages/viewurl/index',
              label: '外部页面'
            },
            {
              value: '/pages/confirmQingdan/index',
              label: '下单清单'
            },
            {
              value: '/pages/refundSelect/index',
              label: '申请售后1.1'
            },
            {
              value: '/pages/repair/index',
              label: '一键报修'
            },
            {
              value: '/pages/engineerOrder/index',
              label: '工程师接单'
            },
            {
              value: '/pages/repairList/index',
              label: '工单列表'
            },{
              value: '/pages/Data/Detail/index?id=',
              label: '信息管理详情'
            },{
              value: '/pages/Data/index?class=',
              label: '信息管理分类'
            },
          ]
        }
        onChange={(value) => {
          onChange(value);
        }}
      />
    </>
  );
};

export default Links;
