import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/index.ts'
import ErrorPage from './components/ErrorPage.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Musics from './components/music/Musics.tsx'

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
   
     
    {
      path: "/musics",
      element: <Musics />,
    },
   
  ]);

ReactDOM.createRoot(document.getElementById('root')!).render(
 <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />

</Provider>
 </React.StrictMode>
)
