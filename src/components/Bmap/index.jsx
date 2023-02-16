import React, {useState, useImperativeHandle, useEffect} from 'react';
import {
  Button,
  Col,
  Input,
  List,
  Modal,
  Popover,
  Row,
  Space,
  Spin,
  Tag,
  Switch,
  Badge,
  Layout,
  Divider,
  Drawer, message
} from 'antd';
import classNames from 'classnames';
import {EyeOutlined, AlertOutlined} from '@ant-design/icons';
import {useRequest} from '@/util/Request';
import {isArray} from '@/util/Tools';
import {deviceList, mapNum} from '@/components/Amap';
import styles from '@/components/Amap/index.module.less';
import error from '@/asseset/imgs/error.svg';
import online from '@/asseset/imgs/online.svg';
import offline from '@/asseset/imgs/offline.svg';
import store from '@/store';
import {OuntDown} from '@/pages/monitor/Control';
import DateSelect from "@/pages/monitor/components/DateSelect";
import DeviceChar from "@/pages/monitor/DeviceChar";

const { Header, Footer, Sider, Content } = Layout;

export const MapDeviceDetail = {
  url: '/device/MapDeviceDetail',
  method: 'POST'
};

export const alarmCustomerView = {
  url: '/statistics/alarmCustomerView',
  method: 'POST'
};

export const getChartTopic = {
  url: '/deviceModel/getChartTopic',
  method: 'POST'
};

export const buttonSubmit = {
  url: '/device/buttonSubmit',
  method: 'POST'
};

