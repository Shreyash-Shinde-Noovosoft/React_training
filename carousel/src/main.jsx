import 'bootstrap/dist/css/bootstrap.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import Root from "./routes/root"
import Counter from "./components/Counter.jsx"
import BasicForm from './components/Form.jsx'
import ThemeChanger from './components/ThemeChanger.jsx'
import Toggler from './components/Toggler.jsx'
import Store from './components/Store.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "counter",
        element: <Counter />,
      },
      {
        path: "store",
        element: <Store />,
      },
      {
        path: "toggler",
        element: <Toggler />,
      },
      {
        path: "theme-changer",
        element: <ThemeChanger />,
      },
      {
        path: "form",
        element: <BasicForm />,
      },
    ],
    
  },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <Counter /> */}
    {/* <BasicForm /> */}
    <RouterProvider router={router} />
    {/* <ThemeChanger /> */}
    {/* <Toggler /> */}
    {/* <Store /> */}
  </StrictMode>,
)
