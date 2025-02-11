import Realm from 'realm';
import VehicleSchema from '@/business/models/Vehicle';
import TrajectoriesSchema from '@/business/models/Trajectories';
import UserSchema from '@/business/models/User';


const getRealm = async () => { 
    return await Realm.open({
        path: "myrealm",
        schema: [ UserSchema, VehicleSchema, TrajectoriesSchema],
    });
};

export default getRealm;
