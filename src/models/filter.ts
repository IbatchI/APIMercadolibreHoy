import { Schema, model } from "mongoose"
import type { TFilter } from "../types"
export interface IFilter {
    filter: TFilter
    search: Schema.Types.ObjectId
}

const FilterSchema = new Schema<IFilter>({
    filter: {
        type: Object,
        required: [true, 'El filtro es obligatorio']
    },
    search: {
        type: Schema.Types.ObjectId,
        ref: 'Search',
        required: true
    }
})

FilterSchema.methods.toJSON = function() {
    const { __v, _id, state, ...filter } = this.toObject()
    filter.uid = _id
    return filter
}

export const Filter = model('Filter', FilterSchema)