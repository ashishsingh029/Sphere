import mongoose, {
    Schema,
    Document
} from "mongoose"
import {
    Permissions,
    PermissionType,
    Roles,
    RoleType,
} from "../enums/roles.enum"
import {
    RolePermissions
} from "../utils/rolesPermissions"
export interface RoleDocument extends Document {
    name: RoleType;
    permissions: Array<PermissionType>;
}
const roleSchema = new Schema<RoleDocument>({
    name: {
        type: String,
        enum: Object.values(Roles),
        required: true,
        unique: true,
    },
    permissions: {
        type: [String],
        enum: Object.values(Permissions),
        required: true,
        default: function () {
            return RolePermissions[this.name]
        }
    }
}, {
    timestamps: true
})
const RoleModel: any = mongoose.model<RoleDocument>(
    "Role",
    roleSchema
)
export default RoleModel