const Bmap = ({
                value = [],
                onChange = () => {
                },
                onMarkerClick = () => {
                },
                onHistory = () => {
                },
                search
              }, ref) => {

  const [dataSource] = store.useModel('dataSource');
  const customer = dataSource.customer || {};
  const bmapOffline = customer.platformMode === 1;
  const [centerPoint, setCenterPoint] = useState({});
  const [infoVisible, setInfoVisible] = useState({});
  const [visiable, setVisiable] = useState();
  const [resluts, setResults] = useState([]);
  const [date, setDate] = useState([]);
  const [device, setDevice] = useState({});
  const [deviceModal, setDeviceModal] = useState({});
  const [openTieTa, setOpenTieTa] = useState(false);
  const [open4012, setOpen4012] = useState(false);
  const [open, setOpen] = useState(false);
  const [openChar, setOpenChar] = useState({});
  const [params, setParams] = useState({});
  const [baiduMap, setBaiduMap] = useState({});
  const [map, setMap] = useState();

  const {loading: detailLoading, data = {}, run} = useRequest(MapDeviceDetail, {manual: true});
  const {data: alarmData = {}, run: alarmRun} = useRequest(alarmCustomerView, {manual: true});
  const {data: buttonData = {}, run: buttonRun} = useRequest(getChartTopic, {manual: true});
  const {loading,run: submitRun} = useRequest(buttonSubmit, {
    manual: true,
    onSuccess: () => {
      message.success('操作成功！');
    },
    onError: () => {
      message.error('操作失败！');
    }
  });
  const mapMaker = (device) => {
    const deviceOnline = device.status === 'online';

    let mark = '';
    let title = '';
    let className = '';
    let status = '';
    if (device.alarm) {
      mark = error;
      title = '设备报警';
      className = styles.error;
      status = 'error';
    } else if (deviceOnline) {
      mark = online;
      title = '设备正常';
      className = styles.online;
    } else {
      mark = offline;
      title = '设备离线';
      className = styles.offline;
    }
    title = `${title  }　　　　　　　　　　　　　${  device.remarks  }`;

    const point1 = new baiduMap.Point(device.longitude, device.latitude);
    const size = new baiduMap.Size(30, 37);
    const icon = new baiduMap.Icon(mark, size);
    const marker = new baiduMap.Marker(point1, {icon});        // 创建标注
    marker.addEventListener('click', () => {
      if(device.modelName === "OPT IMS 4012M"){
        setOpen4012(true);
      } else if (device.modelName === "铁塔备电设备") {
        setOpenTieTa(true);
      } else {
        setOpen(true);
      }
      run({data: {deviceId: device.deviceId}});
      alarmRun({data: {deviceId: device.deviceId}});
      buttonRun({data: {modelId: device.modelId,title:'dwgd'}});
      setDevice(device);
      setInfoVisible(device);
      setDeviceModal({title, className, deviceOnline, status});
    });
    map.addOverlay(marker);
  };

  const getBounds = (initMap) => {
    // 西南，东北
    const sw = initMap.getBounds().getSouthWest();
    const ne = initMap.getBounds().getNorthEast();
    // 西北 经度 纬度
    const northwest = {lng: sw.lng, lat: ne.lat};
    // 东南 经度 纬度
    const southeast = {lng: ne.lng, lat: sw.lat};

    const locationParams = [
      {latitude: northwest.lat, longitude: northwest.lng},
      {latitude: southeast.lat, longitude: southeast.lng}
    ];
    initMap.clearOverlays();

    getDeviceList({data: {locationParams, ...params}});
  };

  const addListener = (map) => {
    const dragend = () => {
      getBounds(map);
      map.removeEventListener('dragend', dragend);
      map.removeEventListener('zoomend', zoomend);
    };
    const zoomend = () => {
      getBounds(map);
      map.removeEventListener('dragend', dragend);
      map.removeEventListener('zoomend', zoomend);
    };
    map.addEventListener('dragend', dragend);
    map.addEventListener('zoomend', zoomend);
  };


  const {run: getDeviceList} = useRequest(deviceList, {
    manual: true,
    onSuccess: (res) => {
      addListener(map);
      isArray(res).forEach(item => {
        if (item.latitude && item.longitude) {
          mapMaker(item);
        }
      });
    }
  });

  const {run: getMapNum, data: mapNumber = {}} = useRequest(mapNum, {manual: true});

  const movingLocation = (location, zoom) => {
    map.setCenter(location);
    map.setZoom(zoom);
  };

  const submit = async (newParams = {}, reset, initMap = map) => {
    const data = reset ? newParams : {...params, ...newParams,};
    setParams({...data, position: undefined});
    getMapNum({data});
    initMap.clearOverlays();
    getDeviceList({data: {...data, position: undefined}});
  };

  const setCenter = (point, initBaidu = baiduMap, initMap = map) => {
    initMap.clearOverlays();
    setCenterPoint(point);
    const newPoint = new initBaidu.Point(point.lng, point.lat);
    const marker = new initBaidu.Marker(newPoint);        // 创建标注
    initMap.addOverlay(marker);
  };

  const handleScriptLoad = (BMap) => {
    setBaiduMap(BMap);
    const initMap = new BMap.Map('container');
    const point = new BMap.Point(customer.longitude || 116.404, customer.latitude || 39.915);
    if (search) {
      initMap.centerAndZoom(point, bmapOffline ? 8 : 16);
      initMap.addEventListener('moving', () => {
        setCenter(initMap.getCenter(), BMap, initMap);
      });
    } else {
      initMap.centerAndZoom(point, 7);
    }
    initMap.enableScrollWheelZoom(true);
    setMap(initMap);

    if (!search) {
      getBounds(initMap);
      getMapNum({data:{}});
    } else if (value.length === 0) {
      const localCity = new BMap.LocalCity();
      localCity.get((result) => {
        initMap.panTo(new BMap.Point(result.center.lng, result.center.lat));
        setCenter(result.center, BMap, initMap);
      });
    } else {
      initMap.panTo(new BMap.Point(value[0], value[1]));
      setCenter({lng: value[0], lat: value[1]}, BMap, initMap);
    }
  };

  const initMap = async () => {
    console.log(bmapOffline ? '离线模式' : '在线模式');
    console.log('初始化百度地图脚本...');
    // const mapUrl = 'http://124.71.235.212:81/bmap';
    const mapUrl = '/map';
    window.bmapcfg = {
      'imgext': '.jpg',   // 瓦片图的后缀 ------ 根据需要修改，一般是 .png .jpg
      'tiles_dir': `${mapUrl}/tiles`,       // 普通瓦片图的地址，为空默认在 offlinemap/tiles/ 目录
      'tiles_hybrid': '',       // 卫星瓦片图的地址，为空默认在 offlinemap/tiles_hybrid/ 目录
      'tiles_self': '',        // 自定义图层的地址，为空默认在 offlinemap/tiles_self/ 目录
      'home': `${mapUrl}/`,
    };
    // 百度地图API文件链接，异步加载必须带参数callback，后面是回调函数。
    const BMapURL = bmapOffline ? `${mapUrl}/bmap_offline_api_v3.0_min.js` : '//api.map.baidu.com/api?v=3.0&ak=FFFGGr9s5Hiee3vrtjVguKPtdgcxDEnv&callback=onBMapCallback';

    // 插入script脚本
    const scriptNode = document.createElement('script');
    scriptNode.setAttribute('type', 'text/javascript');
    scriptNode.setAttribute('src', BMapURL);
    document.body.appendChild(scriptNode);

    scriptNode.onload = () => {

      window.onBMapCallback = () => {
        console.log('初始化在线百度地图脚本成功~', window.BMap);
        handleScriptLoad(window.BMap);
      };
      if (bmapOffline) {
        console.log('初始化离线百度地图脚本成功~', window.BMap);
        handleScriptLoad(window.BMap);
      }
    };
  };

  useEffect(() => {
    initMap();
  }, []);

  useImperativeHandle(ref, () => ({
    submit,
    movingLocation
  }));

  return <div style={{position: 'relative', height: '100%', width: '100%'}}>

    <div hidden={search} className={styles.deviceCount}>
      <Space size={24}>
        <div>
          设备数量：{mapNumber.total || 0}
        </div>
        <div className={styles.textOnline}>
          在线：{mapNumber.onNum || 0}
        </div>
        <div className={styles.textOffline}>
          离线：{mapNumber.offNum || 0}
        </div>
        <div className={styles.space}/>
        <div className={styles.textErrorline}>
          报警：{mapNumber.alarmNum || 0}
        </div>
      </Space>
    </div>

    <div
      hidden={!search}
      style={{
        position: 'absolute',
        top: 0,
        padding: 10,
        width: '100%',
        zIndex: 1,
        textAlign: bmapOffline && 'right',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div style={{display: 'inline-block'}} hidden={bmapOffline}>
        <Popover
          style={{zIndex: 1}}
          onOpenChange={(visible) => {
            setVisiable(visible);
          }}
          placement="bottom"
          content={resluts.length > 0 &&
            <div style={{maxHeight: '50vh', minWidth: 500, overflowY: 'auto', marginTop: 16}}>
              <List>
                {resluts.map((item, index) => {
                  return (<List.Item key={index} style={{cursor: 'pointer'}} onClick={() => {
                    const point = new baiduMap.Point(item.point.lng, item.point.lat);
                    map.panTo(point);
                    setCenter(item.point);
                  }} extra={<Button type="primary" onClick={() => {
                    onChange([item.point.lng, item.point.lat]);
                    setVisiable(false);
                  }}>使用该地址</Button>}>
                    <Space direction="vertical">
                      <div>
                        {item.title}
                      </div>
                      <div>
                        {item.address}
                      </div>
                      <Space>
                        {
                          isArray(item.tags).map((item, index) => {
                            return <Tag key={index}>{item}</Tag>;
                          })
                        }
                      </Space>
                    </Space>
                  </List.Item>);
                })}
              </List>
            </div>}
          open={visiable}
        >
          <Input.Search
            placeholder="搜索地点"
            onChange={(value) => {
              const local = new baiduMap.LocalSearch(map,
                {
                  pageCapacity: 50,
                  onSearchComplete: (results) => {
                    if (results) {
                      const totalResults = results.getNumPois();
                      const resultArray = [];
                      for (let i = 0; i < totalResults; i++) {
                        if (results.getPoi(i)) {
                          resultArray.push(results.getPoi(i));
                        }
                      }
                      setResults(resultArray);
                    } else {
                      setResults([]);
                    }
                  }
                }
              );
              local.searchNearby(value.target.value, new baiduMap.Point(centerPoint.lng, centerPoint.lat), 999999);
              setVisiable(true);
            }}
            style={{width: 'auto', marginRight: 20}}
          />
        </Popover>
      </div>

      <Button
        type="primary"
        onClick={() => {
          onChange([centerPoint.lng, centerPoint.lat]);
        }}>确定</Button>

    </div>

    <div id="container" style={{height: '100%'}}/>

    {/*原有*/}
    <Modal
      mask={false}
      centered
      className={classNames(styles.modal, deviceModal.className)}
      width={700}
      title={deviceModal.title}
      onCancel={() => setOpen(false)}
      open={open}
      footer={null}
    >
      <Row style={{width: '100%'}}>
        <Col span={12}>
          <Space direction="vertical" size={8} style={{width: '100%'}}>
            <div className={styles.leftRow}>
              <div>设备状态</div>
              ：
              <span
                style={{color: deviceModal.deviceOnline ? '#00a660' : '#b2b1b1'}}>{deviceModal.deviceOnline ? '在线' : '离线'}</span>
            </div>
            <div className={styles.leftRow}>
              <div>终端备注</div>
              ：{device.remarks}</div>
            <div className={styles.leftRow}>
              <div>设备型号</div>
              ：{device.modelName}</div>
            <div className={styles.leftRow}>
              <div>IP地址</div>
              ：
              <span>
                {device.ip ? `(外)${device.ip}` : ''} {data?.data?.devip ? <><br/>(内){data?.data?.devip}</> : ''}
              </span>
            </div>
            <div className={styles.leftRow}>
              <div>MAC地址</div>
              ：{device.mac}</div>
            <div className={styles.leftRow}>
              <div>位置信息</div>
              ：{device.area}</div>
            <div className={styles.leftRow}>
              <div>GPS定位</div>
              ：{device.longitude || '-'}，{device.latitude || '-'}</div>
          </Space>
        </Col>
        <Col span={12} className={styles.rightCol}>
          <Space direction="vertical" size={8} style={{width: '100%'}}>
            {
              detailLoading ? <div style={{textAlign: 'center'}}>
                <Spin size="large"/>
              </div> : isArray(data.layout).map((item, index) => {
                let value = '';
                if (!data.data) {
                  value = '';
                } else if (Array.isArray(data.data) && !!item.field) {
                  const arrayIndex = item.field.split('_')[0];
                  const field = item.field.split('_')[1];
                  value = data.data[arrayIndex]?.[field];
                } else {
                  value = data.data[item.field];
                }
                return <div key={index} className={styles.rightRow}>
                  <div>{item.title}</div>
                  ：{typeof value === 'number' ? `${value}` : (value || '-')}</div>;
              })
            }
          </Space>
        </Col>
      </Row>
      <div style={{marginTop: 16, textAlign: 'center'}}>
        <Space size={24}>
          <Button type="link" onClick={() => onMarkerClick(device)}>设备详情</Button>
          <Button hidden={deviceModal.status !== 'error'} type="link" onClick={() => onHistory(`/alarm/record?mac=${device.mac}`)}>报警记录</Button>
        </Space>
      </div>
    </Modal>

    {/*4012*/}
    <Modal
      mask={false}
      centered
      className={classNames(styles.modal, deviceModal.className)}
      width={700}
      title={deviceModal.title}
      onCancel={() => setOpen4012(false)}
      open={open4012}
      footer={null}
    >
      <div id="map-class">
        {
          detailLoading ? <div style={{textAlign: 'center'}}>
            <Spin size="large"/>
          </div> : isArray(data.layout).map((item, index) => {
            if (!data.data) {
              return <div>暂无数据</div>;
            } else if (item.title === '基本信息'){
              return <Row style={{width: '100%'}}>
                <Col span={12}>
                  <Space direction="vertical" size={8} style={{width: '100%'}}>
                    <div id='ount-down-button' className={styles.leftRow}>
                      <div>总闸状态</div>
                      ：
                      <span
                        style={{color: data.data.powerOff ? '#00a660' : '#b2b1b1'}}>{data.data.powerOff ? '在线' : '离线'}</span>
                      <OuntDown item={buttonData.button[1].downDatas[0]} run={submitRun} MAC={device.mac} />
                    </div>
                    <div className={styles.leftRow}>
                      <div>电网电压</div>
                      ：{data.data.gridVoltage}
                      <Badge style={{marginLeft:'10px', cursor: 'pointer'}} count={<EyeOutlined style={{ color: '#f5222d',padding: '4px' }} />} onClick={() => {
                        setOpenChar({protocolType: 'dwgd', defaultType: '', ...infoVisible});
                      }} />
                    </div>
                    <div className={styles.leftRow}>
                      <div>空开后电压</div>
                      ：{data.data.kongkai}
                      <Badge style={{marginLeft:'10px', cursor: 'pointer'}} count={<EyeOutlined style={{ color: '#f5222d',padding: '4px' }} />} onClick={() => {
                        setOpenChar({protocolType: 'dwgd', defaultType: '', ...infoVisible});
                      }} />
                    </div>
                    <div className={styles.leftRow}>
                      <div>柜门状态</div>
                      ：
                      <span
                        style={{color: data.data.door === '打开' ? 'red' : '#00a660'}}>{data.data.door}</span>
                      <Badge style={{marginLeft:'10px', cursor: 'pointer'}} count={<EyeOutlined style={{ color: '#f5222d',padding: '4px' }} />} onClick={() => {
                        setOpenChar({protocolType: 'fsjc', defaultType: 'door', ...infoVisible});
                      }} />
                    </div>
                  </Space>
                </Col>
                <Col span={12} className={styles.rightCol}>
                  <Space direction="vertical" size={8} style={{width: '100%'}}>
                    <div className={styles.leftRow} style={{marginLeft: 'calc(100% - 195px)'}}>
                      <Badge count={<AlertOutlined style={{ color: '#f5222d',padding: '4px' }} />} />
                      <div style={{textAlign:'left'}}>告警数量：</div>
                      <span style={{color: 'red', textAlign:'left'}}>{alarmData.alarm.errorNum}</span>
                      <Button style={{marginTop:'-5px'}} type="link" onClick={() => onHistory(`/alarm/record?mac=${device.mac}`)}>报警列表</Button>
                    </div>
                    <Layout style={{background: '#FFF !important'}}>
                      <Sider>
                        <Row style={{textAlign:'center'}}>
                          <Col span={8}>
                            <div>
                              Com1
                            </div>
                          </Col>
                          <Col span={8}>
                            <div>
                              Com2
                            </div>
                          </Col>
                          <Col span={8}>
                            <div>
                              主干网
                            </div>
                          </Col>
                          <Col span={8}>
                            <div>
                              {data.data.comboSpeed1}
                            </div>
                          </Col>
                          <Col span={8}>
                            <div>
                              {data.data.comboSpeed2}
                            </div>
                          </Col>
                          <Col span={8}>
                            <div>
                              {data.data.mainEth}
                            </div>
                          </Col>
                        </Row>
                      </Sider>
                      <Layout style={{background: '#FFF !important'}}>
                        <Header style={{background: '#FFF !important'}}>
                          <div id='ount-down-btn'>
                            <OuntDown item={buttonData.button[1].downDatas[1]} run={submitRun} MAC={device.mac} />
                          </div>
                        </Header>
                        <Content style={{background: '#FFF !important'}}>
                          <Button onClick={() => onMarkerClick(device)} style={{marginLeft: '40px', marginTop: '5px'}} type="primary" size="small">
                            基础数据
                          </Button>
                        </Content>
                        <Footer style={{background: '#FFF !important'}}>
                          <Button onClick={() => {
                            setOpenChar({protocolType: 'fsjc', defaultType: '', ...infoVisible});
                          }} style={{marginLeft: '40px', marginTop: '5px'}} type="primary" size="small">
                            工作环境
                          </Button>
                        </Footer>
                      </Layout>
                    </Layout>
                  </Space>
                </Col>
              </Row>;
            } else if (item.title === '接入网口供电电压'){
              return <Row style={{width: '100%'}}>
                <Col span={24}>
                  <strong>{item.title}</strong>
                  <Row style={{textAlign:'center', width: '100%'}}>
                    {
                      isArray(item.data[0]).map((items, indexs) => {
                        return <Col span={2}> { items.title } </Col>;
                      })
                    }
                  </Row>
                  <Row style={{textAlign:'center', width: '100%'}}>
                    {
                      isArray(item.data[0]).map((items, indexs) => {
                        let value;
                        if (!items) {
                          value = '';
                        } else {
                          value = data.data[items.field];
                        }
                        return <Col style={{color: '#00a660', cursor: 'pointer'}} span={2} onClick={() => {
                          if (items.path) {
                            setOpenChar({protocolType: items.path, defaultType: items.url, ...infoVisible});
                          }
                        }}>
                          {typeof value === 'number' ? `${value}` : (value || '-')}
                        </Col>;
                      })
                    }
                  </Row>
                </Col>
              </Row>;
            } else if (item.title === '接入网口网络状态'){
              return <Row style={{width: '100%', marginTop: '10px'}}>
                <Col span={24}>
                  <strong>{item.title}</strong>
                  <Row style={{textAlign:'center', width: '100%'}}>
                    {
                      isArray(item.data[0]).map((items, indexs) => {
                        return <Col span={2}> { items.title } </Col>;
                      })
                    }
                  </Row>
                  <Row style={{textAlign:'center', width: '100%'}}>
                    {
                      isArray(item.data[0]).map((items, indexs) => {
                        let value = '';
                        if (!items) {
                          value = '';
                        } else {
                          value = data.data[items.field];
                        }
                        return <Col style={{color: value === '通' ? '#00a660' : '#b2b1b1'}} span={2}>
                          {typeof value === 'number' ? `${value}` : (value || '-')}
                        </Col>;
                      })
                    }
                  </Row>
                </Col>
              </Row>;
            } else if (item.title === '接入网口网络速率'){
              return <Row style={{width: '100%', marginTop: '10px'}}>
                <Col span={24}>
                  <strong>{item.title}</strong>
                  <Row style={{textAlign:'center', width: '100%'}}>
                    {
                      isArray(item.data[0]).map((items, indexs) => {
                        return <Col span={2}> { items.title } </Col>;
                      })
                    }
                  </Row>
                  <Row style={{textAlign:'center', width: '100%'}}>
                    {
                      isArray(item.data[0]).map((items, indexs) => {
                        let value = '';
                        if (!items) {
                          value = '';
                        } else {
                          value = data.data[items.field];
                        }
                        return <Col style={{color: '#00a660'}} span={2}>
                          {typeof value === 'number' ? `${value}` : (value || '-')}
                        </Col>;
                      })
                    }
                    {
                      isArray(item.data[0]).map((items, indexs) => {
                        return <Col style={{color: '#00a660', cursor: 'pointer'}} span={2} onClick={() => console.log('视频详情')}>
                          视频
                        </Col>;
                      })
                    }
                  </Row>
                </Col>
              </Row>;
            } else {
              return <div>暂无数据</div>;
            }
          })
        }
      </div>
    </Modal>

    {/*铁塔*/}
    <Modal
      mask={false}
      centered
      className={classNames(styles.modal, deviceModal.className)}
      width={700}
      title={deviceModal.title}
      onCancel={() => setOpenTieTa(false)}
      open={openTieTa}
      footer={null}
    >
      <div id="map-class">
        <Row style={{width: '100%'}}>
          <Col span={12}>
            <Space direction="vertical" size={8} style={{width: '100%'}}>
              <div className={styles.leftRow}>
                <div>设备状态</div>
                ：
                <span
                  style={{color: deviceModal.deviceOnline ? '#00a660' : '#b2b1b1'}}>{deviceModal.deviceOnline ? '在线' : '离线'}</span>
              </div>
              <div className={styles.leftRow}>
                <div>柜门状态</div>
                ：
                <span
                  style={{color: deviceModal.deviceOnline ? '#00a660' : 'red'}}>{deviceModal.deviceOnline ? '关闭' : '开启'}</span>
                <Switch style={{ marginLeft: '10px', marginTop: '3px' }} size="small" defaultChecked='true' onChange={(checked) => console.log(`柜门状态改变：${checked}`)} />
              </div>
            </Space>
          </Col>
          <Col span={12} className={styles.rightCol}>
            <Space direction="vertical" size={8} style={{width: '100%'}}>
              <div className={styles.leftRow} style={{marginLeft: 'calc(100% - 195px)'}}>
                <Badge count={<AlertOutlined style={{ color: '#f5222d',padding: '4px' }} />} />
                <div style={{textAlign:'left'}}>告警数量：</div>
                <span style={{color: 'red', textAlign:'left'}}>23</span>
                <Button style={{marginTop:'-5px'}} type="link" onClick={() => onHistory(`/alarm/record?mac=${device.mac}`)}>报警列表</Button>
              </div>
              <div className={styles.leftRow}>
                <Button onClick={() => onMarkerClick(device)} style={{marginLeft: 'calc(100% - 80px)', marginTop: '-5px'}} type="primary" size="small">
                  基础数据
                </Button>
              </div>
            </Space>
          </Col>
        </Row>
        <Divider />
        <Row style={{width: '100%'}}>
          <Col span={24}>
            <Row style={{textAlign:'center', width: '100%'}}>
              <Col span={8}>
                供电输出类型：电网输出供电
              </Col>
              <Col span={8}>
                空开控制：
                <Switch style={{ marginLeft: '10px', marginTop: '-3px' }} size="small" defaultChecked='true' onChange={(checked) => console.log(`空开控制：${checked}`)} />
                <Badge style={{marginLeft:'5px', cursor: 'pointer', marginTop: '-2px'}} count={<EyeOutlined style={{ color: '#f5222d',padding: '4px' }} />} onClick={() => console.log('空开控制历史')} />
              </Col>
              <Col span={8}>
                电池总容量：20h
                <Badge style={{marginLeft:'5px', cursor: 'pointer', marginTop: '-2px'}} count={<EyeOutlined style={{ color: '#f5222d',padding: '4px' }} />} onClick={() => console.log('电池总容量历史')} />
              </Col>
              <Col span={8}>
                输入电压：220V
                <Badge style={{marginLeft:'5px', cursor: 'pointer', marginTop: '-2px'}} count={<EyeOutlined style={{ color: '#f5222d',padding: '4px' }} />} onClick={() => console.log('输入电压历史')} />
              </Col>
              <Col span={8}>
                输入电流：1.2A
                <Badge style={{marginLeft:'5px', cursor: 'pointer', marginTop: '-2px'}} count={<EyeOutlined style={{ color: '#f5222d',padding: '4px' }} />} onClick={() => console.log('输入电流历史')} />
              </Col>
              <Col span={8}>
                电池剩余容量：16h
                <Badge style={{marginLeft:'5px', cursor: 'pointer', marginTop: '-2px'}} count={<EyeOutlined style={{ color: '#f5222d',padding: '4px' }} />} onClick={() => console.log('电池剩余容量历史')} />
              </Col>
              <Col span={8}>
                输出电压：220V
                <Badge style={{marginLeft:'5px', cursor: 'pointer', marginTop: '-2px'}} count={<EyeOutlined style={{ color: '#f5222d',padding: '4px' }} />} onClick={() => console.log('输出电压历史')} />
              </Col>
              <Col span={8}>
                输出电流：1.2A
                <Badge style={{marginLeft:'5px', cursor: 'pointer', marginTop: '-2px'}} count={<EyeOutlined style={{ color: '#f5222d',padding: '4px' }} />} onClick={() => console.log('输出电流历史')} />
              </Col>
              <Col span={8}>
                剩余供电时间：12h23m
                <Badge style={{marginLeft:'5px', cursor: 'pointer', marginTop: '-2px'}} count={<EyeOutlined style={{ color: '#f5222d',padding: '4px' }} />} onClick={() => console.log('剩余供电时间历史')} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Modal>

    <Drawer
      title={`终端备注：${openChar.remarks || '-'}    设备型号：${openChar.modelName}`}
      destroyOnClose
      style={{minWidth: '50vw'}}
      className={styles.drawer}
      open={openChar.protocolType}
      onClose={() => setOpenChar({})}
      extra={<DateSelect
        value={date}
        onChange={setDate}
      />}
    >
      <DeviceChar device={openChar} date={date} defaultType={openChar?.defaultType} />
    </Drawer>
  </div>;
};

export default React.forwardRef(Bmap);
