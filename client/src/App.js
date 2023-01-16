import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import all components
import { Username, Password, Register, Profile, Recovery, Reset, PageNotFound, Todo } from './components';

// auth middleware
import { AuthorizeUser, ProtectRoute, UnauthorizedRoute } from './middleware/auth';

// root routes
const router = createBrowserRouter([
    {
        path : '/',
        element : <UnauthorizedRoute><Username/></UnauthorizedRoute>
    },
    {
        path : '/register',
        element : <Register></Register>
    },
    {
        path : '/password',
        element : <ProtectRoute><Password /></ProtectRoute>
    },
    {
        path : '/profile',
        element : <AuthorizeUser><Profile /></AuthorizeUser>
    },
    {
        path : '/recovery',
        element : <Recovery></Recovery>
    },
    {
        path : '/reset',
        element : <UnauthorizedRoute><Reset/></UnauthorizedRoute>
    },
    {
        path : '/todo',
        element : <AuthorizeUser><Todo /></AuthorizeUser>
    },
    {
        path : '*',
        element : <PageNotFound></PageNotFound>
    },
])

export default function App() {
  return (
    <main>
        {/* Assigning router to routerprovider */}
        <RouterProvider router = {router}></RouterProvider>
    </main>
  )
}
