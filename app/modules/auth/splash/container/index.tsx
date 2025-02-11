import React, { useEffect } from 'react'
import SplashScreen from '@/app/modules/auth/splash/screen'
import { useAuth } from '@/app/hooks/useAuth'

const SplashContainer = () => {
  const { handleSigninWithGoogle, promptAsync, response, userInfo, loading } = useAuth()

  useEffect(() => {
    handleSigninWithGoogle()
  }, [response])

  return (
    <SplashScreen signIn={promptAsync} loading={loading} />
  )
}
export default SplashContainer