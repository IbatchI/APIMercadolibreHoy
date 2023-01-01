import { Schema, model } from "mongoose"

export interface IFilter {
    name: string
    search: Schema.Types.ObjectId
    state: boolean
    value: object
}

const FilterSchema = new Schema<IFilter>({
    name: {
        type: String,
        required: [true, 'El nombre del filtro es obligatorio'],
        unique: true,
        emun: ['RANGE_PRICE']
    },
    search: {
        type: Schema.Types.ObjectId,
        ref: 'Search',
        required: true
    },
    // This field is for soft delete
    state: {
        type: Boolean,
        default: true
    },
    value: {
        type: Object,
        required: [true, 'El filtro debe tener un valor']
    }
})

FilterSchema.methods.toJSON = function() {
    const { __v, _id, state, ...filter } = this.toObject()
    filter.uid = _id
    return filter
}

export const Filter = model('Filter', FilterSchema)