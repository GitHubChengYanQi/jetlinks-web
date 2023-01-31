import React, {useState, useImperativeHandle, useEffect} from 'react';
import {Button, Col, Input, List, Modal, Popover, Row, Space, Spin, Tag} from 'antd';
import classNames from 'classnames';
import {useRequest} from '@/util/Request';
import {isArray} from '@/util/Tools';
import {deviceList, mapNum} from '@/components/Amap';
import styles from '@/components/Amap/index.module.less';
import error from '@/asseset/imgs/error.svg';
import online from '@/asseset/imgs/online.svg';
import offline from '@/asseset/imgs/offline.svg';
import store from '@/store';


export const MapDeviceDetail = {
  url: '/device/MapDeviceDetail',
  method: 'POST'
};

const Bmap = ({
  value = [],
  onChange = () => {
  },
  onMarkerClick = () => {
  },
  search
}, ref) => {

  const [dataSource] = store.useModel('dataSource');

  const customer = dataSource.customer || {};

  const bmapOffline = customer.platformMode === 1;

  const [centerPoint, setCenterPoint] = useState({});

  const [visiable, setVisiable] = useState();

  const [resluts, setResults] = useState([]);


  const [device, setDevice] = useState({});
  const [deviceModal, setDeviceModal] = useState({});
  const [open, setOpen] = useState(false);

  const [params, setParams] = useState({});

  const [baiduMap, setBaiduMap] = useState({});
  const [map, setMap] = useState();

  const {loading: detailLoading, data = {}, run} = useRequest(MapDeviceDetail, {manual: true});

  const mapMaker = (device) => {
    const deviceOnline = device.status === 'online';

    let mark = '';
    let title = '';
    let className = '';
    if (device.alarm) {
      mark = error;
      title = '设备报警';
      className = styles.error;
    } else if (deviceOnline) {
      mark = online;
      title = '设备正常';
      className = styles.online;
    } else {
      mark = offline;
      title = '设备离线';
      className = styles.offline;
    }

    const point1 = new baiduMap.Point(device.longitude, device.latitude);
    const size = new baiduMap.Size(30, 37);
    const icon = new baiduMap.Icon(mark, size);
    const marker = new baiduMap.Marker(point1, {icon});        // 创建标注
    marker.addEventListener('click', () => {
      setOpen(true);
      run({data: {deviceId: device.deviceId}});
      setDevice(device);
      setDeviceModal({title, className, deviceOnline});
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
    };
    const zoomend = () => {
      getBounds(map);
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
    const point = new BMap.Point(116.404, 39.915);
    initMap.centerAndZoom(point, 5);
    initMap.enableScrollWheelZoom(true);
    setMap(initMap);

    if (!search) {
      getBounds(initMap);
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
    if (!search) {
      return;
    }
    if (map) {
      map.addEventListener('moving', () => {
        setCenter(map.getCenter());
      });
    }
  }, [map]);

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
        <div className={styles.space} />
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

    <div id="container" style={{height: '100%'}} />

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
                {device.ip ? `(外)${device.ip}` : ''} {data?.data?.devip ? <><br />(内){data?.data?.devip}</> : ''}
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
                <Spin size="large" />
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
        <Button type="link" onClick={() => onMarkerClick(device)}>设备详情</Button>
      </div>
    </Modal>
  </div>;
};

export default React.forwardRef(Bmap);
