import mongoose, {
    Document,
    Schema
} from "mongoose"
import {
    NextFunction
} from "express"
import {
    compareValues,
    hashValue
} from "../utils/bcrypt"
export interface UserDocument extends Document {
    name: string
    email: string
    password?: string
    profilePicture: string | null
    isActive: boolean
    lastLogin: Date | null
    createdAt: Date
    upDatedAt: Date
    currentWorkspace: mongoose.Schema.Types.ObjectId | null
    comparePassword(value: string): Promise<boolean>
    omitPassword(): Omit<UserDocument, "password">
}
const userSchema = new Schema({
    name: {
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        select: true
    },
    profilePicture: {
        type: String,
        default: null
    },
    currentWorkspace: {
        type: mongoose.Types.ObjectId,
        ref: "Workspace"
    },
    isActive: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
})
//  before a user document is saved, the pre-middleware function checks if the password field has been modified. If it has, it hashes the password using bcrypt and then calls next() to continue with the save operation
userSchema.pre(
    'save',
    async function (next: NextFunction): Promise<void> {
        if (this.isModified("password")) { // To use this keyword we can't use arrow functions
            if (this.password) {
                this.password = await hashValue(this.password)
            }
        }
        next()
    }
)
userSchema.methods.omitPassword = function (): Omit<UserDocument, "password"> {
    const userObject = this.toObject()
    delete userObject.password
    return userObject
}
userSchema.methods.comparePassword = async function (value: string): Promise<boolean> {
    return compareValues(
        value,
        this.password
    )
}
const UserModel: any = mongoose.model<UserDocument>("User", userSchema)
export default UserModel