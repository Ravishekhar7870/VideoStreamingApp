
import mongoose,{Schema,Document,Types} from "mongoose";
import { User } from "./User.mode";
interface Follower extends Document{
    _id: string,
    followerId:Types.ObjectId,
    ChannelId:Types.ObjectId
}
const FollowerSchema:Schema<Follower>=new Schema(
    {
        followerId:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required:true
            
        },
        ChannelId:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required:true
        }
    },
    {timestamps:true}
)
const FollowerModel=  (mongoose.models.Follower as mongoose.Model<Follower>)    || mongoose.model<Follower>('Follower',FollowerSchema)
export default FollowerModel