import { Schema, model } from "mongoose"

export interface IUser {
    email: string
    google: boolean
    name: string
    password: string
    state: boolean
}

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    google: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    // This field is for soft delete
    state: {
        type: Boolean,
        default: true
    }
})

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject()
    user.uid = _id
    return user
}

export default model('User', UserSchema)