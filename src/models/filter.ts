import { Schema, model } from "mongoose"
export interface IFilter {
    minPrice: number
    maxPrice: number
    allreadySeen: boolean
    search: Schema.Types.ObjectId
}

const FilterSchema = new Schema<IFilter>({
    minPrice: {
        type: Number,
        unique: false
    },
    maxPrice: {
        type: Number,
        unique: false
    },
    allreadySeen: {
        type: Boolean,
        unique: false,
        default: false
    },
    search: {
        type: Schema.Types.ObjectId,
        ref: 'Search',
        required: true
    }
})

FilterSchema.methods.toJSON = function() {
    const { __v, _id, state, search, ...filter } = this.toObject()
    filter.uid = _id
    return filter
}

export const Filter = model('Filter', FilterSchema)