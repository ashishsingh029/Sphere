// @ts-ignore
import bcrypt from 'bcrypt'
export const hashValue = async (
    value: string,
    saltRounds: number = 10
): Promise<any> =>
    await bcrypt.hash(value, saltRounds)

export const compareValues = async (
    value: string,
    hashedValue: string
): Promise<any> => {
    await bcrypt.compare(value, hashedValue)
}