self.addEventListener("push", function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || "/icon-512x512.png",
      badge: "/badge.png",
      vibrate: [100, 50, 100],
      data,
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    self.clients.openWindow(`${event.notification.data.path ?? "/"}`),
  );
});
