document.addEventListener('DOMContentLoaded', function(){
  console.log('this is content script');
})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if(request.cmd == 'test') console.log(request.value);
  sendResponse('content script received your message.');
});