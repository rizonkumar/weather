import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "@/components/layout.tsx";
import { ThemeProvider } from "@/context/theme-provider.tsx";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
