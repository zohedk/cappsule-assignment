import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "./components/Provider.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider>
    <App />
    <ReactQueryDevtools />
  </Provider>
);
