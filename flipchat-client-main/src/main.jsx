import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import SidebarContextProvider from "./context/SidebarContext.jsx";
import AuthProvider from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
        <AuthProvider>
          <SidebarContextProvider>
            <App />
          </SidebarContextProvider>
        </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
