import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Dashboard from '../pages/Dashboard'
import Markets from '../pages/Markets'
import Trading from '../pages/Trading'
import Wallet from '../pages/Wallet'
import Orders from '../pages/Orders'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import FAQ from '../pages/FAQ'
import Charts from '../pages/Charts'
import ProtectedRoute from './ProtectedRoute'

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/markets"
          element={
            <MainLayout>
              <Markets />
            </MainLayout>
          }
        />
        <Route
          path="/charts"
          element={
            <MainLayout>
              <Charts />
            </MainLayout>
          }
        />
        <Route
          path="/trading"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Trading />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/wallet"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Wallet />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Orders />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
