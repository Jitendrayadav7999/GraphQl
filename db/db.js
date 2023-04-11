import mongoose from "mongoose"


const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB)
        console.log("mongoDb is connected")
    } catch (error) {
        console.log(error)
    }
}
export default connectDb