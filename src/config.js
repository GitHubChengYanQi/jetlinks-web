export default {
  default: {
    logLevel: 'info',
    component: 'ant',
    baseURI: 'http://192.168.5.253:9666'
  },
  home: {
    logLevel: 'info',
    component: 'ant',
    baseURI: 'http://127.0.0.1:8081'
  },
  production: {
    logLevel: 'error'
  }
};
