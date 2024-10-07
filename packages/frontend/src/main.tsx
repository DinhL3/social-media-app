import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import './index.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Root from './routes/root.tsx';
import About from './routes/about.tsx';
import Layout from './Layout.tsx';

import store from './app/store'; // Your Redux store
import { Provider } from 'react-redux'; // Import the Redux Provider
import Login from './routes/login.tsx';
import Register from './routes/register.tsx';

// This way is of setting up react-router-dom is based on the official documentation of v6.26.2

const router = createBrowserRouter([
  {
    path: '/', // Base path for the layout
    element: <Layout />, // Use Layout as the element
    children: [
      {
        path: '/',
        element: <Root />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Wrap your entire app with the Redux Provider and pass the store */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
