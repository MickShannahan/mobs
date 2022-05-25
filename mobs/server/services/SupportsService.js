import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";
import { logger } from "../utils/Logger";


class SupportsService{
  // TODO GET SUPPORTERS OF A PROJECT
  async getProjectSupporters(projectId){
    const supporters = dbContext.Supports.find({projectId}).populate('account', 'name picture').populate('tier')
    return supporters
  }

  // TODO GET PROJECTS A PERSON IS SUPPORTING
  async getMySupports(accountId){
    const supports = await dbContext.Supports.find({accountId}).populate('project').populate('tier')
    return supports
  }

  // TODO CREATE SUPPORT BUT CHECK IF THEY HAVE ONE FIRST
  async create(body) {
    // NOTE WE ONLY WANT TO CHECK IF THEY ARE ALREADY SUPPORTING THAT PROJECT NOT THE TIER LEVEL
    let isSupporting = await dbContext.Supports.exists({accountId:body.accountId, projectId: body.projectId})
    logger.log('is supporting',isSupporting)
    if(isSupporting){
      throw new BadRequest('you are already supporting this project')
    }
    let support = await dbContext.Supports.create(body)
    await support.populate('project')
    await support.populate('tier')
    return support
  }

  // TODO A FIND ONE BY ACCOUNT AND PROJECT
  async getAccountProjectSupport(accountId, projectId){
    let tier = await dbContext.Supports.findOne({accountId, projectId}).populate('tier')
    return tier
  }

  // TODO UPDATE TIER OF SUPPORT
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
    support.remove()
    return `deleted support`
  }

}

export const supportsService = new SupportsService();
