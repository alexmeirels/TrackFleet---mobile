
import getRealm from '@/infrastructure/realm'
import { CreateVehicleType, GetVehiclesType } from './types'
import api from '..'

export const vehicleResoucersLocal = () => {
  return {
    createVehicle: async ({ plate, userId }: CreateVehicleType) => {
      const realm = await getRealm()
      try {
        realm.write(() => {
          realm.create('Vehicle', {
            plate: plate,
            userId: userId
          })
        })
        console.log("User created")
      } catch (e) {
        console.log('Error on writing user', e)
      }
    },
    getVehicle: async ({ userId, vehicleId }: GetVehiclesType) => {
      const realm = await getRealm()
      try {
        const user = realm.objectForPrimaryKey('Vehicle', { userId, vehicleId })
      } catch (e) {
        console.log('Erro ao buscar usuário', e)
      }
    }
  }
}

export const vehicleResoucers = () => {
  return {
    createVehicle: async (userId: string, plate: string, description: string) =>
      await api.post(`/vehicles/`, {
        data: {
          userId,
          plate,
          description
        }
      })
  }
}