import mongoose from "mongoose";
 type ConnectionObj={
    isConnected?:number
}
const connection:ConnectionObj={}
async function DbConect():Promise<void>{
   if(connection.isConnected){
    
      return;
   }
   try {
    const dbconnection= await mongoose.connect(process.env.MONGO_DB_URI ||"",{})
  
    connection.isConnected=dbconnection.connections[0].readyState
   } catch (error) {
   console.log("error",error)
    process.exit(1)
   }
}
export default DbConect