import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { BasketPage } from "./pages/BasketPage";
import { BasketProvider } from "./contexts/BasketContext";

function App() {
  return (
    <BrowserRouter>
      <BasketProvider>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="/basket" element={<BasketPage />} />
          </Route>
        </Routes>
      </BasketProvider>
    </BrowserRouter>
  );
}

export default App;
