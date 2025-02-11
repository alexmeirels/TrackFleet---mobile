import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeContainer from '@/app/modules/user/home/container'


type RootStackParamList = {
  Home: any
}

const Internal = createStackNavigator<RootStackParamList>()

const HomeNavigation = () => {
  return (
    <Internal.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
      <Internal.Screen
        name="Home"
        component={HomeContainer}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Internal.Navigator>

  )
}

export default HomeNavigation