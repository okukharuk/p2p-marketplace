import { useCallback } from "react";
import { createRoot } from "react-dom/client";

export const useNewWindow = () => {
  const openNewWindow = useCallback((children) => {
    let newWindow = window.open("", "_blank", "left=1000,top=100,width=320,height=320,popup=yes");

    const div = document.createElement("div");
    div.setAttribute("style", "height: calc(100vh - 16px); width: full");
    const root = createRoot(div);
    root.render(children);
    newWindow.document.body.appendChild(div);
  }, []);

  return {
    openNewWindow,
  };
};
