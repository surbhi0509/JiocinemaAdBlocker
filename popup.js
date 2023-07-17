document.addEventListener("DOMContentLoaded", function () {
  var button = document.getElementById("ads");

  // Retrieve the stored value on page load
  chrome.storage.local.get("adsEnabled", function (result) {
    if (result.adsEnabled) {
      button.checked = true;
    }
  });

  // Add event listener to toggle the button state and send a message to the background script
  button.addEventListener("change", function () {
    if (!this.checked) {
      chrome.runtime.sendMessage({ action: 'removeHeaders' });
    }

    if(this.checked){
      // Example code in the popup
    chrome.runtime.sendMessage({ action: 'blockAll' });
}
    chrome.storage.local.set({ adsEnabled: this.checked });
  });
});
