import mongoose,{Schema,Document,Types} from "mongoose";
export interface Stream extends Document{
    id?:string
    thumbnail?:string
    name:string
    ingressId?:string
    serverUrl?:string
    serverKey?:string
    isLive?:boolean
    isChatSlowed?:boolean
    isChatFollowerOnly?:boolean
    isChatEnabled?:boolean
    UserId?:Types.ObjectId
    updatedAt:Date
}
const StreamSchema:Schema<Stream>=new Schema({
       thumbnail:{
        type:String,

       },
       name:{
        type:String,
        required:true
       },
       ingressId:{
        type:String,
        
       },
       serverKey:{
        type:String
       },
       serverUrl:{
        type:String
       },
       isLive:{
        type:Boolean,
        default:false
       },
       isChatEnabled:{
        type:Boolean,
        default:true
       },
       isChatSlowed:{
        type:Boolean,
        default:false
       },
       isChatFollowerOnly:{
        type:Boolean,
        default:false
       },
       UserId:{
        type:Schema.Types.ObjectId,
        ref:'User'
       }


},
{timestamps:true})
StreamSchema.index({name:'text',desription:'text'})
StreamSchema.index({UserId:1},{unique:true})
StreamSchema.index({ingressId:1})
const StreamModel= (mongoose.models.Stream as mongoose.Model<Stream>)  || mongoose.model<Stream>('Stream',StreamSchema)
StreamModel.syncIndexes().catch(err => console.error('Failed to sync indexes:', err));
export default StreamModel