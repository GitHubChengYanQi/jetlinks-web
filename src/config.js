export default {
  default: {
    logLevel: 'info',
    component: 'ant',
    baseURI: 'http://192.168.1.179:80',
    projectName:'At-Soft软件平台'
  },
  "home": {
    logLevel: 'info',
    component: 'ant',
    baseURI: 'http://localhost',
    projectName:'At-Soft软件平台'
  },
  devOnline: {
    logLevel: 'info',
    component: 'ant',
    baseURI: 'http://tx.zhuhe.life:8081/',
    projectName:'At-Soft软件平台'
  },
  production: {
    logLevel: 'error'
  }
};
