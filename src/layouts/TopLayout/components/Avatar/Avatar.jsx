import {Avatar as AntAvatar, Dropdown, Menu, Spin} from 'antd';
import React, {useState} from 'react';
import {CaretDownFilled, CaretUpFilled} from '@ant-design/icons';
import {useHistory} from 'react-router';
import styles from './index.module.less';
import Save from '@/layouts/TopLayout/components/Avatar/components/Save';


const Avatar = ({userInfo = {name: ''}}) => {

  const [visible, setVisible] = useState(false);

  const history = useHistory();

  const [saveVisible, setSaveVisible] = useState(false);

  const menuHeaderDropdown = <Menu
    className={styles.menu}
    selectedKeys={[]}
    items={[
      {
        key: 'settings',
        label: '账号设置',
        onClick: () => {
          setSaveVisible(true);
        }
      }, {
        key: 'logout',
        label: '退出系统',
        onClick: () => {
          history.push('/logout');
        }
      },
    ]}
  >
  </Menu>;

  return userInfo.name ? (
    <div className={styles.right}>
      <Dropdown onOpenChange={setVisible} overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <AntAvatar
            size="small"
            className={styles.avatar}
            alt="avatar"
          />
          <span className={styles.name}>
            欢迎您，{userInfo.name}
            <span style={{paddingLeft: 8}}>{!visible ? <CaretUpFilled/> : <CaretDownFilled/>}</span>
          </span>
        </span>
      </Dropdown>

      <Save visible={saveVisible} close={()=>setSaveVisible(false)}/>
    </div>
  ) : (
    <Spin
      size="small"
      style={{
        marginLeft: 8,
        marginRight: 8,
      }}
    />
  );
};
export default Avatar;
