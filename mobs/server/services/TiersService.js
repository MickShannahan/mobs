import { dbContext } from "../db/DbContext";
import { Forbidden } from "../utils/Errors";


class TiersService{
  async create(body) {
    let tier = await dbContext.Tiers.create(body)
    return tier
  }
  async delete(id, userId) {
    let original = await dbContext.Tiers.findById(id)
    if(original.creatorId.toString() != userId){
      throw new Forbidden('cant delete tier not owner')
    }
    await original.remove()
    return 'Delorted'
  }

  async getByProjectId(id){
    let tiers = await dbContext.Tiers.find({projectId: id})
    return tiers
  }

}

export const tiersService = new TiersService();
