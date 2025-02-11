export interface CreateUserType {
  name: string,
  email: string,
  googleId: number
}

export interface GetTrajectoriesType {
  userId: string,
}

export interface ShowTrajectoriesType {
  userId: string,
  vehicleId: string
}
