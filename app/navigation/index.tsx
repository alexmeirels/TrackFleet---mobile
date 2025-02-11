import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SplashNavigation from '@/app/modules/auth/splash/navigation'
import HomeNavigation from '../modules/user/home/navigation'
import VehicleMapNavigation from '@/app/modules/user/vehicleMap/navigation'
import { useAuth } from '../hooks/useAuth'

type RootStackParamList = {
  Init: any
  Home: any
  User: any
  Splash: any
  Login: any
  VehicleMap: any
}

const Stack = createStackNavigator<RootStackParamList>()


const UserStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VehicleMap"
        component={VehicleMapNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={SplashNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

const AppNavigator = () => {
  const { userInfo, setUserInfo } = useAuth()
  const [navigate, setNavigate] = useState<'login' | 'user'>('login')

  useEffect(() => {
    if (userInfo) {

      setTimeout(() => {
        setNavigate('user')
      }, 1500)
    }
    else {
      setNavigate('login')
    }
  }, [userInfo])

  return (
    <Stack.Navigator initialRouteName="Init">
      {navigate === 'login' && (
        <Stack.Screen name="Init" component={AuthStack} options={{ headerShown: false }} />
      )}
      {navigate === 'user' && (
        <Stack.Screen name="User" component={UserStack} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  )
}

export default AppNavigator
