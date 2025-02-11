import React, { useState } from 'react'
import { routesResourcers } from '../api/routes'

const useRoutes = () => {
  const [listRecords, setListRecords] = useState<any>()
  const [departure, setDeparture] = useState<any>()
  
  const createDeparture = async (vehicleId: string, latitude: number, longitude: number) => {
    try {
      await routesResourcers().createDeparture(vehicleId, latitude, longitude)
    } catch (error) {
      console.log('Error createDeparture', error)
    }
  }

  const createArrival = async (routeId: string, latitude: number, longitude: number) => {
    try {
      await routesResourcers().createArrival(latitude, longitude, routeId)
    } catch (error) {
      console.log('Error createArrival', error)
    }
  }

  const getDeparture = async (vehicleId: string) => {
    try {
      const response = await routesResourcers().getDeparture(vehicleId)
      setDeparture(response.data)
    } catch (error) {
      console.log('Error getDeparture', error)
    }
  }

  const getRoutes = async (userId: string) => {
    try {
      const response = await routesResourcers().getRoutes(userId)
      setListRecords(response.data)
    } catch (error) {
      console.log('Error getRoutes', error)
    }
  }

  return {
    createDeparture,
    createArrival,
    getRoutes,
    listRecords,
    getDeparture,
    departure
  }
}

export default useRoutes

