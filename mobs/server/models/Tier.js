import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const TierSchema = new Schema({
  name: {type: String, required: true},
  cost: {type: Number, default: 0},
  projectId: {type: ObjectId, required: true, ref: 'Project'},
  creatorId: {type: ObjectId, required: true, ref: 'Account'}
}
,{timestamps: true, toJSON: {virtuals: true}})

// NOTE what data do we need to make with virtuals?
