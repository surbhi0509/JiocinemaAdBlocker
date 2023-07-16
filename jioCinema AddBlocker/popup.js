// Function to toggle the button state
function toggleButton(button) {
  button.classList.toggle("on");
}

document.addEventListener("DOMContentLoaded", function () {
  // Get the elements
  var button = document.getElementById("ads");

  // Retrieve the stored value on page load
  chrome.storage.local.get("adsEnabled", function (result) {
    if (result.adsEnabled) {
      // If the stored value is true, enable the checkbox and toggle the button state
      button.checked = true;
      toggleButton(button);
    }
  });

  // Add event listener to toggle the button state and store the value
  button.addEventListener("change", function () {
    toggleButton(this);
    // Store the value directly in chrome.storage.local
    chrome.storage.local.set({ adsEnabled: this.checked });
  });
});
