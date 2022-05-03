import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

// TODO build for class

export const SupportSchema = new Schema({
  accountId: {type: ObjectId, required: true, ref: 'Account'},
  tierId: {type: ObjectId, required: true, ref: 'Tier'},
  projectId: {type: ObjectId, required: true, ref: 'Project'},
  projectCreatorId: {type: ObjectId, ref: 'Account'}
},
{ timestamps: true, toJSON: { virtuals: true } })

SupportSchema.virtual('account',{
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

SupportSchema.virtual('projectCreator',{
  localField: 'projectCreatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

SupportSchema.virtual('project',{
  localField: 'projectId',
  foreignField: '_id',
  ref: 'Project',
  justOne: true
})

SupportSchema.virtual('tier',{
  localField: 'tierId',
  foreignField: '_id',
  ref: 'Tier',
  justOne: true
})
