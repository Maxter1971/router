import { Router } from "./router";
import { createRender, onBeforeEnter, onLeave } from "./hooks";

window.addEventListener("load", () =>
  console.log(`PAGE FULLY RELOADED ${Date.now()}`)
);

const router = Router();

router.on(/.*/, createRender("/"), onLeave("/"), onBeforeEnter("/"));
router.on(
  (path: string) => path === "/contacts",
  createRender("contacts"),
  onLeave("contacts"),
  onBeforeEnter("contacts")
);
router.on(
  "/about",
  createRender("about"),
  onLeave("about"),
  onBeforeEnter("about")
);
router.on(
  "/community",
  createRender("community"),
  onLeave("community"),
  onBeforeEnter("community")
);

document.body.addEventListener("click", (event) => {
  // if (!(event.target as HTMLElement).matches("a")) {
  //   return;
  //  }
  event.preventDefault();
  const url = (event.target as HTMLElement).getAttribute("href") as string;
  router.go(url, { url });
});
