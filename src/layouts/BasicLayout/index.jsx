import React, {useState, useEffect} from 'react';
import {Shell, Balloon, Button,} from '@alifd/next';
import cookie from 'js-cookie';
import {logger, useHistory, store, APP_MODE} from 'ice';
import {useRequest} from '@/Config/BaseRequest';
import {userInfo} from '@/Config/ApiUrl/system/user';
import {deptTree} from '@/Config/ApiUrl/system/dept';
import MenuConfig from '@/Config/Menu';
import Logo from './components/Logo';
import UserInfo from './components/UserInfo';
import Menu from '../../components/LeftMenu';
import styles from './index.module.scss';


(function () {
  const throttle = function (type, name, obj = window) {
    let running = false;

    const func = () => {
      if (running) {
        return;
      }

      running = true;
      requestAnimationFrame(() => {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };

    obj.addEventListener(type, func);
  };

  throttle('resize', 'optimizedResize');
})();

export default function BasicLayout({children}) {

  const history = useHistory();
  // const [user, setUser] = useState(null);

  const [, deptDispatchers] = store.useModel('dept');

  const getDevice = width => {
    const isPhone =
      typeof navigator !== 'undefined' && navigator && navigator.userAgent.match(/phone/gi);

    if (width < 680 || isPhone) {
      return 'phone';
    }
    if (width < 1280 && width > 680) {
      return 'tablet';
    }
    return 'desktop';
  };

  const [device, setDevice] = useState(getDevice(NaN));
  window.addEventListener('optimizedResize', e => {
    setDevice(getDevice(e && e.target && e.target.innerWidth));
  });

  const {request: requestUser} = useRequest(userInfo, {manual: true});
  const {run: getUserInfo,data:user} = requestUser();


  // const {request: requestDept} = useRequest(deptTree);
  // const getDeptTree = async () => {
  //   const {error, response} = await requestDept();
  //   if (!error) {
  //     // setData(response.data);
  //     deptDispatchers.setDeptTree(response.data);
  //   }
  // }

  const logout = () => {
    cookie.remove('Authorization');
    history.push('/user/login');
  };

  useEffect(() => {
    try {
      console.log(APP_MODE)
      let data = cookie.get('Authorization');
      if (!data && APP_MODE === undefined) {
        throw new Error('本地登录信息不存在');
      } else {
        data = '';
      }
      const jwt = data.split('.');
      if (jwt.length !== 3 && APP_MODE === undefined) {
        throw new Error('本地登录信息错误');
      }
      if (jwt.length === 3) {
        console.log(window.atob(jwt[0]));
        const user = window.atob(jwt[1]);

        console.log(user);
      }

      getUserInfo();
      // getDeptTree();
    } catch (e) {
      logger.error(e.message);
      cookie.remove('Authorization');
      // TODO 登录超时处理
      // history.push('/user/login');
    }
  }, []);
  return (
    <Shell
      type="brand"
      style={{
        height: '100vh',
        // marginTop: -52, paddingTop: 52
      }}
      // trigger={null}
    >
      <Shell.Branding>
        <Logo/><span style={{marginLeft: 10}}>SPS - atSoft</span>
      </Shell.Branding>
      <Shell.Action>
        {user && <Balloon
          trigger={<UserInfo style={{marginLeft: 10}} userName={user.name}/>}
          align="br"
          alignEdge
          triggerType="hover"
          closable={false}
          style={{width: 300}}
          offset={[20, 0]}
          animation={{in: 'fadeInUp', out: 'fadeOutDown'}}
          className={styles.userMenu}
        >
          <header/>
          <footer>
            <Button type="primary" style={{width: '100%'}} onClick={() => {
              logout();
            }}>退出登录</Button>
          </footer>
        </Balloon>}
      </Shell.Action>
      <Shell.Navigation
        trigger={null}
        style={{width: 'auto', padding: 0}}
      >
        <Menu config={MenuConfig}/>
      </Shell.Navigation>
      <Shell.Content>{children}
      </Shell.Content>
    </Shell>
  );
}
