import { Schema, model } from "mongoose"

export interface IPublication {
    uniqueIdFromML: string
    search: Schema.Types.ObjectId
}

const PublicationSchema = new Schema<IPublication>({
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
})

PublicationSchema.methods.toJSON = function() {
    const { __v, _id,  state, ...publication } = this.toObject()
    publication.uid = _id
    return publication
}

export const Publication = model('Publication', PublicationSchema)