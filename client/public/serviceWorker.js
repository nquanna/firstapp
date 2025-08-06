// eslint-disable-next-line
self.addEventListener("push", (event) => {
  const data = event.data.json();

  const options = { body: data.body || "Default body!", icon: "./logo512.png" };

  event.waitUntil(self.registration.showNotification(data.title, options));
});
