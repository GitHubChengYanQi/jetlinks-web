import React from 'react';
import {Balloon, Button, Shell} from "@alifd/next";
import Logo from "@/layouts/BasicLayout/components/Logo";
import UserInfo from "@/layouts/BasicLayout/components/UserInfo";
import styles from "@/layouts/BasicLayout/index.module.scss";
import Menu from "@/components/LeftMenu";
import MenuConfig from "@/Config/Menu";

const Header = () => {

  return (
    <header
      id="navigation-container"
    >header
    </header>
    // <Shell
    //   type="brand"
    //   style={{
    //     height: '100vh',
    //     // marginTop: -52, paddingTop: 52
    //   }}
    //   // trigger={null}
    // >
    //   <Shell.Branding>
    //     <Logo/><span style={{marginLeft: 10}}>SPS - atSoft</span>
    //   </Shell.Branding>
    //   <Shell.Action>
    //     {user && <Balloon
    //       trigger={<UserInfo style={{marginLeft: 10}} userName={user.name}/>}
    //       align="br"
    //       alignEdge
    //       triggerType="hover"
    //       closable={false}
    //       style={{width: 300}}
    //       offset={[20, 0]}
    //       animation={{in: 'fadeInUp', out: 'fadeOutDown'}}
    //       className={styles.userMenu}
    //     >
    //       <header/>
    //       <footer>
    //         <Button type="primary" style={{width: '100%'}} onClick={() => {
    //           logout();
    //         }}>退出登录</Button>
    //       </footer>
    //     </Balloon>}
    //   </Shell.Action>
    //   <Shell.Navigation
    //     trigger={null}
    //     style={{width: 'auto', padding: 0}}
    //   >
    //     <Menu config={MenuConfig}/>
    //   </Shell.Navigation>
    //   <Shell.Content>{children}
    //   </Shell.Content>
    // </Shell>
  );
};

export default Header;
