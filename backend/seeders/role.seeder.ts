import 'dotenv/config'
import connectMongoDb from '../config/mongo.config'
import RoleModel from '../models/rolesPermissions.'
import {
    RolePermissions
} from '../utils/rolesPermissions'
const seedRoles = async () => {
    console.log('Seeding Roles started ...')
    try {
        await connectMongoDb()
        console.log('Clearing Existing roles')
        await RoleModel.deleteMany()
        for (const roleName in RolePermissions) {
            const role = roleName as keyof typeof RolePermissions
            const permissions = RolePermissions[role]
            const existingRole = await RoleModel.findOne({ name: role })
            if (!existingRole) {
                const newRole = new RoleModel({
                    name: role,
                    permissions: permissions,
                });
                await newRole.save()
                console.log(`Role = ${role} added with permissions = ${permissions}`)
            } else {
                console.log(`Role = ${role} already exists`)
            }
        }
        console.log('Seeding completed successfully.')
    } catch (error: any) {
        console.error('Error during seeding: ', error)
    }
}
seedRoles().catch((error: any): void => {
    console.error('Error during running seed script: ', error)
})
