
import getRealm from '@/infrastructure/realm'
import { CreateUserType, GetTrajectoriesType, ShowTrajectoriesType } from './types'
import api from '..'

export const routesResourcersLocal = () => {
  return {
    createTrajectories: async ({ name, email, googleId }: CreateUserType) => {
      const realm = await getRealm()
      try {
        realm.write(() => {
          realm.create('Trajectories', {
            name: name,
            email: email,
            googleId: googleId
          })
        })
        console.log("User created")
      } catch (e) {
        console.log('Error on writing user', e)
      }
    },
    getTrajectories: async (userId: GetTrajectoriesType) => {
      const realm = await getRealm()
      try {
        const user = realm.objectForPrimaryKey('User', userId)
        console.log("Usuário encontrado:", user)
      } catch (e) {
        console.log('Erro ao buscar usuário', e)
      }
    },
    showTrajectories: async ({ userId, vehicleId }: ShowTrajectoriesType) => {
      const realm = await getRealm()
      try {
        const user = realm.objectForPrimaryKey('Trajectories', { userId, vehicleId })
        console.log("Usuário encontrado:", user)
      } catch (e) {
        console.log('Erro ao buscar usuário', e)
      }
    }
  }
}

export const routesResourcers = () => {
  return {
    createDeparture: async (vehicleId: string, latitude: number, longitude: number) =>
      await api.post(`/routes/departure`, {
        data: {
          vehicleId,
          latitude,
          longitude
        }
      }),
    createArrival: async (latitude: number, longitude: number, routeId: string) =>
      await api.patch(`/routes/arrival/${routeId}`, {
        data: {
          latitude,
          longitude
        }
      }),
    getRoutes: async (userId: string) => await api.get(`/routes/${userId}`),
    getDeparture: async (vehicleId: string) => await api.get(`/routes/departure/vehicle/${vehicleId}`)

  }
}

