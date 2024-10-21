import mongoose from "mongoose";
 type ConnectionObj={
    isConnected?:number
}
const connection:ConnectionObj={}
async function DbConect():Promise<void>{
   if(connection.isConnected){
      console.log("Database already connectdd")
      return;
   }
   try {
    const dbconnection= await mongoose.connect("mongodb+srv://yadavravishekhar01:Rr7388073@cluster0.pruwn.mongodb.net/VideoStreamingApp?retryWrites=true&w=majority&appName=Cluster0" ,{})
    console.log("databse connected")
    connection.isConnected=dbconnection.connections[0].readyState
   } catch (error) {
    console.log("db can't connected",error)
    process.exit(1)
   }
}
export default DbConect