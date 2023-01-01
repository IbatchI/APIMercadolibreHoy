import { Schema, model } from "mongoose"

export interface ISearch {
    keyword: string
    state: boolean
    user: Schema.Types.ObjectId
}

const SearchSchema = new Schema<ISearch>({
    keyword: {
        type: String,
        required: [true, 'La palabra clave es obligatoria'],
        unique: true
    },
    // This field is for soft delete
    state: {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

SearchSchema.methods.toJSON = function() {
    const { __v, _id, state, ...search } = this.toObject()
    search.uid = _id
    return search
}

export const Search = model('Search', SearchSchema)