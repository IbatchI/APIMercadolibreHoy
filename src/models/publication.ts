import { Schema, model } from "mongoose"

export interface IPublication {
    link: string
    price: number
    search: Schema.Types.ObjectId
    title: string
    uniqueIdFromML: string
    viewed: boolean
    // Maybe we can put images 😶‍🌫️
}

const PublicationSchema = new Schema<IPublication>({
    link: {
        type: String,
        required: [true, 'El link es obligatorio'],
        unique: true
    },
    price: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        default: 0,
    },
    title: {
        type: String,
        default: 'Sin título'
    },
    search: {
        type: Schema.Types.ObjectId,
        ref: 'Search',
        required: true
    },
    uniqueIdFromML: {
        type: String,
        required: [true, 'El id de la publicación es obligatorio'],
        unique: true
    },
    viewed: {
        type: Boolean,
        default: false
    },
})

PublicationSchema.methods.toJSON = function() {
    const { __v, _id,  state, ...publication } = this.toObject()
    publication.uid = _id
    return publication
}

export const Publication = model('Publication', PublicationSchema)