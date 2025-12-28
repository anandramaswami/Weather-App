import ForecastPage from "./pages/forecast"
import HomePage from "./pages/home"
import { BrowserRouter, Routes, Route } from "react-router"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/forecast" element={<ForecastPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
