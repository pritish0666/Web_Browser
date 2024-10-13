const { webFrame } = require("electron");
const webview = document.createElement("webview");
webview.style.width = "100%";
webview.style.height = "100%";
document.getElementById("browser-view").appendChild(webview);

// Navigation controls
document.getElementById("back").addEventListener("click", () => {
  webview.goBack();
});
document.getElementById("forward").addEventListener("click", () => {
  webview.goForward();
});
document.getElementById("reload").addEventListener("click", () => {
  webview.reload();
});
document.getElementById("go").addEventListener("click", () => {
  const url = document.getElementById("url").value;
  webview.src = url.startsWith("http") ? url : `http://${url}`;
});

// Load a default page
webview.src = "https://www.google.com";
