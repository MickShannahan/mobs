import { dbContext } from "../db/DbContext";
import { Forbidden } from "../utils/Errors";


class ProjectsService{
  async getAll() {
    let projects = await dbContext.Projects.find()
    return projects
  }
  async getById(id) {
    let project = await dbContext.Projects.findById(id)
    return project
  }
  async create(body) {
    let project = await dbContext.Projects.create(body)
    return project
  }
  async update(id, update) {
    let original = await dbContext.Projects.findById(id)
    if(original.creatorId.toString() != update.creatorId){
      throw new Forbidden('not the owner of this project')
    }
    original.name = update.name ? update.name : original.name
    original.description = update.description ? update.description : original.description
    original.img = update.img ? update.img : original.img
    original.save()
    return original
  }
  async delete(id, userId) {
    let original = await dbContext.Projects.findById(id)
    if(original.creatorId.toString() != userId){
      throw new Forbidden("can't delete not your project")
    }
    await dbContext.Projects.findByIdAndRemove(id)
    // NOTE alternative way to delete
    // original.remove()
    return 'project deleted'
  }


}

export const projectsService = new ProjectsService();
