//background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "replaceWords") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        func: replaceWords,
        args: [request.oldWord, request.newWord]
      });
    });
  }
});

function replaceWords(oldWord, newWord) {
  var elements = document.getElementsByTagName('*');
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    for (var j = 0; j < element.childNodes.length; j++) {
      var node = element.childNodes[j];
      if (node.nodeType === 3) {
        var text = node.nodeValue;
        var replacedText = text.replace(new RegExp(oldWord, 'gi'), newWord);
        if (replacedText !== text) {
          element.replaceChild(document.createTextNode(replacedText), node);
        }
      }
    }
  }
}