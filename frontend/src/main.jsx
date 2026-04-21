import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
import { CartContext } from "./context/CartContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContext>
      <CartContext>
        <Toaster position="top-right" reverseOrder={false} />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartContext>
    </AuthContext>
  </StrictMode>,
);
