import { Routes, Route, useLocation } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { AuthContext } from './contex/authContext'
import Home from './pages/home/Home'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import MyPosts from './pages/myposts/MyPosts'
import Sidebar from './components/sidebar/Sidebar'

import './App.css'

function App() {
  const { currentUser } = useContext(AuthContext)
  const queryClient = new QueryClient()
  const location = useLocation()

  const noSidebarPaths = ["/login", "/register"]

  const ProtectedRoute = ({ children }) => {
    if(!currentUser) {
      return <Navigate to="/login" />
    }

    return children
  }

  const AuthorizedRoute = ({ children }) => {

    if(currentUser) {
      return <Navigate to="/" />
    }

    return children
  }

  return (
    <div className="app">
      {!noSidebarPaths.includes(location.pathname) && <Sidebar />}
      
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home />
            }
          />

          <Route 
            path="/my-posts" 
            element={
              <ProtectedRoute>
                <MyPosts />
              </ProtectedRoute>
            }
          />

          <Route 
            path="/register" 
            element={
              <AuthorizedRoute>
                <Register />
              </AuthorizedRoute>
            }
          />

          <Route 
            path="/login" 
            element={
              <AuthorizedRoute>
                <Login />
              </AuthorizedRoute>
            }
          />

        </Routes>
      </QueryClientProvider>
    </div>
  )
}

export default App
