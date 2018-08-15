// 向页面注入JS
function injectCustomJs(jsPath) {
  jsPath = jsPath || 'js/inject.js';
  var temp = document.createElement('script');
  temp.setAttribute('type', 'text/javascript')
  temp.src = chome.extension.getURL(jsPath);
  temp.onload = function(){
    this.parentNode.removeChild(this);
  };
  document.head.appendChild(temp);
}