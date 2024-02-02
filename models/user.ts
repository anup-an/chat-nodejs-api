import Model from "../database/model"

interface IUser {
    email: string
    password: string
}

export default class User extends Model<IUser> {
    username = ""
    password = ""
}