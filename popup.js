document.getElementById('replaceButton').addEventListener('click', function() {
  var oldWord = document.getElementById('oldWord').value;
  var newWord = document.getElementById('newWord').value;

  chrome.runtime.sendMessage({
    action: "replaceWords",
    oldWord: oldWord,
    newWord: newWord
  });
});