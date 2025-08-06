// eslint-disable-next-line
self.addEventListener("push", (e) => {
  const data = e.data.json();

  // eslint-disable-next-line
  self.registration.showNotification(data.title, {
    body: "Notified by Traversy Media!",
    icon: "http://image.ibb.co/frYOFd/tmlogo.png",
  });
});
