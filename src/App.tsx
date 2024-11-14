import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "@/components/layout.tsx";
import { ThemeProvider } from "@/context/theme-provider.tsx";
import WeatherDashboard from "@/pages/weather-dashboard.tsx";
import CityPage from "@/pages/city-page.tsx";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Layout />
        <Routes>
          <Route path="/" element={<WeatherDashboard />} />
          <Route path="/city/:cityName" element={<CityPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
