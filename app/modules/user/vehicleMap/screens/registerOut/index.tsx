import Header from '@/app/components/Header'
import Icon from '@/app/components/Icon'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { getAddressFromCoordinates } from '@/app/utils/getAddressFromCoordinates'
import { Dimensions, KeyboardAvoidingView, Text, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { BoxIcon, FormatText, InfoVehicle } from './styles'
import CardInput from '@/app/components/CardInput'
import { RegisterOutScreenProps } from '../../types'

const { height: screenHeight } = Dimensions.get('screen')

const RegisterOutScreen: React.FC<RegisterOutScreenProps> = ({ upperCase, plate, position, setDescription, createPoint, description }) => {
  const [keyboardVerticalValue, setKeyboardVerticalValue] = useState(0)
  const [address, setAddress] = useState()
  const dismissKeyboard = () => {
    setKeyboardVerticalValue(0)
    Keyboard.dismiss()
  }
  const mapRef = useRef<MapView>(null)

  const getAddress = useCallback(async () => {
    const responseAddress = await getAddressFromCoordinates(position.latitude, position.longitude)
    setAddress(responseAddress)
  }, [])

  useEffect(() => {
    mapRef?.current?.animateToRegion(
      {
        latitude: position.latitude,
        longitude: position.longitude,
        latitudeDelta: 5,
        longitudeDelta: 5
      },
      1000
    )
    getAddress()
  }, [position])

  return (
    <View style={{ flex: 1, backgroundColor: '#202024' }}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <KeyboardAvoidingView behavior='padding' style={{ width: '100%', flex: 1 }} enabled keyboardVerticalOffset={keyboardVerticalValue} >
          <Header title={'Saída'} />
          <MapView style={{ flex: 1, height: screenHeight }} initialRegion={{
            latitude: position.latitude,
            longitude: position.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
            ref={mapRef}
          >
            <Marker coordinate={position} title="Origem" description="São Paulo" />
          </MapView>
          <View style={{ height: '55%', backgroundColor: '#202024', flexDirection: 'column', paddingTop: 20 }}>
            <InfoVehicle>
              <BoxIcon>
                <Icon
                  name='car'
                  size={24}
                />
              </BoxIcon>
              <FormatText>
                <Text style={{ color: '#8D8D99', fontSize: 14, fontWeight: 'regular' }}>
                  {`Localização atual`}
                </Text>
                <Text style={{ color: '#E1E1E6', fontSize: 16, fontWeight: '400', paddingTop: 6, width: '100%' }}>
                  {address || 'Endereço não encontrado'}
                </Text>
              </FormatText>
            </InfoVehicle>
            <CardInput
              title='Placa do veículo'
              styleCard={{ height: 110, marginHorizontal: 32, backgroundColor: '#29292E', marginTop: 20 }}
              style={{
                height: 50,
                width: '100%',
                color: '#C4C4CC',
                fontSize: 32,
                textAlign: 'center'
              }}
              placeholder="Digite algo"
              multiline={true}
              onChangeText={(plate) => upperCase(plate)}
              value={plate}
              maxLength={7}
            />
            <CardInput
              title='Finalidade'
              styleCard={{ height: 110, marginHorizontal: 32, backgroundColor: '#29292E', marginTop: 20 }}
              style={{
                height: 50,
                width: '100%',
                color: '#C4C4CC',
                fontSize: 16,
                textAlign: 'left'
              }}
              onPressIn={() => setKeyboardVerticalValue(250)}
              placeholder="Vou utilizar o carro para..."
              multiline={true}
              onChangeText={(description) => setDescription(description)}
            />
            <TouchableOpacity style={{
              alignItems: 'center',
              height: 56,
              marginTop: 16,
              marginHorizontal: 32,
              borderRadius: 6,
              justifyContent: 'center',
              backgroundColor: '#00875F',
              opacity: (description.length === 0 || plate.length < 7) ? 0.5 : 1
            }}
              onPress={() => createPoint()}
              disabled={description.length === 0 || plate.length < 7}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 'regular' }}>
                {`Registrar Saída`}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default RegisterOutScreen
