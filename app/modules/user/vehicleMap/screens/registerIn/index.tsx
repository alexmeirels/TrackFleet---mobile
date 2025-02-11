import Header from '@/app/components/Header'
import Icon from '@/app/components/Icon'
import React, { useEffect, useState } from 'react'
import { Dimensions, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { BoxIcon, FormatText, InfoVehicle, VerticalLine, FormatTextColumn } from './styles'
import { RegisterInScreenProps } from '../../types'
import decodePolyline from '@/app/utils/decodePolyline'
import getAddressFromCoordinates from '@/app/utils/getAddressFromCoordinates'
import formattedDate from '@/app/utils/formattedData'


const { height: screenHeight } = Dimensions.get('screen')
const RegisterInScreen: React.FC<RegisterInScreenProps> = ({
  origin,
  destination,
  latitudeDelta,
  longitudeDelta,
  departure,
  createArrival,
  navigationToGoBack,
  existArrival
}) => {
  const [routeCoords, setRouteCoords] = useState<any>([])
  const [addressDestination, setAddressDestination] = useState<any>()
  const [addressOrigin, setAddressOrigin] = useState<any>()

  useEffect(() => {
    if (origin.longitude || origin.latitude) {
      fetchRoute()
      getAddressOrigin(origin.latitude, origin.longitude)
      getAddressDestination(destination.latitude, destination.longitude)
    }
  }, [origin.latitude, origin.longitude])

  const fetchRoute = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&mode=driving&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
      )
      const data = await response.json()

      if (data.routes.length) {
        const points = decodePolyline(data.routes[0].overview_polyline.points)
        setRouteCoords(points)
      }
    } catch (error) {
      console.error("Erro ao buscar rota:", error)
    }
  }
  const getAddressOrigin = async (latitude: number, longitude: number) => {
    const result = await getAddressFromCoordinates(latitude, longitude)
    setAddressOrigin(result)
  }
  const getAddressDestination = async (latitude: number, longitude: number) => {
    const result = await getAddressFromCoordinates(latitude, longitude)
    setAddressDestination(result)

  }


  return (
    <View style={{ flex: 1, backgroundColor: '#202024' }}>
      <Header title={'Chegada'} />
      {origin.latitude || origin.longitude ? (
        <MapView
          style={{ flex: 1, height: screenHeight }}
          initialRegion={{
            latitude: (origin.latitude + destination.latitude) / 2,
            longitude: (origin.longitude + destination.longitude) / 2,
            latitudeDelta: latitudeDelta || 0.01,
            longitudeDelta: longitudeDelta || 0.01,
          }}
        >
          <Marker coordinate={origin} title="Origem" description="São Paulo">
            <View style={{ backgroundColor: '#29292E', height: 32, width: 32, alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>
              <Icon
                name='car'
                size={24}
              />
            </View>
          </Marker>
          <Marker coordinate={destination} title="Destino" description="Rio de Janeiro">
            <View style={{ backgroundColor: '#29292E', height: 32, width: 32, alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>
              <Icon
                name='arrival'
                size={24}
              />
            </View>
          </Marker>

          {routeCoords.length > 0 && (
            <Polyline coordinates={routeCoords} strokeColor="#29292E" strokeWidth={4} />
          )}
        </MapView>
      ) : <View style={{ backgroundColor: '#C4C4CC', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator
          size='large' color={'#A3A3A3'}
        />
      </View>
      }

      <ScrollView
        style={{
          height: '10%',
          backgroundColor: '#202024',
          flexDirection: 'column',
          marginTop: 30,
          marginBottom: 20
        }}
        showsVerticalScrollIndicator={false}
      >
        <InfoVehicle>
          <BoxIcon>
            <Icon
              name='car'
              size={24}
            />
          </BoxIcon>
          <FormatText>
            <Text style={{ color: '#8D8D99', fontSize: 14, fontWeight: 'regular' }}>
              {addressOrigin}
            </Text>
            <Text style={{ color: '#E1E1E6', fontSize: 14, fontWeight: '400', paddingTop: 6 }}>
              {formattedDate(departure?.route?.timestamp)}
            </Text>
          </FormatText>
        </InfoVehicle>
        <VerticalLine />
        <InfoVehicle>
          <BoxIcon>
            <Icon
              name='car'
              size={24}
            />
          </BoxIcon>
          <FormatText>
            <Text style={{ color: '#8D8D99', fontSize: 14, fontWeight: 'regular' }}>
              {addressDestination}
            </Text>
            <Text style={{ color: '#E1E1E6', fontSize: 14, fontWeight: '400', paddingTop: 6 }}>
              {formattedDate(new Date)}
            </Text>
          </FormatText>
        </InfoVehicle>
        <FormatTextColumn>
          <Text style={{ color: '#8D8D99', fontSize: 14, fontWeight: 'regular' }}>
            {`Placa do veículo`}
          </Text>
          <Text style={{ color: '#C4C4CC', fontSize: 32, fontWeight: 'regular' }}>
            {departure?.route?.vehicle?.plate}
          </Text>
        </FormatTextColumn>
        <FormatTextColumn>
          <Text style={{ color: '#8D8D99', fontSize: 14, fontWeight: 'regular' }}>
            {`Finalidade`}
          </Text>
          <Text style={{ color: '#C4C4CC', fontSize: 16, fontWeight: 'regular', marginTop: 6 }}>
            {departure?.route?.vehicle?.description}
          </Text>
        </FormatTextColumn>
        {existArrival || (
          <TouchableOpacity style={{
            alignItems: 'center',
            height: 56,
            marginTop: 40,
            marginHorizontal: 32,
            borderRadius: 6,
            justifyContent: 'center',
            backgroundColor: '#00875F',
          }}
            onPress={async () => {
              await createArrival(departure?.route?.id, destination?.latitude, destination?.longitude)
              navigationToGoBack()
            }}
            disabled={false}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 'regular' }}>
              {`Registrar Saída`}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  )
}

export default RegisterInScreen
