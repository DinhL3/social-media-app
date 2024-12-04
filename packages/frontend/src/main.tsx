import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; // Import ThemeProvider
import CssBaseline from '@mui/material/CssBaseline'; // Import CssBaseline for global styles
import theme from './theme'; // Import your custom theme

import './index.css';

import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';

import Root from './routes/root.tsx';
import About from './routes/about.tsx';
import Layout from './Layout.tsx';
import store from './app/store'; // Your Redux store
import { Provider } from 'react-redux'; // Import the Redux Provider
import Login from './routes/login.tsx';
import Register from './routes/register.tsx';
import ErrorPage from './components/ErrorPage/ErrorPage.tsx';
import CreateNewPost from './routes/create-new-post.tsx';
import ChatPage from './routes/chat-page.tsx';
import PostDetails from './routes/post-details.tsx';
import Profile from './routes/profile.tsx';
import Search from './routes/search.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
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
      {
        path: 'create-new-post',
        element: <CreateNewPost />,
      },
      {
        path: 'chat',
        element: <ChatPage />,
      },
      {
        path: 'post-details/:postId',
        element: <PostDetails />,
      },
      {
        path: 'profile/:username',
        element: <Profile />,
      },
      {
        path: 'search',
        element: <Search />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      {/* Apply the theme to your app */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
