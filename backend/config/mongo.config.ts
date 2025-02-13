import mongoose from "mongoose"
import {
    config
} from './app.config'
const connectMongoDb = async (): Promise<void> => {
    try {
        await mongoose.connect(config.MONGO_URI)
        console.log("MongoDB Connected Successfully")
    } catch ( error: any ) {
        console.log(`MongoDb Error = ${error.message}`)
        process.exit(1)
    }
}
export default connectMongoDb