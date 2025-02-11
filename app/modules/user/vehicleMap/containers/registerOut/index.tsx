import React, { useEffect, useRef, useState } from 'react'
import RegisterOutScreen from '@/app/modules/user/vehicleMap/screens/registerOut'
import { RegisterOutContainerProps } from '../../types'
import Geolocation from 'react-native-geolocation-service'
import useRoutes from '@/app/hooks/useRoutes'
import useVehicle from '@/app/hooks/useVehicles'
import { useAuth } from '@/app/hooks/useAuth'

const RegisterOutContainer: React.FC<RegisterOutContainerProps> = ({ navigation }) => {
  const [plate, setPlate] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const { userInfo } = useAuth()
  const { createDeparture } = useRoutes()
  const { createVehicle } = useVehicle()

  const [position, setPosition] = useState({
    latitude: -20.9530,
    longitude: -40.3794,
  })

  const handleChangeText = (input: string) => {
    setPlate(input.toUpperCase())
    return
  }

  const createPoint = async () => {
    const vehicleData = await createVehicle(userInfo.id, plate, description)
    await createDeparture(vehicleData.id, position.latitude, position.longitude)
    navigation.goBack()
  }

  useEffect(() => {
    getLocation()
  }, [])

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setPosition({
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
    <RegisterOutScreen
      upperCase={handleChangeText}
      plate={plate}
      position={position}
      setDescription={setDescription}
      description={description}
      createPoint={createPoint}
    />
  )
}
export default RegisterOutContainer