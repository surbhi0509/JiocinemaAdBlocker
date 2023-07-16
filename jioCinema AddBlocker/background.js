// Listen for messages from popup.js
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     if (request.action === "getAdsEnabled") {
//       // Retrieve the stored value from chrome.storage.local
//       chrome.storage.local.get("adsEnabled", function (result) {
//         sendResponse({ adsEnabled: result.adsEnabled });
//       });
//       return true; // Indicates that sendResponse will be called asynchronously
//     } else if (request.action === "setAdsEnabled") {
//       // Store the value in chrome.storage.local
//       chrome.storage.local.set({ adsEnabled: request.value });
//     }
//   });

console.log("this is backgroung sript");
  