import mongoose from "mongoose"
import UserModel from "../models/user.model"
import AccountModel from "../models/account.model"
import WorkspaceModel from "../models/workspace.model"
import RoleModel from "../models/rolesPermissions"
import { Roles } from "../enums/roles.enum"
import {
    BadRequestException,
    NotFoundException,
    UnauthorizedException,
} from "../utils/appError"
import MemberModel from "../models/member.model"
import { ProviderEnum } from "../enums/accountProviders.enum"

//

export const registerUserService = async (body: {
    email: string;
    name: string;
    password: string;
}) => {
    const { email, name, password } = body
    try {
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            throw new BadRequestException("Email already exists");
        }
        const user = new UserModel({
            email,
            name,
            password,
        })
        await user.save()
        const account = new AccountModel({
            userId: user._id,
            provider: ProviderEnum.EMAIL,
            providerId: email,
        })
        await account.save()
        const workspace = new WorkspaceModel({
            name: `My Workspace`,
            description: `Workspace created for ${user.name}`,
            owner: user._id,
        })
        await workspace.save()
        const ownerRole = await RoleModel.findOne({
            name: Roles.OWNER,
        })
        if (!ownerRole) {
            throw new NotFoundException("Owner role not found");
        }
        const member = new MemberModel({
            userId: user._id,
            workspaceId: workspace._id,
            role: ownerRole._id,
            joinedAt: new Date()
        });
        await member.save()
        user.currentWorkspace = workspace._id as mongoose.Types.ObjectId
        await user.save()
        return {
            userId: user._id,
            workspaceId: workspace._id
        }
    } catch (error: any) {
        console.log(`Error In auth.service.ts registerUserService Method  = ${error}`)
    }
}

export const verifyUserService = async ({
    email,
    password,
    provider = ProviderEnum.EMAIL,
}: {
    email: string;
    password: string;
    provider?: string;
}) => {
    const account = await AccountModel.findOne({ provider, providerId: email });
    if (!account) {
        throw new NotFoundException("Invalid email or password");
    }
    const user = await UserModel.findById(account.userId)
    if (!user) {
        throw new NotFoundException("User not found for the given account");
    }
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        throw new UnauthorizedException("Invalid email or password")
    }
    return user.omitPassword()
}