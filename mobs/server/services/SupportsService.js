import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";


class SupportsService{

  async getAll(query = {}){
    const supports = await dbContext.Supports.find(query).populate('account', 'name picture').populate('tier')
    return supports
  }

  async getMySupports(accountId){
    return await dbContext.Supports.find({accountId}).populate('project').populate('tier')
  }

  async create(body) {
    let support = await dbContext.Supports.create(body)
    await support.populate('account tier project')
    return support
  }
  async update(update, id) {
    let original = await dbContext.Supports.findById(id)
    if(original.accountId.toString() != update.accountId){
      throw new BadRequest('not your support can\'t edit')
    }
    original.tierId = update.tierId || original.tierId
    await original.save()
    return original
  }
  async remove(id, userId) {
    let original = await dbContext.Supports.findById(id).populate('tier account')
    if(original.accountId.toString() != userId){
      throw new BadRequest('not your support can not delete')
    }
    await original.remove()
    return `deleted support of${original.tier.name} for ${original.account.name}`
  }


}

export const supportsService = new SupportsService();
