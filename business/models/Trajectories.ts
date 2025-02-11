import { ObjectSchema } from "realm";

const TrajectoriesSchema: ObjectSchema = {
    name: "Trajectories",
    properties: {
        id: { type: "string" },
        plate: { type: "string" },
        exitPoint: { type: 'object' },
        arrivalPoint: { type: 'object' },
    },
    primaryKey: "id",
};

export default TrajectoriesSchema;