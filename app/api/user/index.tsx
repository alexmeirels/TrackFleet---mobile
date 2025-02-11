
import getRealm from '@/infrastructure/realm'
import { CreateUserType, GetUserType } from './types'
import api from '..'

export const userResoucersLocal = () => {
  return {
    createUser: async ({ name, email, googleId }: CreateUserType) => {
      const realm = await getRealm()
      try {
        realm.write(() => {
          realm.create('User', {
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
    getUserById: async (userId: GetUserType) => {
      const realm = await getRealm()
      try {
        const user = realm.objectForPrimaryKey('User', userId)
        console.log("Usuário encontrado:", user)
      } catch (e) {
        console.log('Erro ao buscar usuário', e)
      }
    }
  }
}
export const userResoucers = () => {
  return {
    getUserById: async (userId: string) => await api.get(`/users/${userId}`),
    createUser: async (id: string, name: string, email: string) => await api.post(`/users/google-login`, {
      data: {
        id,
        name,
        email
      }
    })
  }
}
