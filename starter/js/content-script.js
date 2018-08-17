document.addEventListener('DOMContentLoaded', function(){
  console.log('this is content script');

  // 注入inject js
  injectCustomJs();
})

// 向页面注入JS，必须在页面加载完成后调用，否则head为null
function injectCustomJs(jsPath) {
  jsPath = jsPath || 'js/inject-script.js';
  var temp = document.createElement('script');
  temp.setAttribute('type', 'text/javascript');
  temp.src = chrome.extension.getURL(jsPath);
  document.head.appendChild(temp);
  temp.onload = function(){
    // this.parentNode.removeChild(this);
  };
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if(request.cmd == 'test') console.log(request.value);
  sendResponse('content script received your message.');
});


// 发送消息给后台background
chrome.runtime.sendMessage(
  {greeting: 'Hello, I am content script, I am initiative send msg to you!'}, 
  function(response){
    console.log('Received msg from background: ' + response);
  }
);


// 接收来自inject的消息
window.addEventListener('message', function(e) {
  if (e.data.test) {
    console.log(e.data.test);
  }
}, false);
