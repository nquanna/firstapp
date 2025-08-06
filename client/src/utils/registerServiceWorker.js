import constanst from "./constanst";
import api from "./api";

// Check for service worker
let subscription;
const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) register().catch((err) => console.error(err));

  async function register() {
    const register = await navigator.serviceWorker.register("/serviceWorker.js", {
      scope: "/",
    });

    subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(constanst.vapidPublicKey),
    });
  }
};

const sendNotification = () => {
  if (!subscription) return console.error("not subscription");
  api.request({
    path: "/learn/subscribe",
    method: "post",
    data: subscription,
  });
};

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export { sendNotification };
export default registerServiceWorker;
