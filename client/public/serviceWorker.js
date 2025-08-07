// eslint-disable-next-line
self.addEventListener("push", (event) => {
  const data = event.data.json();

  const options = { body: data.body || "Default body!", icon: "./logo512.png" };

  // eslint-disable-next-line
  event.waitUntil(self.registration.showNotification(data.title, options));
});
