export const createRender =
  (content: string) =>
  (...args: any[]) => {
    console.info(`${content} args=${JSON.stringify(args)}`);
    (
      document.getElementById("root") as HTMLElement
    ).innerHTML = `<h2>${content}</h2>`;
    (document.getElementById(content) as HTMLElement).style.color = "blue";
  };

export const onBeforeEnter =
  (elemId: string) =>
  (...args: any[]) => {
    (document.getElementById(elemId) as HTMLElement).style.fontStyle = "italic";
  };
export const onLeave =
  (elemId: string) =>
  (...args: any[]) => {
    (document.getElementById(elemId) as HTMLElement).style.color = "red";
  };
