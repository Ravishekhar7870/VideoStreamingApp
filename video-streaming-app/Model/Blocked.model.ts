import mongoose,{Schema,Document,Types} from "mongoose";
export interface Blocked extends Document{
    _id:string
    BlockedUserId?:Types.ObjectId
    BlockerUserId?:Types.ObjectId
}
const BlockedSchema:Schema<Blocked>=new Schema({
     BlockedUserId:{
       type:Schema.Types.ObjectId,
       ref:'User',
       required:true
     },
     BlockerUserId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
     }
},
{
    timestamps:true
})
const BlockedModel=(mongoose.models.Blocked as mongoose.Model<Blocked>) || mongoose.model<Blocked>('Blocked',BlockedSchema) 
export default BlockedModel