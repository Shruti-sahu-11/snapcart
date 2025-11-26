import mongoose from "mongoose";

const mongodbUrl = process.env.MONGODB_URL;

if(!mongodbUrl){
    throw new Error("db error");
}

/***function to connect to mongodb***/

let cached = global.mongoose
if(!cached){  /* if we don't have anything in global.mongoose */
    cached = global.mongoose = {conn:null,promise:null}
}

const connectDb = async()=>{
    if(cached.conn){  /***condition(already connection exist) - conn(!null)***/
        return cached.conn;
    }
    if(!cached.promise){
        cached.promise = mongoose.connect(mongodbUrl).then((conn) => conn.connection)
          /***condition- promise(!null)***/
    }
    try{
        const conn = await cached.promise /***condition(promise resolved)- promise(null)***/
        return conn;
    }
    catch (error){    /****consition - conn promise both null then we will connect mongodb****/
        console.log(error)
    }
}

export default connectDb;