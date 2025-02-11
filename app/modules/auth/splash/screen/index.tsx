import React, { useEffect, useRef } from 'react'
import { ImageBackground, View, Text, Animated, Dimensions, ActivityIndicator } from 'react-native'
import LoginButton from './styles'

const SplashScreen = ({ signIn, loading }: SplashScreenProps) => {
  const HEIGHT = Dimensions.get('window').height
  const buttonYPosition = useRef(new Animated.Value(HEIGHT)).current
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    setTimeout(() => {
      Animated.sequence([
        Animated.timing(buttonYPosition, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start()
    }, 1500)
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('@/app/assets/images/splash.png')}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      >
        <Animated.View
          style={{
            transform: [{ translateY: buttonYPosition }],
            opacity: opacity,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0
          }}
        >
          {loading ? <ActivityIndicator
            size={'large'}
            color={'white'}
            style={{ position: 'absolute', bottom: HEIGHT/2 }}
          /> :
            (
              <LoginButton onPress={() => signIn?.()}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                  {`Entrar com Google`}
                </Text>
              </LoginButton>
            )}
        </Animated.View>
      </ImageBackground>
    </View>
  )
}

export default SplashScreen
