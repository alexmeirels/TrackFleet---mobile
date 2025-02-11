import React from 'react'
import AppNavigator from '@/app/navigation'
import AuthProvider from '@/app/hooks/useAuth'

const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  )
}

export default App
