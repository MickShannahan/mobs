import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";


class TiersService{
  async getProjectTiers(projectId) {
    let tiers = await dbContext.Tiers.find({projectId})
    return tiers
  }

  async create(body) {
    let tier = await dbContext.Tiers.create(body)
    await tier.populate('creator', 'name picture')
    return tier
  }
  async update(id, update) {
    const original = await dbContext.Tiers.findById(id).populate('creator', 'name picture')
    if(original.creatorId.toString() != update.creatorId){
      throw new BadRequest("you don't have permission to edit that tier")
    }
    original.name = update.name ? update.name : original.name
    original.cost = update.cost ? update.cost : original.cost
    original.save()
    return update
  }

  // TODO DO NOT ALLOW A TIER DELETE IF THERE ARE CURRENT SUPPORTERS
  async delete(id, userId) {
    const count =  await dbContext.Supports.count({tierId: id})
    if(count > 0 ){
      throw new BadRequest("cannot delete tier that has active supporters")
    }
    const tier = await dbContext.Tiers.findById(id)
    if(tier.creatorId.toString() != userId){
      throw new BadRequest("you don't have permission to delete that tier")
    }
    await tier.remove()
    return `deleted tier ${tier.name}`
  }

}

export const tiersService = new TiersService();
