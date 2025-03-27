importScripts("https://unpkg.com/dexie@latest/dist/dexie.js");

self.addEventListener("activate", (event) => {
  event.waitUntil(handleActivation());
});

async function handleActivation() {
  const db = new Dexie("MemoryAppDB");
  db.version(1).stores({ users: "++id" });

  const today = new Date().toISOString().split("T")[0];
  const users = await db.users.toArray();

  users.forEach((user) => {
    user.themes?.forEach((theme) => {
      theme.cards?.forEach((card) => {
        const latestEntry = card.Historic?.[0];
        if (latestEntry?.nexValidationDate?.startsWith(today)) {
          self.registration.showNotification(`Révision de ${card.title}`, {
            body: "Cliquez pour réviser maintenant",
            icon: "/assets/icon-192x192.png",
            data: { cardId: card.id },
          });
        }
      });
    });
  });
}

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(`/review/${event.notification.data.cardId}`),
  );
});
