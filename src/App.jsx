import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Collection from './pages/Collection'
import Farmers from './pages/Farmers'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="collection" element={<Collection />} />
        <Route path="farmers" element={<Farmers />} />
        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}
