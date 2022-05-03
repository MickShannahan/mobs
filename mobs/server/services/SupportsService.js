import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";


class SupportsService{
  async getProjectSupporters(projectId){
    const supporters = dbContext.Supports.find({projectId}).populate('account', 'name picture').populate('tier')
    return supporters
  }
  async getMySupports(accountId){
    const supports = dbContext.Supports.find({accountId}).populate('project', 'name').populate('tier')
    return supports
  }
  async create(body) {
    let support = await dbContext.Supports.create(body)
    return support
  }
  async update(id, update) {
    const original = await dbContext.Supports.findById(id)
    if(original.accountId.toString() != update.accountId){
      throw new BadRequest("you don't have permission to edit that support")
    }
    original.tierId = update.tierId ? update.tierId : original.tierId
    original.save()
    return update
  }
  async delete(id, userId) {
    const support = await dbContext.Supports.findById(id)
    if(support.accountId.toString() != userId){
      throw new BadRequest("you don't have permission to delete that support")
    }
    return `deleted support ${support.name}`
  }

}

export const supportsService = new SupportsService();
