export interface HomeScreenProps {
  navigateToRegisterIn: any
  navigateToRegisterOut: any
  user: {
    id?: string
    name?: string
    email?: string
    googleId?: string
    createdAt?: string 
  }
  listRecords?: any
  logout: any
}


export interface HomeContainerProps {
  navigation: any
}