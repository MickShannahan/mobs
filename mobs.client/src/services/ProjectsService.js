import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProjectsService{
  async getProjects(query = ''){
    const res = await api.get('api/projects')
    logger.log('[get projects]', res.data)
    AppState.projects = res.data
  }

  async getProject(id){
    const res =  await api.get('api/projects/'+id)
    logger.log('[get project]', res.data)
    AppState.activeProject = res.data
  }
}

export const projectsService = new ProjectsService()
