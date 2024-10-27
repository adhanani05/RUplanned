document.addEventListener("DOMContentLoaded", () => {
  console.log("Popup loaded");

  // Query the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (chrome.runtime.lastError) {
      console.error("Error querying tabs:", chrome.runtime.lastError);
      document.getElementById("message").textContent = "Error querying tabs.";
      return;
    }

    if (!tabs || !tabs.length) {
      console.error("No active tab found.");
      document.getElementById("message").textContent = "No active tab found.";
      return;
    }

    const activeTab = tabs[0];
    const currentUrl = activeTab.url;
    console.log("Current URL:", currentUrl);

    const requiredUrlPattern = "https://sims.rutgers.edu/csp/*";
    const urlPattern = new RegExp(requiredUrlPattern.replace(/\*/g, ".*"));

    const messageElement = document.getElementById("message");

    // Check if the current URL matches the required pattern
    if (urlPattern.test(currentUrl)) {
      messageElement.textContent = "Welcome to RU Planner!";
    } else {
      messageElement.textContent = "Invalid URL";
      messageElement.classList.add("invalid-url");
    }
  });
});

document.querySelectorAll(".rating").forEach((ratingElement) => {
  const rating = parseFloat(ratingElement.getAttribute("data-rating"));
  if (rating >= 4.0) {
    ratingElement.style.color = "#27ae60"; // Green for ratings 4.0 and above
  } else if (rating >= 3.0) {
    ratingElement.style.color = "#f1c40f"; // Yellow for ratings 3.0 to 4.0
  } else {
    ratingElement.style.color = "#e74c3c"; // Red for ratings below 3.0
  }
});
