import React, {useState} from 'react';
import {ArrowDownOutlined, QuestionCircleOutlined, CheckCircleOutlined} from '@ant-design/icons';
import {Button, Modal} from 'antd';
import {useHistory} from 'ice';
import {PrimaryButton} from '@/components/Button';
import styles from './index.module.less';

const Action = () => {

  const [open, setOpen] = useState(false);

  const history = useHistory();

  const space = () => {
    return <div className={styles.space}>
      <ArrowDownOutlined/>
    </div>;
  };

  const steps = [
    '注册账号 - 登录系统',
    '设置团队 - 系统配置',
    '创建角色 - 设置权限',
    '创建账号 - 关联角色',
    '部署设备 - 添加设备',
    '开始使用',
  ];

  return <>
    <Button type="text" onClick={() => setOpen(true)}><QuestionCircleOutlined/></Button>

    <Modal title="系统使用引导" open={open} onCancel={() => setOpen(false)}>
      <div className={styles.steps}>
        {
          steps.map((item, index) => {
            return <div key={index}>
              <div className={styles.step}>
                <PrimaryButton>{item}</PrimaryButton>
                <div className={styles.action}>
                  {index === 0 ?
                    <Button type="text">
                      <CheckCircleOutlined className="green"/>
                    </Button>
                    :
                    <Button type="link" onClick={() => {
                      let url = '';
                      switch (index) {
                        case 0:

                          break;
                        case 1:
                          url = '/system/configuration';
                          break;
                        case 2:
                          url = '/system/role';
                          break;
                        case 3:
                          url = '/system/account';
                          break;
                        case 4:
                          url = '/equipment/inStock';
                          break;
                        case 5:
                          url = '/statistical';
                          break;
                        default:
                          break;
                      }
                      history.push(url);
                      setOpen(false);
                    }}>
                      {index !== steps.length - 1 ? '去设置' : '去使用'}
                    </Button>
                  }
                </div>
              </div>
              {index !== steps.length - 1 && space()}
            </div>;
          })
        }
      </div>
    </Modal>
  </>;
};

export default Action;
