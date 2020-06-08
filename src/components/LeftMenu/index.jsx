import React, {useEffect, useState} from 'react';
import { useLocation } from 'ice';
import {Nav, Grid} from '@alifd/next';
import {Link} from 'react-router-dom';
import path from 'path';

import style from './main.scss';


const {Item: NavItem, SubNav, Group} = Nav;
const {Row, Col} = Grid;

const LeftMenu = ({fold, config, history, match, staticContext, ...others}) => {

  const type = '';
  const location = useLocation();
  const {pathname, search} = location;

  const [subNavData, setSubNav] = useState([]);
  const [NavData, setNav] = useState({});
  if (!config) {
    config = [];
  }
  useEffect(() => {
    for (let i = 0; i < config.length; i++) {
      const item = config[i];
      if (pathname.startsWith(item.path)) {
        setNav(item);
        if (item.children && item.children.length > 0) {
          setSubNav(item.children);
        } else {
          setSubNav([]);
        }
        break;
      }
    }
  }, [pathname]);

  const renderNavItem = (item) => {
    return (
      <NavItem key={item.path} style={item.styles} icon={item.icon}>
        <Link to={item.path}>{item.label}</Link>
      </NavItem>
    );
  };

  const LoopItem = (config, prePath = "") => {
    if (!Array.isArray(config)) {
      return null;
    }
    return config.map((item) => {
      return item.path ? renderNavItem({...item, path: path.join(prePath, item.path)}) : null;
    });
  };

  const renderSubNav = () => {
    return (
      subNavData.map((item) => {
        if (item.children && item.children.length > 0) {
          const path = path.join(NavData.path, item.children);
          return (
            <SubNav label={item.label} key={path} className="custom-group">
              {LoopItem(item)}
            </SubNav>
          );
        } else {
          return renderNavItem(item);
        }
      })
    );
  };

  const renderGroup = () => {
    return (
      subNavData.map((item) => {
        const pathname = path.join(NavData.path, item.path);
        if (item.children && item.children.length > 0) {
          return (
            <Group label={item.label} key={pathname} className="custom-group">
              {LoopItem(item.children, pathname)}
            </Group>
          );
        } else {
          return renderNavItem({...item, path: pathname});
        }
      })
    );
  };

  const SwitchNav = () => {
    if (type === 'subNav') {
      return renderSubNav();
    } else {
      return renderGroup();
    }
  };

  const Active = () => {

    let inParams;
    for (let i = 0; i < subNavData.length; i++) {
      const item = subNavData[i];
      if (item.children && item.children.length > 0) {
        inParams = item.children.findIndex((cItem) => {
          return `${NavData.path}${item.path}${cItem.path}` === `${pathname}${search}`;
        });
        if (inParams !== -1) {
          return `${pathname}${search}`;
        }
      } else if (`${NavData.path}${item.path}` === `${pathname}${search}`) {
        return `${pathname}${search}`;
      }
    }

    let inArray;
    for (let i = 0; i < subNavData.length; i++) {
      const item = subNavData[i];
      if (item.children && item.children.length > 0) {
        inArray = item.children.find((cItem) => {
          return Array.isArray(cItem.active) && cItem.active.includes(pathname);
        });
        if (inArray) {
          return `${NavData.path}${item.path}${inArray.path}`;
        }
      } else if (Array.isArray(item.active) && item.active.includes(pathname)) {
        return `${NavData.path}${item.path}`;
      }
    }
    return pathname;
  };


  return (
    <Row style={{
      height: '100%',
      overflow: 'hidden',
    }} className="sing-left-menu" {...others}
    >
      <Col>
        <Nav className="LeftMenu" type="primary" selectedKeys={NavData.path}
        >
          {LoopItem(config)}
        </Nav>
      </Col>
      {subNavData && subNavData.length > 0 ? <Col>
        <Nav className="LeftMenu" selectedKeys={Active()} iconOnly={false}
        >
          <div className="title">
            {NavData.label}
          </div>
          {SwitchNav()}
        </Nav>
      </Col> : null}
    </Row>

  );
};
export default LeftMenu;

LeftMenu.propTypes = {};

LeftMenu.defaultProps = {};
