import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import RegisterOutContainer from '@/app/modules/user/vehicleMap/containers/registerOut'
import RegisterInContainer from '@/app/modules/user/vehicleMap/containers/registerIn'

type RootStackParamList = {
  RegisterOut: any
  RegisterIn: any
}

const Internal = createStackNavigator<RootStackParamList>()

const VehicleMapNavigation = () => {
  return (
    <Internal.Navigator
      initialRouteName="RegisterOut"
      screenOptions={{ headerShown: false }}>
      <Internal.Screen
        name="RegisterOut"
        component={RegisterOutContainer}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Internal.Screen
        name="RegisterIn"
        component={RegisterInContainer}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Internal.Navigator>

  )
}

export default VehicleMapNavigation