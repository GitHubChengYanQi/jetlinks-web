import React, {useState, useImperativeHandle, useEffect} from 'react';
import {Button, Col, Modal, Row, Space, Spin} from 'antd';
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
  onMarkerClick = () => {
  },
  onHistory = () => {
  },
}, ref) => {

  const [dataSource] = store.useModel('dataSource');

  const customer = dataSource.customer || {};

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

  const {run: getDeviceList} = useRequest(deviceList, {
    manual: true,
    onSuccess: (res) => {
      isArray(res).forEach(item => {
        if (item.latitude && item.longitude) {
          mapMaker(item);
        }
      });
    }
  });

  const {run: getMapNum, data: mapNumber = {}} = useRequest(mapNum, {manual: true});

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

  const submit = async (newParams = {}, reset, initMap = map, baidu = baiduMap) => {
    const data = reset ? newParams : {...params, ...newParams,};
    setParams(data);
    getMapNum({data});
    initMap.clearOverlays();
    const res = await getDeviceList({data});
    const device = isArray(res).find(item => item.latitude && item.longitude);
    if (device) {
      const point = new baidu.Point(device.longitude, device.latitude);
      initMap.panTo(point);
    }
  };

  const handleScriptLoad = (BMap) => {
    setBaiduMap(BMap);
    const initMap = new BMap.Map('container');
    const point = new BMap.Point(116.404, 39.915);
    initMap.centerAndZoom(point, 8);
    initMap.enableScrollWheelZoom(true);
    setMap(initMap);

    submit({}, false, initMap, BMap);
  };

  const initMap = async () => {
    const bmapOffline = customer.platformMode === 1;
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
    if (map) {
      map.addEventListener('dragend', () => {
        getBounds(map);
      });
      map.addEventListener('zoomend', () => {
        getBounds(map);
      });
    }
    return () => {
      if (map) {
        map.removeEventListener('dragend');
        map.removeEventListener('zoomend');
      }
    };
  }, [params]);

  useEffect(() => {
    initMap();
  }, []);

  useImperativeHandle(ref, () => ({
    submit,
  }));

  return <div style={{position: 'relative', height: '100%', width: '100%'}}>

    <div className={styles.deviceCount}>
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
        <div className={styles.textErrorline}>
          报警：{mapNumber.alarmNum || 0}
        </div>
      </Space>
    </div>
    <div id="container" style={{height: '100%'}} />

    <Modal
      mask={false}
      maskClosable={false}
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
