import { Router } from "./router";
import { createRender, onBeforeEnter, onLeave } from "./hooks";

describe("router", () => {
  describe("router test", () => {
    it("generates store with reducer", () => {
      document.body.innerHTML =
        "<header>" +
        "<h1>Кастомный роутинг 32 домашнее задание</h1>" +
        '<nav style="display: flex; justify-content: space-around">' +
        '  <a id="/" href="/">Home</a>' +
        '  <a id="contacts" href="/contacts">Contacts</a>' +
        '  <a id="about" href="/about">About</a>' +
        '  <a id="community" href="/community">Community</a>' +
        "</nav>" +
        "</header>" +
        '<article id="root"></article>';

      const router = Router();
      let routerListeners = router.on(
        (path: string) => path === "/contacts",
        createRender("contacts"),
        onLeave("contacts"),
        onBeforeEnter("contacts")
      );
      routerListeners = router.on(
        "/about",
        createRender("about"),
        onLeave("about"),
        onBeforeEnter("about")
      );

      const contacts = document.getElementById("contacts") as HTMLElement;
      expect(contacts.style.fontStyle).toBe("italic");
      expect(routerListeners.length).toBe(2);
      let url = "/contacts";
      const go = router.go(url, { url });

      expect(contacts.style.color).toBe("blue");
      expect(go).toBe("/contacts");
      url = "/about";
      router.go(url, { url });
      const about = document.getElementById("about") as HTMLElement;
      expect(contacts.style.color).toBe("red");
      expect(about.style.color).toBe("blue");
    });
  });
});
