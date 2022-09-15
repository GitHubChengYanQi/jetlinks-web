import React from 'react';
import {Card, Checkbox, Col, Descriptions, Input, Modal, Row, Select, Space, Switch} from 'antd';
import styles from './index.module.less';


const Save = props => {

  return (
    <Modal
      centered
      width="80vw"
      title="报警设置"
      open={props.visible}
      okText="确定"
      cancelText="取消"
      onOk={() => {

      }}
      onCancel={() => props.close()}
    >
      <div style={{maxHeight:'75vh',overflow:'auto'}}>
        <Row>
          <Col span={14}>
            <Card className={styles.card} title={<div className={styles.title}>供电数据</div>} bordered={false}>
              <Row>
                <Col span={4}>
                  <div className={styles.dataTitle}>电网供电电压</div>
                  <div className={styles.dataTitle}>接入网口供电电压</div>
                </Col>
                <Col span={20}>
                  <Descriptions className={styles.descriptions} column={3}>
                    <Descriptions.Item label="下限"><Input placeholder="请输入电压下限"/></Descriptions.Item>
                    <Descriptions.Item label="上限"><Input placeholder="请输入电压上限"/></Descriptions.Item>
                    <Descriptions.Item>
                      <Space className={styles.switch}>
                        <Switch defaultChecked/>开启报警
                      </Space>
                    </Descriptions.Item>

                    <Descriptions.Item label="12V下限"><Input placeholder="请输入电压下限"/></Descriptions.Item>
                    <Descriptions.Item label="12V上限"><Input placeholder="请输入电压上限"/></Descriptions.Item>
                    <Descriptions.Item>
                      <Space className={styles.switch}>
                        <Switch defaultChecked/>开启报警
                      </Space>
                    </Descriptions.Item>

                    <Descriptions.Item label="24V下限"><Input placeholder="请输入电压下限"/></Descriptions.Item>
                    <Descriptions.Item label="24V上限"><Input placeholder="请输入电压上限"/></Descriptions.Item>
                    <Descriptions.Item>
                      <Space className={styles.switch}>
                        <Switch defaultChecked/>开启报警
                      </Space>
                    </Descriptions.Item>

                    <Descriptions.Item label="220V下限"><Input placeholder="请输入电压下限"/></Descriptions.Item>
                    <Descriptions.Item label="220V上限"><Input placeholder="请输入电压上限"/></Descriptions.Item>
                    <Descriptions.Item>
                      <Space className={styles.switch}>
                        <Switch defaultChecked/>开启报警
                      </Space>
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
            </Card>

            <Card className={styles.card} title={<div className={styles.title}>网络数据</div>} bordered={false}>
              <Row>
                <Col span={4}>
                  <div className={styles.dataTitle}>主干网络状态</div>
                  <div className={styles.dataTitle}>主干网络速率</div>
                  <div className={styles.dataTitle}>主干网络丢包率</div>
                  <div className={styles.dataTitle}>Combo1网络状态</div>
                  <div className={styles.dataTitle}>Combo2网络状态</div>
                  <div className={styles.dataTitle}>接入网口网络状态</div>
                  <div className={styles.dataTitle}>接入网口网络速率</div>
                  <div className={styles.dataTitle}>接入网口网络丢包率</div>
                  <div className={styles.dataTitle}>4G网络状态</div>
                </Col>
                <Col span={20}>
                  <Descriptions className={styles.descriptions} column={3}>
                    <Descriptions.Item span={2}>
                      <div className={styles.contentTitle}>网络连接断开或网络连接恢复</div>
                    </Descriptions.Item>
                    <Descriptions.Item>
                      <Space className={styles.switch}>
                        <Switch defaultChecked/>开启报警
                      </Space>
                    </Descriptions.Item>

                    <Descriptions.Item label="下限"><Input placeholder="请输入电压下限"/></Descriptions.Item>
                    <Descriptions.Item><></>
                    </Descriptions.Item>
                    <Descriptions.Item>
                      <Space className={styles.switch}>
                        <Switch defaultChecked/>开启报警
                      </Space>
                    </Descriptions.Item>

                    <Descriptions.Item label="上限"><Input placeholder="请输入电压上限"/></Descriptions.Item>
                    <Descriptions.Item><></>
                    </Descriptions.Item>
                    <Descriptions.Item>
                      <Space className={styles.switch}>
                        <Switch defaultChecked/>开启报警
                      </Space>
                    </Descriptions.Item>

                    <Descriptions.Item span={2}>
                      <div className={styles.contentTitle}>网络连接断开或网络连接恢复</div>
                    </Descriptions.Item>
                    <Descriptions.Item>
                      <Space className={styles.switch}>
                        <Switch defaultChecked/>开启报警
                      </Space>
                    </Descriptions.Item>

                    <Descriptions.Item span={2}>
                      <div className={styles.contentTitle}>网络连接断开或网络连接恢复</div>
                    </Descriptions.Item>
                    <Descriptions.Item>
                      <Space className={styles.switch}>
                        <Switch defaultChecked/>开启报警
                      </Space>
                    </Descriptions.Item>

                    <Descriptions.Item span={2}>
                      <div className={styles.contentTitle}>网络连接断开或网络连接恢复</div>
                    </Descriptions.Item>
                    <Descriptions.Item>
                      <Space className={styles.switch}>
                        <Switch defaultChecked/>开启报警
                      </Space>
                    </Descriptions.Item>

                    <Descriptions.Item label="下限"><Input placeholder="请输入电压下限"/></Descriptions.Item>
                    <Descriptions.Item><></>
                    </Descriptions.Item>
                    <Descriptions.Item>
                      <Descriptions.Item>
                        <Space className={styles.switch}>
                          <Switch defaultChecked/>开启报警
                        </Space>
                      </Descriptions.Item>
                    </Descriptions.Item>

                    <Descriptions.Item label="上限"><Input placeholder="请输入电压上限"/></Descriptions.Item>
                    <Descriptions.Item><></>
                    </Descriptions.Item>
                    <Descriptions.Item>
                      <Descriptions.Item>
                        <Space className={styles.switch}>
                          <Switch defaultChecked/>开启报警
                        </Space>
                      </Descriptions.Item>
                    </Descriptions.Item>

                    <Descriptions.Item span={2}>
                      <div className={styles.contentTitle}>网络连接断开或网络连接恢复</div>
                    </Descriptions.Item>
                    <Descriptions.Item>
                      <Descriptions.Item>
                        <Space className={styles.switch}>
                          <Switch defaultChecked/>开启报警
                        </Space>
                      </Descriptions.Item>
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
            </Card>

            <Card className={styles.card} title={<div className={styles.title}>环境数据</div>} bordered={false}>
              <Row>
                <Col span={4}>
                  <div className={styles.dataTitle}>温度</div>
                  <div className={styles.dataTitle}>湿度</div>
                  <div className={styles.dataTitle}>柜门状态</div>
                </Col>
                <Col span={20}>
                  <Descriptions className={styles.descriptions} column={3}>
                    <Descriptions.Item label="下限"><Input placeholder="请输入电压下限"/></Descriptions.Item>
                    <Descriptions.Item label="上限"><Input placeholder="请输入电压上限"/></Descriptions.Item>
                    <Descriptions.Item>
                      <Descriptions.Item>
                        <Space className={styles.switch}>
                          <Switch defaultChecked/>开启报警
                        </Space>
                      </Descriptions.Item>
                    </Descriptions.Item>

                    <Descriptions.Item label="下限"><Input placeholder="请输入电压下限"/></Descriptions.Item>
                    <Descriptions.Item label="上限"><Input placeholder="请输入电压上限"/></Descriptions.Item>
                    <Descriptions.Item>
                      <Descriptions.Item>
                        <Space className={styles.switch}>
                          <Switch defaultChecked/>开启报警
                        </Space>
                      </Descriptions.Item>
                    </Descriptions.Item>

                    <Descriptions.Item>
                      <div className={styles.contentTitle}>柜门开启或关闭</div>
                    </Descriptions.Item>
                    <Descriptions.Item><></>
                    </Descriptions.Item>
                    <Descriptions.Item>
                      <Descriptions.Item>
                        <Space className={styles.switch}>
                          <Switch defaultChecked/>开启报警
                        </Space>
                      </Descriptions.Item>
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={10}>
            <Card className={styles.card} title={<div className={styles.title}>报警设置</div>} bordered={false}>
              <Descriptions column={1}>
                <Descriptions.Item label="选择报警信息">
                  <Space direction="vertical">
                    <Checkbox.Group className={styles.checkGroop}>
                      <Space direction="vertical">
                        <Space>
                          <Checkbox>终端备注</Checkbox>
                          <Checkbox>登记名称</Checkbox>
                          <Checkbox>设备类别</Checkbox>
                        </Space>
                        <Space>
                          <Checkbox>设备型号</Checkbox>
                          <Checkbox>IP地址</Checkbox>
                          <Checkbox>MAC地址</Checkbox>
                        </Space>
                        <Space>
                          <Checkbox>所属客户</Checkbox>
                          <Checkbox>报警时间</Checkbox>
                          <Checkbox>报警类型</Checkbox>
                        </Space>
                      </Space>
                    </Checkbox.Group>

                    <Select style={{width: '100%'}} placeholder="请选择短信模版" options={[{label: '短信模版', value: '1'}]}/>
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="选择报警联系人">
                  <div className={styles.border}>
                    <Checkbox.Group>
                      <Space direction="vertical">
                        <Checkbox value="0">李子木，17777777777</Checkbox>
                        <Checkbox value="1">李子木，17777777777</Checkbox>
                        <Checkbox value="2">李子木，17777777777</Checkbox>
                        <Checkbox value="0">李子木，17777777777</Checkbox>
                        <Checkbox value="1">李子木，17777777777</Checkbox>
                        <Checkbox value="2">李子木，17777777777</Checkbox>
                      </Space>
                    </Checkbox.Group>
                  </div>
                </Descriptions.Item>
              </Descriptions>
            </Card>

            <Card className={styles.card} title={<div className={styles.title}>一键应用</div>} bordered={false}>
              <Descriptions column={1}>
                <Descriptions.Item label="选择应用的设备">
                  <div className={styles.border}>
                    <Checkbox.Group>
                      <Space direction="vertical">
                        <Checkbox value="0">4012M智能箱，0A1B2C3D4E</Checkbox>
                        <Checkbox value="1">4012M智能箱，0A1B2C3D4E</Checkbox>
                        <Checkbox value="2">4012M智能箱，0A1B2C3D4E</Checkbox>
                        <Checkbox value="0">4012M智能箱，0A1B2C3D4E</Checkbox>
                        <Checkbox value="1">4012M智能箱，0A1B2C3D4E</Checkbox>
                        <Checkbox value="2">4012M智能箱，0A1B2C3D4E</Checkbox>
                      </Space>
                    </Checkbox.Group>
                  </div>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default Save;
