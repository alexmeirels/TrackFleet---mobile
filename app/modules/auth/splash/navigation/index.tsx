import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SplashContainer from '@/app/modules/auth/splash/container'

type RootStackParamList = {
  Splash: any
}

const Internal = createStackNavigator<RootStackParamList>()

const SplashNavigation = () => {
  return (
    <Internal.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}>
      <Internal.Screen
        name="Splash"
        component={SplashContainer}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Internal.Navigator>
  )
}

export default SplashNavigation