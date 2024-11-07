import mongoose,{Schema,Document,Types} from "mongoose";
interface Stream extends Document{
    id:string
    thumbnail?:string
    name:string
    ingressId?:string
    serverUrl?:string
    serverKey?:string
    isLive?:boolean
    isChatSlowed?:boolean
    isChatFollowerOnly?:boolean
    isChatEnabled?:boolean
    UserId:Types.ObjectId
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
        unique:true
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
const StreamModel= (mongoose.models.Stream as mongoose.Model<Stream>)  || mongoose.model<Stream>('Stream',StreamSchema)
export default StreamModel