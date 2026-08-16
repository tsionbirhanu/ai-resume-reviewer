import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { LandingPage } from '@/pages/LandingPage'
import { ReviewPage } from '@/pages/ReviewPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/review" element={<ReviewPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
