import React, { useEffect } from 'react'
import HomeScreen from '@/app/modules/user/home/screen'
import { HomeContainerProps } from '../types'
import Geolocation from 'react-native-geolocation-service'
import { PermissionsAndroid, Platform } from 'react-native'
import { useAuth } from '@/app/hooks/useAuth'
import useRoutes from '@/app/hooks/useRoutes'
import { useIsFocused } from '@react-navigation/native'


const HomeContainer: React.FC<HomeContainerProps> = ({ navigation }) => {
  const { userInfo } = useAuth()
  const isFocused = useIsFocused()

  const { logout } = useAuth()
  const { getRoutes, listRecords } = useRoutes()

  useEffect(() => {
    if (userInfo) {
      getRoutes(userInfo.id)
    }
  }, [isFocused])

  const permissionLocationAndroid = async () => {
    try {
      await PermissionsAndroid.requestMultiple(['android.permission.ACCESS_FINE_LOCATION', 'android.permission.ACCESS_COARSE_LOCATION'])
    } catch (err) {
      console.warn('error: ', err)
    }
  }

  const navigateToRegisterIn = async (vehicleId: string, arrival: any) => {
    navigation.navigate('VehicleMap', { screen: 'RegisterIn', params: { vehicleId, arrival: arrival || false } })
  }

  const navigateToRegisterOut = async () => {
    navigation.navigate('VehicleMap', { screen: 'RegisterOut' })
  }

  useEffect(() => {
    if (Platform.OS == 'ios') {
      Geolocation.requestAuthorization("whenInUse")
    }
    if (Platform.OS == 'android') {
      permissionLocationAndroid()
    }
  }, [])

  return (
    <HomeScreen
      navigateToRegisterIn={navigateToRegisterIn}
      navigateToRegisterOut={navigateToRegisterOut}
      user={userInfo}
      logout={logout}
      listRecords={listRecords}
    />
  )
}
export default HomeContainer