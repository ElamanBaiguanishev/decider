import './App.css'
import './hitmarker/stylesheet.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'

function App() {
  return <RouterProvider router={router} />
}

export default App
