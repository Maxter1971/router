type Listener = {
  id: number;
  match: Function | string | RegExp;
  onEnter(el: HTMLElement, data: string): void;
  onLeave(el: HTMLElement, data: string): void;
  onBeforeEnter(el: HTMLElement, data: string): void;
};

export function Router() {
  const listeners: Listener[] = [];
  const location: Location = document.location;
  let currentPath = location.pathname;
  let previousPath: string | null = null;
  const history = window.history;

  const isMatch = (match: Function | string, path: string | null) =>
    (match instanceof RegExp && match.test(path as string)) ||
    (typeof match === "function" && match(path)) ||
    (typeof match === "string" && match === path);

  const handleListener = async ({
    match,
    onEnter,
    onLeave,
    onBeforeEnter,
  }: {
    match: any;
    onEnter: any;
    onLeave: any;
    onBeforeEnter: any;
  }) => {
    const args = { currentPath, previousPath, state: history.state };

    isMatch(match, currentPath) && (await onEnter(args));
    onLeave && isMatch(match, previousPath) && (await onLeave(args));
    onBeforeEnter && (await onBeforeEnter(args));
  };

  const handleAllListeners = () => listeners.forEach(handleListener);

  const generateId = () => {
    const getRandomNumber = () =>
      Math.floor(Math.random() * listeners.length * 1000);
    const doesExist = (id: number) =>
      listeners.find((listener) => listener.id === id);

    let id = getRandomNumber();
    while (doesExist(id)) {
      id = getRandomNumber();
    }
    return id;
  };

  const on = (
    match: Function | string | RegExp,
    onEnter: any,
    onLeave: any,
    onBeforeEnter: any
  ) => {
    const id = generateId();

    const listener = { id, match, onEnter, onLeave, onBeforeEnter };
    listeners.push(listener);
    handleListener(listener);
    return listeners;
  };

  const go = (url: string, state: Object) => {
    previousPath = currentPath;
    history.pushState(state, url, url);
    currentPath = location.pathname;

    handleAllListeners();
    return currentPath;
  };

  window.addEventListener("popstate", handleAllListeners);

  return { on, go };
}
