export interface RegisterOutContainerProps {
  navigation: any
}

export interface RegisterOutScreenProps {
  plate: string
  description: string
  upperCase: (input: string) => void
  setDescription: (input: string) => void
  position: {
    latitude: number
    longitude: number
  }
  createPoint: () => void
}

export interface RegisterInScreenProps {
  origin: {
    latitude: number
    longitude: number
  }
  destination: {
    latitude: number
    longitude: number
  }
  longitudeDelta: number
  latitudeDelta: number
  existArrival: boolean
  departure: any
  navigationToGoBack: () => void
  createArrival: (routeId: string, latitude: number, longitude: number) => void
}
