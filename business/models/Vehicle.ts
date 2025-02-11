import { ObjectSchema } from "realm";

const VehicleSchema: ObjectSchema = {
    name: "Vehicle",
    properties: {
        plate: { type: "string" },
        userId: { type: "string" }, // Foreign key to User
        id: { type: 'objectId' }
    },
    primaryKey: "plate",
};

export default VehicleSchema;