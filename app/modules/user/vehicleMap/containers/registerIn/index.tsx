import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { RegisterOutContainerProps } from '../../types'
import Geolocation from 'react-native-geolocation-service'
import RegisterInScreen from '@/app/modules/user/vehicleMap/screens/registerIn'
import { useRoute } from '@react-navigation/native'
import useRoutes from '@/app/hooks/useRoutes'
import { Dimensions } from 'react-native'


const RegisterInContainer: React.FC<RegisterOutContainerProps> = ({ navigation }) => {
  const { vehicleId, arrival } = useRoute().params as { vehicleId: string, arrival: any }
  const [destination, setDestination] = useState<any>({})
  const { width, height } = Dimensions.get("window")
  const { getDeparture, departure, createArrival } = useRoutes()

  const origin = useMemo(() => {
    return { latitude: departure?.[0]?.latitude, longitude: departure?.[0]?.longitude } // São Paulo
  }, [departure?.[0]?.latitude, departure?.[0]?.longitude])

  const marginFactor = useMemo(() => 1.2, [])

  const latDiff = useMemo(() =>
    Math.abs(origin.latitude - destination.latitude)
    , [origin.latitude, destination.latitude])

  const lonDiff = useMemo(() =>
    Math.abs(origin.longitude - destination.longitude)
    , [origin.longitude, destination.longitude])

  const aspectRatio = width / height
  const latitudeDelta = latDiff * marginFactor
  const longitudeDelta = lonDiff * marginFactor * aspectRatio

  useEffect(() => {
    getDeparture(vehicleId)
    getLocation()
  }, [])

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        arrival ?
          setDestination({
            latitude: arrival?.latitude,
            longitude: arrival?.longitude
          }) :
          setDestination({
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude
          })
      },
      (error) => {
        console.log(error.code, error.message)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
  }

  return (
    <RegisterInScreen
      origin={origin}
      destination={destination}
      latitudeDelta={latitudeDelta}
      longitudeDelta={longitudeDelta}
      departure={departure?.[0]}
      navigationToGoBack={() => navigation.goBack()}
      createArrival={createArrival}
      existArrival={arrival ? true : false}
    />
  )
}
export default RegisterInContainer