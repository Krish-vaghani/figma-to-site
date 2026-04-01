import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { store } from "./store";
import "./index.css";
import faviconUrl from "./assets/IMG_20260314_110118_242.webp";

const favicon = document.createElement("link");
favicon.rel = "icon";
favicon.type = "image/webp";
favicon.href = faviconUrl;
document.head.appendChild(favicon);

const appleTouch = document.createElement("link");
appleTouch.rel = "apple-touch-icon";
appleTouch.href = faviconUrl;
document.head.appendChild(appleTouch);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
