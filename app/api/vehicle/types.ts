export interface CreateVehicleType {
  plate: string,
  userId: string,
}

export interface GetVehiclesType {
  userId: string,
  vehicleId: string
}