import React from 'react';
import { Link } from 'react-router';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import routes from '@/routes';
import { useRouteMatch } from 'ice';

const itemRender = (route, params, routes, paths) => {


  const last = routes.indexOf(route) === routes.length - 1;
  const name = route.name ? route.name : 'name';
  console.log(route, paths);
  return last ? (
    <span>{name}</span>
  ) : (
    <span>{name}</span>
    // null
    // <Link to={paths.join('/')}>{name}</Link>
  );
};

const getRoute = (path, routes) => {
  if (!Array.isArray(routes)) {
    return [];
  }
  for (let i = 0; i < routes.length; i++) {
    if (`${routes[i].path}` === `${path}`) {
      return [routes[i]];
    }
    if (Array.isArray(routes[i].children) && routes[i].children.length > 0) {
      const values = getRoute(path, routes[i].children);
      if (values.length > 0) {
        return [{
          ...routes[i],
          children: null
        }, ...values];
      }
    }
  }
  return [];
};

const Breadcrumb = ({title}) => {
  const match = useRouteMatch();
  const routesArray = getRoute(match.path, routes);
  return (
    <AntBreadcrumb>
      {
        routesArray.map((item, index) => {
          return (<AntBreadcrumb.Item key={index}>{item.name}</AntBreadcrumb.Item>);
        })
      }
      {title && <AntBreadcrumb.Item key={title}>{title}</AntBreadcrumb.Item>}
    </AntBreadcrumb>);

};

export default Breadcrumb;

