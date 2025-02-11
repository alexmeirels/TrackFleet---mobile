const getAddressFromCoordinates = async (latitude: number, longitude: number) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (data.status === 'OK') {
      return data.results[0].formatted_address
    } else {
      throw new Error('Não foi possível obter o endereço')
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

export default getAddressFromCoordinates