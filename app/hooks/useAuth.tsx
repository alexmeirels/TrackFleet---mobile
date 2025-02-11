import * as Google from 'expo-auth-session/providers/google'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useContext, useState } from 'react'
import { userResoucers } from '../api/user'

type AuthContextType = {
  handleSigninWithGoogle: () => Promise<any>
  logout: () => Promise<any>
  getUserById: (userId: string) => Promise<any>
  createUser: (googleId: string, name: string, email: string) => Promise<any>
  promptAsync: any
  userInfo: any | null
  setUserInfo: any | null
  response: object | null
  loading: boolean
}
const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider = (props: any) => {
  const [userInfo, setUserInfo] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID
  })
  
  const handleSigninWithGoogle = async (): Promise<any> => {
    try {
      const user = await AsyncStorage.getItem("@user")
      if (!user) {
        if (response?.type === "success") {
          await getUserInfo(response.authentication?.accessToken)
        }
      }
      else {
        setUserInfo(JSON.parse(user))
      }
    } catch (error) {
      console.log('error', error)

    }
  }

  const getUserInfo = async (token: string | undefined) => {
    if (!token) return
    try {
      setLoading(true)
      const response = await fetch("https://www.googleapis.com/userinfo/v2/me",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      const user = await response.json()
      await AsyncStorage.setItem("@user", JSON.stringify(user))
      await createUser(user.id, user.given_name, user.email)
      setUserInfo(user)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const logout = async () => {
    setUserInfo(undefined)
    await AsyncStorage.removeItem("@user")
  }

  const getUserById = async (userId: string) => {
    try {
      const response = await userResoucers().getUserById(userId)
      setUserInfo(response.data)
    } catch (error) {
      console.log('Error getUserById', error)
    }
  }

  const createUser = async (id: string, name: string, email: string) => {
    try {
      const response = await userResoucers().createUser(id, name, email)
      return response
    } catch (error) {
      console.log('Error createUser', error)
    }
  }


  return (
    <AuthContext.Provider value={{
      handleSigninWithGoogle,
      promptAsync,
      userInfo,
      response,
      setUserInfo,
      logout,
      getUserById,
      createUser,
      loading
    }}>
      {props.children}
    </AuthContext.Provider >
  )
}



export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

export default AuthProvider
