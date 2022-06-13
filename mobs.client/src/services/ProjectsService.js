import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProjectsService{
  async getAll(){
    const res = await api.get('api/projects')
    logger.log('-getAll-', res.data)
    AppState.projects = res.data
  }

  async getById(id){
    const res = await api.get('api/projects/'+id)
    logger.log('-getById-', res.data)
    AppState.activeProject = res.data
  }

  async createProject(body){
    const res = await api.post('api/projects', body)
    logger.log('created project', res.data)
    AppState.accountProjects.push(res.data)
  }

  async updateProject(update){
    const res = await api.put('api/projects/'+ update.id, update)
    logger.log('-updatedProject', res.data)
    AppState.activeProject = res.data
  }

}

export const projectsService = new ProjectsService()
