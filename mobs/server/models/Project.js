import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const ProjectSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true, maxlength: 1000},
  img: {type: String, required: true},
  // NOTE type objectId needs ref that it is pointing to
  creatorId: {type: ObjectId, required: true, ref: 'Account'}
},
{timestamps: true, toJSON: {virtuals: true}})

ProjectSchema.virtual('creator',{
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account'
})
