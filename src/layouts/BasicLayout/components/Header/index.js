import React from 'react';
import styles from './index.module.scss';

const Header = () => {

  return (
    <div
      id="navigation-container"
    >
      <header className={styles.navbar}>
        <div className={`row-flex ${styles.inner}`}>
          <div className={`${styles.systemBar}`}>
            <div className={styles.left}>
              <div style={{height:'100%'}}>
1111
              </div>
            </div>
            <div className={styles.middle}>3</div>
            <div className={styles.right}> 3</div>
          </div>
        </div>
      </header>
    </div>
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
