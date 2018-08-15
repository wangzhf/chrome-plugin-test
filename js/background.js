document.addEventListener('DOMContentLoaded', function(){
  console.log('this is background script');
});

// popup可以直接调用background中的js方法，也可以直接访问background中的DOM
function returnMsg2Pop(username, password){
  console.log('username: ', username, ', password: ', password);
  return username + password;
}

// background访问popup：Popup显示时才能调用
var views = chrome.extension.getViews({type: 'popup'});
if(views.length > 0) {
  console.log('get popup info from background: ', views[0].location.href);
  var activeTabId;
  // 访问popup中的方法
  views[0].doInCurrentTab( function(tab){ 
    activeTabId = tab.id;
    console.log(activeTabId);
  });
}

// 向content script主动发送消息
function sendMessageToContentScript(message, callback) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    console.log(tabs);
    chrome.tabs.sendMessage(tabs[0].id, message, function(response){
      if(callback) callback(response);
    })
  })
}

sendMessageToContentScript({cmd: 'test', value: 'hello, i am background!'}, function (response) {
  console.log('from content script: ' + response);
})