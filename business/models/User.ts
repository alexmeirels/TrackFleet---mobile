import { ObjectSchema } from "realm";

const UserSchema: ObjectSchema = {
    name: "User",
    properties: {
        name: { type: "string" },
        email: { type: "string" },
        id: { type: "string" },
    },
    primaryKey: "id",
};

export default UserSchema;