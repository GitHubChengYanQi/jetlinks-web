
export const FullScreen = (el) => {
  const isFullscreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
  if (!isFullscreen) {
    (el.mozRequestFullScreen && el.mozRequestFullScreen()) ||
    (el.webkitRequestFullscreen && el.webkitRequestFullscreen()) || (el.msRequestFullscreen && el.msRequestFullscreen());
  } else {
    document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : '';
  }
};

export const toggleFullScreen = (e) => {
  const el = e.srcElement || e.target;
  FullScreen(el);
};
