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
    const dbconnection= await mongoose.connect(process.env.MONGO_DB_URI || "" ,{})
    console.log("databse connected")
    connection.isConnected=dbconnection.connections[0].readyState
   } catch (error) {
    console.log("db can't connected",error)
    process.exit(1)
   }
}
export default DbConect