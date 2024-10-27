chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: toggleSidebar,
  });
});
// Function to toggle the sidebar
function toggleSidebar() {
  // Check if the sidebar already exists
  const existingSidebar = document.getElementById("ai-sidebar");

  if (existingSidebar) {
    // If sidebar exists, remove it and reset the page layout
    document.body.style.marginRight = "0";
    existingSidebar.remove();
  } else {
    // Create the sidebar div
    const sidebar = document.createElement("div");
    sidebar.id = "ai-sidebar";
    sidebar.style.position = "fixed";
    sidebar.style.right = "0";
    sidebar.style.top = "0";
    sidebar.style.width = "400px"; // Adjust width
    sidebar.style.height = "100vh"; // Full page height
    sidebar.style.backgroundColor = "#f1f1f1"; // Light grey background
    sidebar.style.zIndex = "9999"; // Ensure it's on top
    sidebar.style.boxShadow = "-2px 0 5px rgba(0, 0, 0, 0.5)"; // Add shadow for separation
    sidebar.style.overflowY = "auto"; // Enable scrolling if the content exceeds the height
    sidebar.style.padding = "0"; // Remove padding for the iframe

    // Create an iframe to load index.html
    const iframe = document.createElement("iframe");
    iframe.src = chrome.runtime.getURL("index.html"); // Load the index.html from the extension
    iframe.style.width = "100%"; // Full width of the sidebar
    iframe.style.height = "100%"; // Full height of the sidebar
    iframe.style.border = "none"; // Remove default iframe border

    // Append the iframe to the sidebar
    sidebar.appendChild(iframe);

    // Append the sidebar to the body
    document.body.appendChild(sidebar);

    // Adjust the page content to make room for the sidebar
    document.body.style.marginRight = "300px"; // Same as sidebar width
  }
}
chrome.action.onClicked.addListener((tab) => {
  console.log("alert from background.js");
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      files: ["content.js"],
    },
    () => {
      console.log("content loaded");
    }
  );
});
