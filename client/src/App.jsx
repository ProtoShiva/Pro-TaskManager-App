import { Routes, Route, BrowserRouter } from "react-router-dom"
import axios from "axios"
import RegisterPage from "./pages/registerPage/RegisterPage"
import LoginPage from "./pages/loginPage/LoginPage"
import Dashboard from "./pages/DashBoardPage/Dashboard.jsx"
import Layout from "./layout/Layout.jsx"
import SharePage from "./pages/SharePage/SharePage.jsx"
import AnalyticsPage from "./pages/AnalyticsPage/AnalyticsPage.jsx"
import SettingsPage from "./pages/SettingsPage/SettingsPage.jsx"
import PrivateRoute from "./components/PrivateRoute.jsx"

axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.withCredentials = true

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
            <Route path="/dashboard/settings" element={<SettingsPage />} />
          </Route>
        </Route>
        <Route path="/info" element={<SharePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
