import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthenticationContextProvider from "./context/AuthContext.tsx";
import CartContextProvider from "./context/CartContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="220876944567-b609gs9pbjrrjpaapm3mlvtft3hjhn45.apps.googleusercontent.com">
      <AuthenticationContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </AuthenticationContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
