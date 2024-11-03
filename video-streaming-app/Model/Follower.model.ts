
import mongoose,{Schema,Document,Types} from "mongoose";
import { User } from "./User.mode";
interface Follower extends Document{
    _id: string,
    follower:User,
    Channel:User
}
const FollowerSchema:Schema<Follower>=new Schema(
    {
        follower:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required:true
            
        },
        Channel:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required:true
        }
    },
    {timestamps:true}
)
const FollowerModel=  (mongoose.models.Follower as mongoose.Model<Follower>)    || mongoose.model<Follower>('Follower',FollowerSchema)
export default FollowerModel