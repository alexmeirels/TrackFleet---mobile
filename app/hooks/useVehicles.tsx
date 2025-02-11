import React from 'react'
import { vehicleResoucers } from '../api/vehicle'

const useVehicle = () => {
  const createVehicle = async (userId: string, plate: string, description: string) => {
    try {
      const response = await vehicleResoucers().createVehicle(userId, plate, description)
      response.data
      return response.data
    } catch (error) {
      console.log('Error createDeparture', error)
    }
  }

  return {
    createVehicle
  }
}

export default useVehicle

