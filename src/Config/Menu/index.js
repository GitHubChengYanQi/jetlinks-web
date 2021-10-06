import React from 'react';
import CustomIcon from '@/components/Icon';

const styles = {
  span: {
    fontSize: '14px',
    paddingLeft:8
  },
};
const MenuConfig = [
  {
    label: <span style={styles.span}> 概览</span>,
    icon: <CustomIcon type="shujugailan" size="s" />,
    path: '/overview',
  },
  {
    label: <span style={styles.span}> 产品</span>,
    icon: <CustomIcon type="shangpinguanli" size="s" />, // 'picture',
    path: '/goods',
    child: [
      {
        label: '产品管理',
        icon: '',
        path: '/m',
        child: [
          {
            label: '产品管理',
            icon: '',
            path: '/list',
          },
          {
            label: '产品分组',
            icon: '',
            path: '/category',
          },
        ],

      },
      {
        label: '产品工具',
        icon: '',
        path: '/tools',
        child: [
          {
            label: '批量改价',
            icon: '',
            path: '/gj',
          },
          {
            label: '产品导入',
            icon: '',
            path: '/import',
          },
        ],

      },
    ],
  },
  {
    // label: '货单',
    label: <span style={styles.span}> 货单</span>,
    icon: <CustomIcon type="dingdanguanli" size="s" />,// 'dingdanguanli',
    path: '/order',
    child: [
      {
        label: '货单查询',
        path: '/list',
      },
      {
        label: '评价管理',
        path: '/score',
      },
    ],
  },
  {
    // label: '店铺',
    icon: <CustomIcon type="5dianpuzu" size="s" />,// '5dianpuzu',
    label: <span style={styles.span}> 店铺</span>,
    path: '/store',
    child: [
      {
        label: '店铺管理',
        path: '/manage',
        child: [
          {
            label: '店铺查询',
            path: '/list',
          },
          {
            label: '店铺分类',
            path: '/category',
          },
        ],
      },
      {
        label: '结算管理',
        path: '/Settlement',
        child: [
          {
            label: '结算查询',
            path: '/list',
          },
        ],
      },
    ],
  },
  {
    // label: '门店',
    icon: <CustomIcon type="4banshichu" size="s" />, // icon-4banshichu
    label: <span style={styles.span}> 门店</span>,
    path: '/outlet',
    child: [
      {
        label: '门店管理',
        path: 'manage',
        child: [
          {
            label: '门店查询',
            path: '/list',
          },
          {
            label: '门店分类',
            path: '/category',
          },
        ],
      },
      {
        label: '门店库存',
        path: 'stock',
        child: [
          {
            label: '库存查询',
            path: '/list',
          },
        ],
      },
    ],
  },
  {
    // label: '仓库',
    icon: <CustomIcon type="6dianpu" size="s" />,
    label: <span style={styles.span}> 仓库</span>,
    path: '/Inventory',
    child: [
      {
        label: '仓库管理',
        path: 'manage',
        child: [
          {
            label: '仓库查询',
            path: '/list',
          },
        ],
      },
      {
        label: '仓库库存',
        path: 'stock',
        child: [
          {
            label: '库存查询',
            path: '/list',
          },
        ],
      },
    ],
  },
  {
    // label: '售后',
    icon: <CustomIcon type="huiyuanxiaoxi" size="s" />,
    label: <span style={styles.span}> 售后</span>,
    path: '/atm',
    child: [
      {
        label: '售后管理',
        path: 'manage',
        child: [
          {
            label: '新问题',
            path: '/list',
          },
          {
            label: '待处理',
            path: '/list?status=temporary',
          },
          {
            label: '处理成功',
            path: '/list?status=success',
          },
          {
            label: '已拒绝',
            path: '/list?status=failed',
          },
        ],
      },
    ],
  },
  {
    icon:<CustomIcon type="xitongpeizhi" size="s" />,
    label: <span style={styles.span}> 设置</span>,
    path: '/setting',
    styles:{
      marginTop:200,
    },
    children: [
      {
        label: '系统管理',
        path: '/system',
        children: [
          {
            label: '用户管理',
            path: '/user/list',
          },
          {
            label: '角色管理',
            path: '/role/list',
          },
          {
            label: '部门管理',
            path: '/dept/list',
          },
          {
            label: '职位管理',
            path: '/position/list',
          },
          {
            label: '权限管理',
            path: '/menu/list',
          },
          {
            label: '登录日志',
            path: '/loginLog',
          },
          {
            label: '业务日志',
            path: '/log',
          },
          {
            label: '监控管理',
            path: '/druid',
          },
        ],
      },{
        label: '开发配置',
        path: '/dev',
        children: [
          {
            label: '字典管理',
            path: '/dicts/list',
          },
          {
            label: '参数管理',
            path: '/sysConfig/list',
          },
        ],
      }
    ],
  },
];
export default MenuConfig;
