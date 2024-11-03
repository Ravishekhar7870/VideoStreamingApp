import mongoose,{Schema,Document,Types} from "mongoose";
export interface User extends Document{
    _id: string,
    username:string,
    clerkId:string,
    bio?:string,
    ProfilePic?:string
}
const UserSchema:Schema<User>=new Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    clerkId:{
        type:String,
        required:true
    },
    bio:{
        type:String,
    },
    ProfilePic:{
        type:String
    }
},{timestamps:true})
const UserModel=(mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User',UserSchema)
export default UserModel;