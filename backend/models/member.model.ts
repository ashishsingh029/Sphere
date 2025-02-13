import mongoose, {
    Document,
    Schema
} from 'mongoose'
import {
    RoleDocument
} from "./rolesPermissions."
export interface MemberDocument extends Document {
    userId: mongoose.Types.ObjectId,
    workspaceId: mongoose.Types.ObjectId,
    role: RoleDocument,
    joinedAt: Date
}
const memberSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    joinedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})
const MemberModel: any = mongoose.model<MemberDocument>(
    'Member',
    memberSchema
)
export default MemberModel