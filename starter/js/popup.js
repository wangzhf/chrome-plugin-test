// 访问background页面
var login = document.getElementById('loginBtn');
login.onclick = function () {
  var bg = chrome.extension.getBackgroundPage();
  
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var ret = bg.returnMsg2Pop(username, password);
  console.log('ret: ', ret);
  alert(ret + '::::' + bg.document.body.innerHTML);
}

// 向content script主动发送消息
function sendMessageToContentScript(message, callback) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, message, function(response){
      if(callback) callback(response);
    })
  })
}

sendMessageToContentScript({cmd: 'test', value: 'hello, i am popup!'}, function (response) {
  console.log('from content: ' + response);
});

// 获取tabId
function doInCurrentTab(tabCallback) {
  chrome.tabs.query(
    { currentWindow: true, active: true },
    function (tabArray) { tabCallback(tabArray[0]); }
  );
}
